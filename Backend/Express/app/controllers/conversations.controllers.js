import { createConversationService } from '../services/conversations.services.js'
import { listConversationService } from '../services/conversations.services.js'
import { getConversationService } from '../services/conversations.services.js'

// -------------------------------------------------------

export async function conversationCreateController(req, res){
    try {
        const { title } = req.body
        const userId = req.user.id

        await createConversationService(userId, title)
        return res.status(201).json({message: "Conversa salva com sucesso! "})
    } catch (error) {
        console.log(`Erro: ${error}`)
        return res.status(400).json({erro: error.message})
    }
}

// -------------------------------------------------------

export async function conversationListController(req, res){
    try {
        const conversas = await listConversationService()
        return res.status(201).json({message: "Conversas retornadas com sucesso!", data: conversas})
    } catch (error) {
        console.log(`Erro: ${error}`)
        return res.status(400).json({erro: error.message})
    }
}

// -------------------------------------------------------

export async function conversationGetController(req, res){
    try {
        const id = req.params.id

        const conversa = await getConversationService(id)
        return res.status(201).json({message: "Conversa retornadas com sucesso!", data: conversa})
    } catch (error) {
        console.log(`Erro: ${error}`)
        return res.status(400).json({erro: error.message})
    }
}