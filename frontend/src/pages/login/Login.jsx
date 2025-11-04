import BackgroundBlack from "/images/Black/BackgroundBlack.png";
import BackgroundWhite from "/images/White/BackgroundWhite.png";
import Cabecalho2 from '../../components/HeaderPages';
import { Link, useNavigate } from 'react-router';
import Modal from "../../components/err/index.jsx";
import { useState, useEffect } from 'react';
import apiLink from "../../axios";
import './Login.scss';

function Login() {
  // Apenas LER o localStorage que já foi salvo anteriormente
  const [darkTheme, setDarkTheme] = useState(() => {
    const themeSaved = localStorage.getItem("TemaEscuro");
    return themeSaved ? themeSaved === 'true' : false;
  })

  // Mudar tema escuro para claro
  function ChangeTheme() {
    setDarkTheme(prevTheme => !prevTheme)
  }

  // Apenas aplicar o background - NÃO salvar no localStorage aqui
  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
  }, [darkTheme]);

  const [codigoErro, setCodigoErro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();


  async function Enviarlogin() {
    try {
      const res = await apiLink.post('/Login', {
        nome,
        email,
        senha
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("User", nome);
      localStorage.setItem("Email", email);

      alert('Login feito com sucesso');
      navigate("/");
    } catch (error) {
      const status = error.response?.status; {
        setCodigoErro(status);

        if (codigoErro === 401 || status === 401) {
          setShowModal(true);
        }

        else if (codigoErro === 403 || status === 403) {
          setShowModal(true);
        }

        else if (codigoErro === 404 || status === 404) {
          setShowModal(true);
        }

        else if (codigoErro === 500 || status === 500) {
          setShowModal(true);
        }
      }
    }
  }
  return (
    <main className={`MainLogin ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
      <section className='conteiner-App'>
        <div className="fundo-secundario">
          <div className="login-fundo">
            <h1>Entrar</h1>
            <h2>Seja Bem-vindo de volta</h2>
          </div>
          <div className="conteiner-login">
            <input 
            className='um' 
            type="text" 
            placeholder="Nome/Apelido" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            />
            <input 
            className='um' 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            />
          <div className="campo-senha">
            <input 
            className="input-senha"
            type={mostrar ? "text" : "password"} 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            />
            <button className="botao-visivel" onClick={() => setMostrar(!mostrar)}></button>
          </div>
          </div>
        </div>

        <section className='conteiner-link-botao'>
          <Link to="/Cadastro" className="link-login">Criar Conta!</Link>
          <button className='botao' onClick={Enviarlogin}>Entrar</button>
        </section>
        <Modal isOpen={showModal} setModalOpen={() => setShowModal(!showModal)} codigoErro={codigoErro}></Modal>
      </section>
    </main>
  )
}
export default Login;