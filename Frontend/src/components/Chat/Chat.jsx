import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../../services/messageServices.js";
import "./Chat.css";


export default function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!input.trim() || !conversationId || loading) return; // -> nao deixa enviar se input for vazio, se nenhuma conversa for selecionada e se loading = true

    const userMessage = {
      content: `${input}`,
      role: "user",
      conversationId,
    };

    // adiciona mensagem do usuário na tela
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");

    setLoading(true)

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
    } finally {
      // executa em sucesso e erro (evita carregar pra sempre)
      setLoading(false)
    }
  }

  if (!conversationId) {
    return (
      <div className="noConversation"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color:"#e5e7eb",
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

        {loading && ( // -> loading true, renderiza esse html
          <div className="message assistant">
            <div className="typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>  
        )}

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

        <button onClick={handleSend} disabled={loading}>Enviar</button>
      </div>
    </div>
  );
}