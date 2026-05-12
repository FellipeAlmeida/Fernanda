import { useState } from 'react'
import './ResetPassword.css'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetPasswordService } from '../../services/resetPasswordService.js'

export default function ResetPassword() {
  const [senha, setSenha] = useState("")
  const [confirma, setConfirma] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  async function handleSubmit() {
    if (!senha || !confirma) {
      toast.error("Preencha todos os campos.")
      return
    }

    if (senha !== confirma) {
      toast.error("As senhas não coincidem.")
      return
    }

    const token = searchParams.get("token")

    if (!token) {
      toast.error("Token não encontrado.")
      return
    }

    try {
      setLoading(true)
      await resetPasswordService(token, senha, confirma)
      toast.success("Senha redefinida com sucesso!")
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (error) {
      toast.error("Erro ao redefinir senha.")
      console.log(error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  const senhasNaoCoincidem = confirma.length > 0 && senha !== confirma

  return (
    <div className="rp-container">
      <div className="rp-box">

        <div className="rp-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        <div className="rp-header">
          <h1>Redefinir senha</h1>
          <p>Escolha uma nova senha para sua conta.</p>
        </div>

        <div className="rp-fields">
          <div className="field-group">
            <label>Nova senha</label>
            <input
              type="password"
              placeholder="Digite sua nova senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="field-group">
            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Confirme sua nova senha..."
              value={confirma}
              onChange={(e) => setConfirma(e.target.value)}
              onKeyDown={handleKeyDown}
              className={senhasNaoCoincidem ? "input-error" : ""}
            />
            {senhasNaoCoincidem && (
              <span className="field-error">As senhas não coincidem</span>
            )}
          </div>
        </div>

        <button className="rp-btn" onClick={handleSubmit} disabled={loading || senhasNaoCoincidem}>
          {loading ? (
            <span className="rp-spinner" />
          ) : (
            <>
              Redefinir senha
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </>
          )}
        </button>

        <div className="rp-divider">
          <span>ou</span>
        </div>

        <a href="/" className="rp-back-link">
          Voltar para o login
        </a>
      </div>
    </div>
  )
}