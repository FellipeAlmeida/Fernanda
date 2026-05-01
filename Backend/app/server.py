from fastapi import FastAPI, Response
from app.routes.chat_route import chat_router
from app.routes.conversations_route import conversation_router
from app.routes.message_route import message_router
from app.routes.user_route import user_router
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()  

app = FastAPI()

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],    
)

app.include_router(chat_router)
app.include_router(conversation_router)
app.include_router(message_router)
app.include_router(user_router)

@app.get('/')
async def teste():
    return {"msg": "Fernanda Rodando!"}