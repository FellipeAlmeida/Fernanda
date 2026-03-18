import axios from "axios"

export async function login(email, senha){
    const response = await axios.post("/auth/login", {
        email,
        senha
    })

    return response.data
}