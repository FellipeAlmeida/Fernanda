from jose import jwt, JWTError, ExpiredSignatureError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import resend

load_dotenv()

SECRET = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

# Configuração do Resend
resend.api_key = os.getenv("RESEND_API_KEY")


def criar_token_login(usuario):
    payload = {
        "sub": usuario.email,
        "id": usuario.id,
        "type": "auth",
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


# ------------------------------- VERIFY-EMAIL -------------------------------

def criar_token_verificacao(email: str):
    payload = {
        "sub": email,
        "type": "verificacao",
        "exp": datetime.utcnow() + timedelta(minutes=30)
    }

    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


# VALIDA TOKEN DE VERIFICAÇÃO
def validar_token_verificacao(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])

        if payload.get("type") != "verificacao":
            return {"erro": "tipo_invalido"}

        return payload

    except ExpiredSignatureError:
        return {"erro": "expirado"}

    except JWTError as e:
        print("Erro ao validar token:", str(e))
        return {"erro": "invalido"}


# ------------------------------- VERIFY-EMAIL -------------------------------


# ------------------------------- RECOVERY-PASSWORD -------------------------------

def criar_token_recuperacao_senha(email: str):
    payload = {
        "sub": email,
        "type": "password_reset",
        "exp": datetime.utcnow() + timedelta(minutes=30)
    }

    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


# VALIDA TOKEN DE RECUPERAÇÃO DE SENHA
def validar_token_recuperacao_senha(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])

        if payload.get("type") != "password_reset":
            return {"erro": "tipo_invalido"}

        return payload

    except ExpiredSignatureError:
        return {"erro": "expirado"}

    except JWTError as e:
        print("Erro ao validar token:", str(e))
        return {"erro": "invalido"}


# ------------------------------- RECOVERY-PASSWORD -------------------------------


# ENVIO DE EMAILS COM RESEND
def enviar_email(destinatario, assunto, html_content):
    try:
        params = {
            "from": os.getenv("EMAIL_FROM"),
            "to": [destinatario],
            "subject": assunto,
            "html": html_content
        }

        response = resend.Emails.send(params)

        print("Email enviado!", response)

        return response

    except Exception as e:
        print("Erro ao enviar email:", str(e))
        raise
