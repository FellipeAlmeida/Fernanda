from fastapi import FastAPI, Response
from app.routes.chat_route import router

app = FastAPI()

app.include_router(router)

@app.get('/')
async def teste():
    return {"msg": "Fernanda Rodando!"}