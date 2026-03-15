import { botService } from '../services/chat.services.js'

export async function botServiceController(req, res){
     try {

        const { conversationId, message } = req.body

        if (!conversationId || !message) {
            return res.status(400).json({
                erro: "conversationId e message são obrigatórios"
            })
        }

        const reply = await botService(conversationId, message)

        return res.status(200).json({
            reply
        })

    } catch (error) {
        console.log(`Erro: ${error}`)
        return res.status(400).json({erro: error.message})
    }
}