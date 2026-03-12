import jwt from 'jsonwebtoken'
import { env } from '../config/config.js'

export default function autenticacaoJwt(req, res, next){
    const auth = req.headers.authorization

    if (!auth){
        return res.status(401).json({erro: "Token não enviado"})
    }

    try {
        const decoded = jwt.verify(auth, env.secretKey)
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({erro: "Token inválido ou expirado."})
    }
}