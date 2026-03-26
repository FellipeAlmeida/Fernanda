import api from "../api.js"

export async function createConversation(title){
    const response = await api.post("/conversations", {
        title
    })

    console.log("RESPONSE:", response.data); // 👈 FAZ ISSO

    return response.data.data
}

export async function getConversations(){
    const response = await api.get("/conversations")

    return response.data.data
}