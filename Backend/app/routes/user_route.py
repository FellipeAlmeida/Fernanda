from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import os
from app.database.database import get_db
from app.middlewares.auth import get_current_user
from app.schemas.user_schema import CreateUser, UserRecoveryPassword, UserChangePassword
from app.services.user_services import register_user, delete_me
from app.models.user_model import User
from fastapi import Request
from fastapi import HTTPException
from werkzeug.security import check_password_hash, generate_password_hash
from app.services.auth_services import validar_token_recuperacao_senha
from app.schemas.user_schema import LoginRequest
from app.services.auth_services import (
    criar_token_verificacao,
    enviar_email,
    criar_token_recuperacao_senha,
    criar_token_login,
    validar_token_verificacao
)

user_router = APIRouter(
    prefix="/usuarios",
    tags=["04. Usuários"]
)

# ------------------------- CRIA -------------------------

@user_router.post("/register", status_code=201)
def register(data: CreateUser, db: Session = Depends(get_db)):
    try:
        novo_usuario = register_user(db, data.dict())

        token = criar_token_verificacao(novo_usuario.email)

        link = f"{os.getenv('BASE_URL')}/verifyemail?token={token}"

        html = f"""
        <h2>Verifique seu email para confirmar conta na Fernanda!</h2>
        <p>Clique no link abaixo:</p>
        <a href="{link}">Verificar Email</a>
        <p>Se não houve tentativa de registro, por favor ignore este email.</p>
        """

        enviar_email(destinatario=novo_usuario.email, assunto="Verificação de email.", html_content=html)

        return {
            "msg": "Um email de verificação foi enviado.",
            "user": {
                "id": novo_usuario.id,
                "nome": novo_usuario.nome,
                "email": novo_usuario.email,
            }
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
       
        print("ERRO NO REGISTER:", repr(e))
        raise HTTPException(status_code=500, detail=f"Erro ao criar usuário {e}")
    
# ------------------------- DELETA -------------------------

@user_router.delete("/me", status_code=204)
def route_delete_me(db: Session = Depends(get_db), payload=Depends(get_current_user)):
    try:
        usuario = db.query(User).filter(User.email == payload["sub"]).first()
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        delete_me(db, usuario)
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno de servidor.")

# ------------------------- REDEFINIR SENHA -------------------------

@user_router.post("/recovery-password", status_code=200)
def recovery_password(request: Request, payload: UserRecoveryPassword, db: Session = Depends(get_db)):
    try:
        email = payload.email

        user = db.query(User).filter(User.email == email).first()

        if user:
        
            token = criar_token_recuperacao_senha(user.email)

            link = f"{os.getenv('BASE_URL')}/change-password?token={token}"

            html = f"""
                <h2>Email para troca de senha.</h2>
                <p>Clique no link abaixo:</p>
                <a href="{link}">Alterar senha</a>
                <p>Se não houve tentativa de alteração de senha, por favor ignore este email.</p>
            """

            enviar_email(destinatario=user.email, assunto="Alteração de senha.", html_content=html)

        return {
            "message": "Se o email existir no sistema, você recebrá instruções no seu email.",
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno de servidor. {e}")
    
# ------------------------- REDEFINIR SENHA -------------------------

@user_router.post("/change-password", status_code=200)
def change_password(payload: UserChangePassword, db: Session = Depends(get_db)):
    try: 

        senha = payload.senha
        senha_confirmacao = payload.senha_confirmacao
        token = payload.token

        if senha != senha_confirmacao:
            raise HTTPException(status_code=400, detail="Senhas diferentes.")

        token_decodificado = validar_token_recuperacao_senha(token)

        email = token_decodificado["sub"]

        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado.")

        senha_hash = generate_password_hash(senha)

        user.senha = senha_hash
        db.commit()

        return {"message": "Senha atualizada com sucesso."}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno de servidor {e}.")

# ------------------------- LOGIN -------------------------

@user_router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    email = data.email.strip().lower()

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    if not check_password_hash(user.senha, data.senha):
        raise HTTPException(status_code=401, detail="Senha inválida")

    if not user.ativo:
        raise HTTPException(
            status_code=403,
            detail="Conta não ativada. Verifique seu email antes de fazer login."
        )

    try:
        token = criar_token_login(user)

        return {
            "message": "Login realizado",
            "access_token": token,
            "token_type": "bearer",
        }

    except Exception as e:
        print(f"Erro ao gerar token: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao gerar acesso {e}")

# ------------------------- VERIFY EMAIL -------------------------

@user_router.get("/verifyemail")
def verify_email(token: str, db: Session = Depends(get_db)):
    resultado = validar_token_verificacao(token)

    if resultado.get("erro") == "expirado":
        raise HTTPException(status_code=400, detail="Token expirado")

    if resultado.get("erro") == "invalido":
        raise HTTPException(status_code=400, detail="Token inválido")

    if resultado.get("erro") == "tipo_invalido":
        raise HTTPException(status_code=400, detail="Token inválido para verificação")

    email = resultado.get("sub")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    user.ativo = True
    user.token_verificacao = None
    db.commit()

    return {"message": "Email verificado com sucesso"}