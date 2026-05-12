# Projeto Fernanda

Projeto de Chatbot sobre educação fiscal. A ideia do projeto é ensinar às pessoas sobre educação fiscal e espalhar conteúdo informativo sobre a fiscalização brasileira.

## Tecnologias

- **React** - Frontend
- **FastAPI** - Backend
- **Docker** - Conteinarização
- **SQLalchemy** - ORM
- **PostgreSQL** - Banco de Dados

## Estrutura do Projeto
```
FernandaBot
    /alembic
    /Backend
        /app
            /core
            /database
            /middlewares
            /models
            /routes
            /schemas
            /services
            server.py
        Dockerfile
        requirements.txt
        start_chatbot.sh
    /Frontend
        /src
            /assets
            /components
            /pages
            /services
            App.jsx
            main.jsx
            index.css
        Dockerfile
        index.html
        package-lock.json
        package.json
        vite.config.js
    .env-example
    .gitignore
    docker-compose.yml
    README.md

```

## Como rodar o Projeto

### Pré-requisitos

Certifique-se de ter o docker e o git instalado.

**Passo 1** - Clonar repo
```
git clone <url do repositorio>
```

**Passo 2** - Criar .env na **raiz do projeto**
```
POSTGRES_USER=admin
POSTGRES_PASSWORD=12345
POSTGRES_DB=db
SECRET_KEY=sua_chave_secreta
DATABASE_URL=postgresql+psycopg2://admin:12345@localhost:5432/db
DATABASE_URL_DOCKER=postgresql+psycopg2://admin:12345@db:5432/db
SENDGRID_API_KEY=sua_chave_api
EMAIL_FROM=seu_email
BASE_URL=http://localhost:5173
JWT_ALGORITHM=seu_algoritimo
```

**Passo 3** - Comando docker para buildar
```
docker compose up -d --build
```

## Arquitetura

### Alto Nível
![alt text](image-1.png)

### Backend
- routes -> Recebe e trata requisições
- services -> Regras de negócio
- models -> Modelos do banco (Classes)
- database -> Conexão com o banco
- schemas -> Definição da entrada e saida de dados e suas tipagens

### Frontend
- assets -> imagens, logos, fontes..
- components -> componentes reutilizáveis
- pages -> páginas do sistema
- services -> chamadas de api

## Diagramas

### Diagrama de caso de uso
![alt text](image.png)

### Diagrama ER
![alt text](image-2.png)
---