import { salvarConversation } from '../models/conversations.models.js'
import { listConversation } from '../models/conversations.models.js'
import { getConversation } from '../models/conversations.models.js'

// -------------------------------------------------------

export async function createConversationService(userId, title){
    try {
        await salvarConversation(userId, title)
    } catch (error) {
        throw error
    }
}

// -------------------------------------------------------

export async function listConversationService(){
    try {
        const conversas = await listConversation()
        return conversas
    } catch (error) {
        throw error
    }
}

// -------------------------------------------------------

export async function getConversationService(id){
    try {
        const conversa = await getConversation(Number(id))
        return conversa
    } catch (error) {
        throw error
    }
}

