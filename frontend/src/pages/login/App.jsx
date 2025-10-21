import BackgroundBlack from "/images/Black/BackgroundBlack.png";
import BackgroundWhite from "/images/White/BackgroundWhite.png";
import Cabecalho from '../../components/HeaderPages';
import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

function Login() {
  const [darkTheme, setDarkTheme] = useState(true)

    //Modo simples para um if, else em react
    function ChangeTheme() {
        setDarkTheme(nomeAleatorio => !nomeAleatorio)
    }
    
    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
    }, [darkTheme]);
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  async function Enviarlogin() {
    try {
      const res = await axios.post('http://localhost:5010/Login', {
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
    <main className={`MainLogin ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho darkTheme={darkTheme} onChangeTheme={ChangeTheme}/>
      <section  className='conteiner-App'>
        <div className="fundo-secundario">
          <div className="login-fundo">
            <h1>Entrar</h1>
            <h2>Seja Bem-vindo de volta</h2>
          </div>
          <div className="conteiner-login">
            <input className='um' type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
            <input className='um' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          </div>
        </div>
      </section>
      <section className='conteiner-link-botao'>
        <div>
          <Link to="/Cadastro" className="link-login">Criar Conta!</Link>
          <button className='botao' onClick={Enviarlogin}>Entrar</button>
        </div>
      </section>
    </main>
  )
}
export default Login;