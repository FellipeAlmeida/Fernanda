import axios from 'axios'
import { salvarMensagem } from '../models/chat.models.js'
import { buscarMensagensDaConversa } from '../models/chat.models.js'

export async function botService(conversationId, message){

    let conversation = await buscarMensagensDaConversa(conversationId)

    if (!conversation){
        throw new Error("Conversa não encontrada")
    }

    await salvarMensagem(message, "user", conversationId)

    const historico = await buscarMensagensDaConversa(conversationId)

    // chama o bot (FastAPI)
    const response = await axios.post("http://chatbot:3000/chat", {
        message: message,
        historico: historico
    })

    const botReply = response.data.reply

    await salvarMensagem(botReply, "assistant", conversationId)

    return botReply
}