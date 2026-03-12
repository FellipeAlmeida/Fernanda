# Projeto Fernanda

Projeto de Chatbot sobre educação fiscal. A ideia do projeto é ensinar às pessoas sobre educação fiscal e espalhar conteúdo informativo sobre a fiscalização brasileira.

## Tecnologias

- **Angular** - Frontend
- **Node.js + Express** - API principal
- **FastAPI** - Serviço do ChatBot
- **Docker** - Conteinarização
- **Prisma** - ORM
- **PostgreSQL** - Banco de Dados

## Estrutura do Projeto
```
FernandaBot
    /Backend
        /Express
            /app
                /config
                /controllers
                /database
                /middlewares
                /models
                /routes
                /services
                app.js
                server.js
            Dockerfile
            start_express.sh
        /FastAPI
            /app
                /config
                /controllers
                /routes
                /services
                server.py
            Dockerfile
            requirements.txt
            start_chatbot.sh
    /Frontend
    /prisma
        schema.prisma
    .env-example
    .gitignore
    docker-compose.yml
    package-lock.json
    package.json
    readme.md

```

## Arquitetura

### Alto Nível
![alt text](image.png)

### Backend Express
- routes -> Recebe requisições
- controllers -> Trata requisições
- services -> Regras de negócio
- models -> Queries do banco
- database -> Conexão com o banco