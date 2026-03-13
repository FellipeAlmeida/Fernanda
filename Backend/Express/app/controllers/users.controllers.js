import { loginService } from '../services/users.services.js'
import { registerService } from '../services/users.services.js'

// --------------------------------------------------- LOGIN ---------------------------------------------------

export async function loginController(req, res){
    try {
        const { email, senha } = req.body

        const token = await loginService(req.body)
        return res.status(200).json({mensagem: "Login realizado com sucesso!", token})   

    } catch (error){
        return res.status(400).json({erro: error.message})
    }
}

// --------------------------------------------------- REGISTER ---------------------------------------------------

export async function registerController(req, res){
    try {
        const { email, senha } = req.body

        await registerService(req.body)
        return res.status(201).json({mensagem: "Usuário Criado com sucesso!"})
    } catch (error) {
        return res.status(400).json({erro: error.message})
    }
}

// --------------------------------------------------- USER/ME ---------------------------------------------------

export async function userMeController(req, res){
    try {
        return res.status(200).json({mensagem: "Usuário retornado com sucesso!", data: req.user})
    } catch (error) {
        return res.status(401).json({mensagem: "Token não fornecido ou inválido"})
    }
}