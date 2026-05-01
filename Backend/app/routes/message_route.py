from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.message_service import get_messages_by_conversation
from app.schemas.message_schema import MessageResponse

message_router = APIRouter(
    prefix="/messages", 
    tags=["03. Messages"]
    )

@message_router.get("/{id}/messages")
def get_messages(id: int, db: Session = Depends(get_db)):
    try: 
        messages = get_messages_by_conversation(db, id)

        return {
            "message": "Conversa retornadas com sucesso!",
            "data": messages
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao gerar acesso {e}")