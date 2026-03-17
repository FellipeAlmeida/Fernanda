FROM python:latest

WORKDIR /FastAPI

COPY . .

COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 3000

CMD ["sh", "start_chatbot.sh"]

