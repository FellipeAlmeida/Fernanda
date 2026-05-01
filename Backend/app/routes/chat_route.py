from fastapi import APIRouter, Depends, HTTPException
from app.schemas.chat_schema import ChatRequest

chat_router = APIRouter(
    tags=["01. Chat"]
)

@chat_router.post("/chat")
async def chat(request: ChatRequest):
    try:
        pergunta = request.message.lower()

        if "oi" in pergunta:
            resposta = "Olá, meu nome é Fernanda, sou um ChatBot que fala sobre educação fiscal!"
        else: 
            resposta = "Ainda estou aprendendo, infelizmente não posso responder a sua dúvida :("
        
        return {
            "reply": resposta
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao gerar acesso {e}")