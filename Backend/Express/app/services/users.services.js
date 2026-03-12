import { buscaUsuarioPorEmail } from '../models/users.models.js'
import { env } from '../config/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function loginService(body) {

    const { email, senha } = body
    const agora = new Date()

    if (!email || !senha) {
        throw new Error("Usuário e senha obrigatórios.")
    }

    const user = await buscaUsuarioPorEmail(email)

    if (!user) {
        throw new Error("Usuário ou senha inválidos.")
    }

    // verifica bloqueio
    if (user.tempo_bloqueado && user.tempo_bloqueado > agora) {
        throw new Error(`Conta bloqueada até ${user.tempo_bloqueado}`)
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {

        const tentativas = await incrementarTentativas(email)

        if (tentativas > 3) {

            const vezesBloqueado = await incrementarBloqueio(email)

            const minutos = await aplicarBloqueio(email, vezesBloqueado)

            throw new Error(`Conta bloqueada por ${minutos} minutos.`)
        }

        throw new Error("Credenciais inválidas.")
    }

    await resetarTentativas(email)

    const token = jwt.sign(
        {
        id: user.id,
        email: user.email,
        perfil: user.perfil
        },
        env.secretKey,
        { expiresIn: "1h" }
    )

    return token
}