import api from "../api.js"

export async function resetPasswordService(token, senha, senhaConfirmacao){
    const response = await api.post("/usuarios/change-password", {
        token,
        senha,
        senha_confirmacao: senhaConfirmacao
    })
    return response.data
}