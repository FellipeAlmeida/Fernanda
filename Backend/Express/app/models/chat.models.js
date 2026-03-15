import { prisma } from '../database/database.js'

export async function salvarMensagem(content, role, conversationId) {
    return await prisma.message.create({
        data: {
            content,
            role,
            conversationId
        }
    })
}

export async function buscarMensagensDaConversa(conversationId) {
    return await prisma.message.findMany({
        where: {
            conversationId
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}

export async function buscaConversa(conversationId) {
    return await prisma.conversation.findUnique({
        where: { id: conversationId }
    })
}
