from pydantic import BaseModel, EmailStr
from app.core.password_pattern import PasswordStr

class CreateUser(BaseModel):
    email: EmailStr
    senha: PasswordStr
    nome: str

class UserRecoveryPassword(BaseModel):
    email: EmailStr

class UserChangePassword(BaseModel):
    token: str
    senha: PasswordStr
    senha_confirmacao: PasswordStr

class LoginRequest(BaseModel):
    email: EmailStr
    senha: str