import { loginService } from '../services/users.services.js'

// --------------------------------------------------- LOGIN ---------------------------------------------------

export async function loginController(req, res){
    try {
        const { email, senha } = req.body

        const token = await loginService(req.body)
        return res.status(200).json({mensagem: "Login realizado com sucesso!", token})   

    } catch (error){
        console.log(`Erro: ${error}`)
        return res.status(400).json({erro: error.message})
    }
}