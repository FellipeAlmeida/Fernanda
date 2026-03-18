import { useState } from 'react'
import { login } from '../../services/authServices.js'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  async function fazLogin(){
    try {
      const data = await login(email, senha)
      console.log(data)
    } catch (error) {
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
        <a>Registre-se</a>
      </div>
    </div>
  );
}