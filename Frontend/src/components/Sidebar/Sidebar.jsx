import { useEffect, useState } from "react";
import { getConversations, createConversation } from "../../services/conversationServices.js";
import "./Sidebar.css";

export default function Sidebar({ setConversationId }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    const data = await getConversations();
    setConversations(data);
  }

  async function handleNewChat() {
    await createConversation("Nova conversa");
    const updated = await getConversations();
    setConversations(updated);
    if (updated.length > 0) {
      setActiveId(updated[0].id);
      setConversationId(updated[0].id);
    }
  }

  function handleSelect(id) {
    setActiveId(id);
    setConversationId(id);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <span className="sb-logo-text">Fernanda</span>
      </div>

      <button className="new-chat-btn" onClick={handleNewChat}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Nova conversa
      </button>

      <span className="sb-section-label">Recentes</span>

      <div className="sb-list">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`conv-item ${activeId === conv.id ? "active" : ""}`}
            onClick={() => handleSelect(conv.id)}
          >
            <div className="conv-dot" />
            <span className="conv-title">{conv.title}</span>
          </div>
        ))}
      </div>

      <div className="sb-footer">
        <div className="avatar">U</div>
        <div className="user-info">
          <div className="user-name">Usuário</div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Sair">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
      </div>
    </div>
  );
}