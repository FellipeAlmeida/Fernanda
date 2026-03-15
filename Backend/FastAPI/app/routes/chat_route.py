from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(
    tags=["01. Chat"]
)

class MessageHistory(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    historico: List[MessageHistory]

@router.post("/chat")
async def chat(request: ChatRequest):
    pergunta = request.message.lower()

    if "oi" in pergunta:
        resposta = "Olá, meu nome é Fernanda, sou um ChatBot que fala sobre educação fiscal!"
    else: 
        resposta = "Ainda estou aprendendo, infelizmente não posso responder a sua dúvida :("
    
    return {
        "reply": resposta
    }