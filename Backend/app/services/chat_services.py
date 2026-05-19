from sqlalchemy.orm import Session
from app.services.message_service import get_messages_by_conversation
from app.ai.chatbot import ask_fernanda
from app.services.message_service import create_message
from app.services.message_service import get_messages_by_conversation

def chat_service(db, request):

    history = get_messages_by_conversation(
        db,
        request.conversation_id
    )

    create_message(
        db,
        request.conversation_id,
        request.message,
        "user"
    )

    resposta = ask_fernanda(
        user_message=request.message,
        history=history
    )

    create_message(
        db,
        request.conversation_id,
        resposta,
        "assistant"
    )

    return {
        "reply": resposta
    }