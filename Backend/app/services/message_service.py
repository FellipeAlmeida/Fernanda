from sqlalchemy.orm import Session
from app.models.message_model import Message

def get_messages_by_conversation(db: Session, conversation_id: int):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
        .all()
    )

def create_message(db: Session, conversation_id: int, message: str, role: str):
    new_message = Message(
        conversation_id=conversation_id,
        content=message,
        role=role
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message
