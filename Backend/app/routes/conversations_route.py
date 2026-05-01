from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.conversation_schema import ConversationCreate, ConversationResponse
from app.services.conversation_service import create_conversation, get_user_conversations
from app.middlewares.auth import get_current_user

conversation_router = APIRouter(
    prefix="/conversations", 
    tags=["02. Conversations"]
    )

@conversation_router.post("", response_model=ConversationResponse)
def create(conv: ConversationCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return create_conversation(db, user["id"], conv.title)

@conversation_router.get("", response_model=list[ConversationResponse])
def list_conversations(db: Session = Depends(get_db), user = Depends(get_current_user)):
    try:
        return get_user_conversations(db, user["id"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao gerar acesso {e}")