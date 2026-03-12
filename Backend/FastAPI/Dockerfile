FROM python:latest

WORKDIR /FastAPI

COPY Backend/FastAPI .

COPY Backend/FastAPI/requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 3000

CMD ["sh", "start_chatbot.sh"]

