import { useState } from 'react'
import './ForgotPassword.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { forgotPasswordService } from '../../services/forgotPasswordService.js'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!email) {
      toast.error("Digite seu email.")
      return
    }

    try {
      setLoading(true)
      await forgotPasswordService(email)
      setSent(true)
      toast.success("Email de recuperação enviado!")
    } catch (error) {
      toast.error("Erro ao enviar email.")
      console.log(error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="fp-container">
      <div className="fp-box">

        <div className="fp-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <div className="fp-header">
          <h1>Recuperar senha</h1>
          <p>
            {sent
              ? "Verifique sua caixa de entrada e siga as instruções do email."
              : "Digite seu email e enviaremos um link para redefinir sua senha."}
          </p>
        </div>

        {!sent && (
          <div className="fp-fields">
            <div className="field-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Digite seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        )}

        {sent ? (
          <div className="fp-success-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="fp-success-label">Email enviado com sucesso</span>
          </div>
        ) : (
          <button className="fp-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="fp-spinner" />
            ) : (
              <>
                Enviar link de recuperação
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        )}

        <div className="fp-divider">
          <span>ou</span>
        </div>

        <Link to="/" className="fp-back-link">
          Voltar para o login
        </Link>
      </div>
    </div>
  )
}