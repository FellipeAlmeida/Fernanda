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
                <div className="confirmEmail-logo">
                    <div className="confirmEmail-logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <span className="confirmEmail-logo-text">ChatApp</span>
                </div>

                <div className="confirmEmail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                </div>

                <h1>Verificando seu email...</h1>
                <p>Aguarde enquanto confirmamos sua conta. Você será redirecionado em instantes.</p>

                <div className="confirmEmail-spinner-wrap">
                    <div className="confirmEmail-spinner" />
                    <span className="confirmEmail-spinner-label">Processando verificação...</span>
                </div>
            </div>
        </div>
    )
}