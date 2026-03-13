import { prisma } from '../database/database.js'

// --------------------------------------------------

export async function buscaUsuarioPorEmail(email){
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

// --------------------------------------------------

export async function incrementarTentativas(email) {
    const user = await prisma.user.update({
        where: { email },
        data: {
        tentativas_login: { increment: 1 }
        },
        select: { tentativas_login: true }
    })

    return user.tentativas_login
}

// --------------------------------------------------

export async function incrementarBloqueio(email) {
    const user = await prisma.user.update({
        where: { email },
        data: {
        vezes_bloqueado: { increment: 1 }
        },
        select: { vezes_bloqueado: true }
    })

    return user.vezes_bloqueado
}

// --------------------------------------------------

export async function aplicarBloqueio(email, vezesBloqueado) {
    const bloqueioAte = new Date(Date.now() + (30000 * vezesBloqueado))

    await prisma.user.update({
        where: { email },
        data: {
        tempo_bloqueado: bloqueioAte
        }
    })

    const bloqueioEmMinutos = ((30000 * vezesBloqueado) / 1000) / 60

    return bloqueioEmMinutos
}

// --------------------------------------------------

export async function resetarTentativas(email) {
    await prisma.user.update({
        where: { email },
        data: {
        tempo_bloqueado: null,
        tentativas_login: 0
        }
    })
}

// --------------------------------------------------

export async function salvarUsuário(email, senhaHash) {
    await prisma.user.create({
        data: {
            email: email,
            senha: senhaHash
        },
    })
}
