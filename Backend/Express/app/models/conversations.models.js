import { prisma } from '../database/database.js'

// -------------------------------------------------------

export async function salvarConversation(userId, title){
    return await prisma.conversation.create({
        data: {
            userId: userId,
            title: title,
        }
    })
}

// -------------------------------------------------------

export async function listConversation(){
    return await prisma.conversation.findMany()
}

// -------------------------------------------------------

export async function getConversation(id){
    try {
        const mensagens = await prisma.message.findMany({
            where: {
                conversationId: id
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        return mensagens;
    } catch (error) {
        throw error;
    }
}