import { useEffect } from 'react'
import './Confirm-email.css'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { confirmEmailService } from '../../services/confirmEmail.js'

export default function ConfirmEmail() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        async function confirmEmail() {
            try {
                const token = searchParams.get("token")

                if (!token) {
                    toast.error("Token não encontrado")
                    return
                }

                await confirmEmailService(token)

                toast.success("Email verificado com sucesso!")

                setTimeout(() => {
                    navigate("/")
                }, 1000)

            } catch (error) {
                toast.error("Erro ao confirmar email.")
                console.log(error)
            }
        }

        confirmEmail()
    }, [])

    return (
        <div className="confirmEmail-container">
            <div className="confirmEmail-box">
                <h1>Verificando seu email...</h1>
            </div>
        </div>
    )
}