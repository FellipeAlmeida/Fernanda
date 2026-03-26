import { useState } from 'react'
import { register } from '../../services/registerService.js'
import './Register.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  const navigate = useNavigate()

  async function registraConta(){
    try {
      const data = await register(email, senha)
      toast.success("Usuário criado com sucesso!")    
      console.log(data)

      setTimeout(() => {
        navigate("/")
      }, 3000)

    } catch (error) {
      toast.error("Usuário falhou.")    
      console.log(error.response?.data)
    }
  }
  
  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Bem vindo ao ChatBot Fernanda!</h1>
        <p>Crie sua conta para continuar</p>

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

        <button onClick={registraConta}>Criar conta</button>
      </div>
    </div>
  );
}