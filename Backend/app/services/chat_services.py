from app.services.message_service import (
    get_messages_by_conversation,
    create_message,
)
from app.ai.chatbot import ask_fernanda


def chat_service(db, request):

    history = get_messages_by_conversation(db, request.conversation_id)

    create_message(db, request.conversation_id, request.message, "user")

    resposta = ask_fernanda(
        user_message=request.message,
        history=history,
        conversation_id=request.conversation_id,
    )

    create_message(db, request.conversation_id, resposta, "assistant")

    return {"reply": resposta}