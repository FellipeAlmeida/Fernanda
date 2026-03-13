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
    return await prisma.message.findUnique({
        where: {
            id: id
        }
    })
}
