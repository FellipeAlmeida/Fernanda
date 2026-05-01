from sqlalchemy.orm import Session
from app.models.conversations_model import Conversation

def create_conversation(db: Session, user_id: int, title: str):
    conversation = Conversation(user_id=user_id, title=title)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation

def get_user_conversations(db: Session, user_id: int):
    return db.query(Conversation).filter(Conversation.user_id == user_id).all()