import api from "../api.js"

export async function confirmEmailService(token){
    const response = await api.get(`usuarios/verifyemail?token=${token}`)
}