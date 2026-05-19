from app.ai.inference import generate_response

SYSTEM_PROMPT = """
Você é Fernanda, uma assistente virtual brasileira especializada em educação fiscal.

Regras:
- responda apenas perguntas relacionadas à educação fiscal, impostos, cidadania e serviços públicos
- seja objetiva
- responda em no máximo 3 frases
- não invente informações
- não continue diálogos sozinho
- não repita a pergunta
- não crie exemplos extras sem necessidade
- pare imediatamente após responder

"""

def ask_fernanda(user_message, history):

    prompt = SYSTEM_PROMPT + "\n\n"

    recent_history = history[-6:]

    for msg in recent_history:

        if msg.role == "user":
            prompt += f"### Instruction:\n{msg.content}\n\n"

        elif msg.role == "assistant":
            prompt += f"### Response:\n{msg.content}\n\n"

    prompt += f"### Instruction:\n{user_message}\n\n### Response:\n"

    response = generate_response(prompt)

    return response