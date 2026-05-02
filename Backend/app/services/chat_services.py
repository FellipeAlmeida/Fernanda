from sqlalchemy.orm import Session
from app.services.message_service import get_messages_by_conversation
from app.models.message_model import Message

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

def chat_service(db: Session, request):
    history = get_messages_by_conversation(db, request.conversation_id)

    create_message(db, request.conversation_id, request.message, "user")

    pergunta = request.message.lower()

    if "oi" in pergunta:
        resposta = "Olá, meu nome é Fernanda, sou um ChatBot que fala sobre educação fiscal!"
    else:
        resposta = "Ainda estou aprendendo, infelizmente não posso responder a sua dúvida :("

    create_message(db, request.conversation_id, resposta, "assistant")

    return {
        "reply": resposta,
        "history_count": len(history)
    }

