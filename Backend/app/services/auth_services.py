from jose import jwt, JWTError, ExpiredSignatureError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient

load_dotenv()

SECRET = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

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
        "exp": datetime.utcnow() + timedelta(hours=0.5)
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
        "exp": datetime.utcnow() + timedelta(hours=0.5)
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

# ENVIO DE EMAILS
def enviar_email(destinatario, assunto, html_content):

    message = Mail(
        from_email=os.getenv("EMAIL_FROM"),
        to_emails=destinatario,
        subject=assunto,
        html_content=html_content
    )

    try:
        sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
        response = sg.send(message)
        print("Email enviado!", response.status_code)
    except Exception as e:
        print("Erro ao enviar email:", str(e))
        raise e