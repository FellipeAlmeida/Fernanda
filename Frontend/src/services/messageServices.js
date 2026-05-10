import api from "../api.js"

export async function sendMessage(conversationId, message){
    const response = await api.post("/chat", {
        conversation_id: conversationId,
        message
    })

    return response.data.reply
}

export async function getMessages(conversationId){
    const response = await api.get(`/conversations/${conversationId}/messages`)

    return response.data.data
}   