import { useState } from 'react'
import { login } from '../../services/authServices.js'
import './Login.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  const navigate = useNavigate()

  async function fazLogin(){
    try {
      const data = await login(email, senha)
      toast.success("Login realizado com sucesso!")
      console.log(data)

      localStorage.setItem("token", data.token)

      setTimeout(() => {
        navigate("/home")
      }, 1000)
    } catch (error) {
      toast.error("Login falhou.")
      console.log(error.response?.data)
    }
  }
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Bem-vindo ao ChatBot Fernanda!</h1>
        <p>Faça login para continuar</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={fazLogin}>Entrar</button>

        <p>Ou</p>
        <Link to='/register'>Criar conta</Link>
      </div>
    </div>
  );
}