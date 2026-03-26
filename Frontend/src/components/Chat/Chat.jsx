import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../../services/messageServices.js";
import "./Chat.css";

export default function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!conversationId) return;

    async function load() {
      const data = await getMessages(conversationId);
      setMessages(data.data);
    }

    load();
  }, [conversationId]);

  async function handleSend() {
    if (!input.trim() || !conversationId) return;

    const msg = {
      content: input,
      role: "user",
      conversationId,
    };

    setMessages((prev) => [...prev, msg]);
    setInput("");

    const res = await sendMessage(msg);

    if (res.botResponse) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.botResponse },
      ]);
    }
  }

  if (!conversationId) {
    return (
      <div style={{ flex: 1, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}