import { useState } from 'react'
import { register } from '../../services/registerService.js'
import './Register.css'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  async function registraConta() {
    try {
      setLoading(true)
      const data = await register(email, senha, nome)
      toast.success("Usuário criado com sucesso!")
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (error) {
      toast.error("Erro ao criar conta.")
      console.log(error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') registraConta()
  }

  return (
    <div className="register-container">
      <div className="register-box">

        <div className="register-header">
          <h1>Bem vindo à Fernanda!</h1>
          <p>Crie sua conta para continuar</p>
        </div>

        <div className="register-fields">
          <div className="field-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

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

          <div className="field-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <button className="register-btn" onClick={registraConta} disabled={loading}>
          {loading ? (
            <span className="register-spinner" />
          ) : (
            <>
              Criar conta
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </>
          )}
        </button>

        <div className="register-divider">
          <span>ou</span>
        </div>

        <Link to='/' className="register-login-link">
          Já tenho uma conta
        </Link>
      </div>
    </div>
  );
}