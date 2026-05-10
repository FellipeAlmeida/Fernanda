import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../../services/messageServices.js";
import "./Chat.css";

export default function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!conversationId) return;

    async function load() {
      try {
        const data = await getMessages(conversationId);
        setMessages(data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }

    load();
  }, [conversationId]);

  async function handleSend() {
    if (!input.trim() || !conversationId) return;

    const userMessage = {
      content: input,
      role: "user",
      conversationId,
    };

    // adiciona mensagem do usuário na tela
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");

    try {
      // resposta do backend
      const reply = await sendMessage(conversationId, currentInput);

      console.log(reply);

      // adiciona resposta do bot
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  if (!conversationId) {
    return (
      <div
        style={{
          flex: 1,
          color: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Selecione ou crie uma conversa
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}