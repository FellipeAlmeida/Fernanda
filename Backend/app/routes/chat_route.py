from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.chat_services import chat_service
from app.schemas.chat_schema import ChatRequest

chat_router = APIRouter(
    tags=["01. Chat"]
)

@chat_router.post("/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        return chat_service(db, request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao gerar acesso {e}")