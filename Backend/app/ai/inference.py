import requests
import os

IA_URL = os.getenv("IA_URL")

def generate_response(prompt: str):

    response = requests.post(
        f"{IA_URL}/chat",
        json={
            "message": prompt
        },
        timeout=120
    )

    data = response.json()

    return data["final_response"]