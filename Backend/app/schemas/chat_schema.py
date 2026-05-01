from pydantic import BaseModel
from typing import List

class MessageHistory(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    historico: List[MessageHistory]