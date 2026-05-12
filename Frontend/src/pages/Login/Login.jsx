import { useState } from 'react'
import { login } from '../../services/authServices.js'
import './Login.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  async function fazLogin() {
    try {
      setLoading(true)
      const data = await login(email, senha)
      toast.success("Login realizado com sucesso!")
      localStorage.setItem("token", data.access_token)
      setTimeout(() => {
        navigate("/home")
      }, 1000)
    } catch (error) {
      toast.error("Login falhou.")
      console.log(error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') fazLogin()
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Bem vindo à Fernanda!</h1>
          <p>Faça login para continuar</p>
        </div>

        <div className="login-fields">
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

        <button className="login-btn" onClick={fazLogin} disabled={loading}>
          {loading ? (
            <span className="login-spinner" />
          ) : (
            <>
              Entrar
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </>
          )}
        </button>

        <Link to='/forgot-password' className="login-register-link">
          Esqueceu a senha?
        </Link>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <Link to='/register' className="login-register-link">
          Cadastrar Conta
        </Link>
      </div>
    </div>
  );
}