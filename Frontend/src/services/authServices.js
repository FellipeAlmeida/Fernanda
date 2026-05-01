import api from "../api.js"

export async function login(email, senha){
    const response = await api.post("/usuarios/login", {
        email,
        senha
    })

    return response.data
}