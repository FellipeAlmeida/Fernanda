FROM python:latest

WORKDIR /Backend

COPY . .

COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["sh", "start_chatbot.sh"]

