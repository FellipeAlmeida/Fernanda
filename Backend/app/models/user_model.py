from sqlalchemy import Column, String, Integer, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    senha = Column(String(255), nullable=False)
    ativo = Column(Boolean, nullable=False, default=False, server_default='False')
    token_verificacao = Column(String(255), nullable=True)
    tentativas_login =  Column(Integer, nullable=False, default=0, server_default='0')
    tempo_bloqueado = Column(DateTime)
    vezes_bloqueado = Column(Integer, default=0, server_default='0')

    conversations = relationship("Conversation", back_populates="user", cascade="all, delete")