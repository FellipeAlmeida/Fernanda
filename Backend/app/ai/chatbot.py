from app.ai.inference import generate_response


def ask_fernanda(user_message: str, history=None, conversation_id: int = 0) -> str:
    """
    Repassa a mensagem ORIGINAL do aluno para o grafo multi-agente.

    Saudações, prompts de sistema e histórico agora ficam por conta do grafo
    (intenção "conversa" e checkpointer), então não são montados aqui.
    """
    return generate_response(user_message, conversation_id)