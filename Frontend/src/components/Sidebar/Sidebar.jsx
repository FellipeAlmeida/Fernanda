import { useEffect, useState } from "react";
import { getConversations, createConversation } from "../../services/conversationServices.js";
import "./Sidebar.css"

export default function Sidebar({ setConversationId }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    const data = await getConversations();
    setConversations(data);
  }

  async function handleNewChat() {
    await createConversation("Nova conversa");

    const updated = await getConversations()
    setConversations(updated)

    if (updated.length > 0) {
      setConversationId(updated[0].id)
    }
  }

  return (
    <div class="sidebar">
      <button onClick={handleNewChat}>Nova conversa</button>

      {conversations.map((conv) => (
        <div key={conv.id} onClick={() => setConversationId(conv.id)}>
          {conv.title}
        </div>
      ))}
    </div>
  );
}