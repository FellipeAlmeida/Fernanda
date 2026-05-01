from jose import jwt, JWTError
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
import os

load_dotenv()

SECRET = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")
security = HTTPBearer()

if not SECRET:
    raise RuntimeError("SECRET_KEY não definida nas variáveis de ambiente!")

# Valida token
def autentica(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])

        if payload.get("type") != "auth":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido"
            )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado"
        )


# Pega usuário do token
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    return autentica(token)

