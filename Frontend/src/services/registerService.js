import api from "../api.js"

export async function register(email, senha){
    const response = await api.post("/auth/register", {
        email,
        senha
    })

    return response.data.data
}