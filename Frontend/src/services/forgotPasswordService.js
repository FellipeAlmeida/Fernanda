import api from "../api.js"

export async function forgotPasswordService(email){
    const response = await api.post("/usuarios/recovery-password", {
        email
    })
    
    return response.data
}