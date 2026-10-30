import os

import requests

IA_URL = os.getenv("IA_URL")


def generate_response(message: str, conversation_id: int) -> str:
    """
    Envia a mensagem do aluno (texto puro) para a API do grafo
    e devolve o final_response montado pelo Integrador.
    """

    if not IA_URL:
        raise RuntimeError("A variável de ambiente IA_URL não está definida.")

    response = requests.post(
        f"{IA_URL}/chat",
        json={
            "conversation_id": conversation_id,
            "message": message,
        },
        timeout=120,
    )

    print("STATUS:", response.status_code)
    print("BODY:", response.text)

    if response.status_code != 200:
        raise RuntimeError(
            f"API da IA falhou ({response.status_code}): {response.text}"
        )

    data = response.json()
    final_response = data.get("final_response")

    if not final_response:
        raise ValueError(f"Resposta da API da IA sem final_response: {data}")

    return final_response