from fastapi import FastAPI, Response

app = FastAPI()

@app.get('/')
async def teste():
    return Response(content="Fernanda Rodando!")