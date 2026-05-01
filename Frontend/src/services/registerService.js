import api from "../api.js"

export async function register(email, senha, nome){
    const response = await api.post("/usuarios/register", {
        email,
        senha,
        nome
    })

    return response.data.data
}