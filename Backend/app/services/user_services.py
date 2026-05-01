from werkzeug.security import generate_password_hash
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.services.auth_services import (
    criar_token_verificacao,
    validar_token_verificacao
)

# ------------------------- CRIA -------------------------

def register_user(db: Session, data: dict):
    email = data.get("email")
    senha = data.get("senha")
    nome = data.get("nome")

    if not email or not senha or not nome:
        raise ValueError("Dados inválidos")

    email = email.strip().lower()
    nome = nome.strip().lower()

    user_existente = db.query(User).filter_by(email=email).first()

    if user_existente:
        if user_existente.ativo:
            raise ValueError("Email já cadastrado")

        novo_token = criar_token_verificacao(user_existente.email)
        user_existente.token_verificacao = novo_token

        db.commit()
        db.refresh(user_existente)

        validar_token_verificacao(novo_token)

        return user_existente

    novo_usuario = User(
        email=email,
        senha=generate_password_hash(senha),
        nome=nome,
        ativo=False
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    token = criar_token_verificacao(novo_usuario.email)
    novo_usuario.token_verificacao = token

    db.commit()
    db.refresh(novo_usuario)

    validar_token_verificacao(token)

    return novo_usuario

# ------------------------- DELETA -------------------------

def delete_me(db: Session, user: User):
    db.delete(user)
    db.commit()
