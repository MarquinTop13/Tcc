import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './App.scss'

function Login() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  async function Enviarlogin() {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        nome,
        email,
        senha
      })
      alert('Login feito com sucesso')
      navigate('/')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Nome, Email ou senha inválidos.')
      } else {
        alert('Erro ao conectar com o servidor.')
      }
    }
  }

  return (
    <>
    <main>
      <header className='cabecalho-login'>
        <div className='div-logo'>
          <img src="" height="" />
        </div>
        <nav className='nav-login'>
          <button>Modo escuro</button>
          <Link>Suporte</Link>
          <Link>Atualizações <br />e Serviços</Link>
          <Link>Login</Link>
        </nav>
      </header>
      <section>
        <div className="fundo-secundario">
          <div className="login-fundo">
            <h1>Entrar</h1>
            <h2>Seja Bem-vindo de volta</h2>
          </div>
          <div className="conteiner-login">
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          </div>
        </div>
      </section>
      <section className='conteiner-link-botao'>
        <div>
          <Link to="/registro" className="link-login">Criar Conta!</Link>
          <button className='botao' onClick={Enviarlogin}>Entrar</button>
        </div>
      </section>
    </main>
    </>
  )
}

export default Login
