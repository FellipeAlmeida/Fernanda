import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Chat from "../components/Chat/Chat.jsx";

export default function ChatLayout() {
  const [conversationId, setConversationId] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setConversationId={setConversationId} />
      <Chat conversationId={conversationId} />
    </div>
  );
}