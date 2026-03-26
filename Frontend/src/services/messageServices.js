import api from "../api.js"

export async function sendMessage(conversationId, message){
    const response = await api.post("/chat", {
        conversationId,
        message
    })

    return response.data.data
}

export async function getMessages(conversationId){
    const response = await api.get(`/conversations/${conversationId}/messages`)

    return response.data.data
}   