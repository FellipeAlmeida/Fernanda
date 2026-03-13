import jwt from 'jsonwebtoken'
import { env } from '../config/config.js'

export default function autenticacaoJwt(req, res, next){

    const auth = req.headers.authorization

    if (!auth){
        return res.status(401).json({erro: "Token não enviado"})
    }

    const token = auth.split(" ")[1]

    try {

        const decoded = jwt.verify(token, env.secretKey)

        req.user = decoded

        next()

    } catch (err) {

        console.log("JWT ERROR:", err)

        return res.status(401).json({erro: "Token inválido ou expirado."})
    }
}