import Cabecalho from '../../components/HeaderPages'
import { useNavigate } from 'react-router'
import { Link } from 'react-router';
import { useState, useEffect } from 'react'
import BackgroundBlack from "/images/Black/BackgroundBlack.png";
import BackgroundWhite from "/images/White/BackgroundWhite.png";
import apiLink from '../../axios';
import './cadastro.scss';

function Cas() {
  //Modo escuro:
              const [darkTheme, setDarkTheme] = useState(() => {
                  const themeSaved = localStorage.getItem("TemaEscuro");
                  return themeSaved ? themeSaved === 'true' : false;
              })
              //Mudar tema escuro para claro
              function ChangeTheme() {
                  setDarkTheme(prevTheme => !prevTheme)
              }
      
              //Background mudando de acordo com o tema escolhido
              useEffect(() => {
                  document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
              }, [darkTheme]);
      
              //Setar o modo escuro no localStorage
              useEffect(() => {
                  localStorage.setItem('TemaEscuro', darkTheme.toString())
              }, [darkTheme])

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    palavra: "",
    confirmarSenha: "",
    idade: ""
  })

  function validarEmail(email) {
    const Regex = [
      /^[^\s@]+@gmail\.com$/,
      /^[^\s@]+@outlook\.com$/,
      /^[^\s@]+@yahoo\.com$/,
      /^[^\s@]+@hotmail\.com$/,
      /^[^\s@]+@icloud\.com$/,
      /^[^\s@]+@protonmail\.com$/,
      /^[^\s@]+@live\.com$/,
      /^[^\s@]+@zoho\.com$/,
      /^[^\s@]+@gmx\.com$/,
      /^[^\s@]+@yandex\.com$/,
      /^[^\s@]+@aol\.com$/
    ];
    return Regex.some(regex => regex.test(email));
  }

  const navigate = useNavigate()

  const F = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const FF = async () => {

    if (!validarEmail(form.email)) {
      alert('o email precisa ser válido!');
      return;
    }
    if (!form.senha || form.senha.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      alert('as senhas não são iguais!');
      return;
    }
    try {
      await apiLink.post("/registro", form)
      alert("Usuário cadastrado com sucesso!")
      navigate("/Login")
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Erro no cadastro")
      } else {
        alert("Erro ao conectar com o servidor.")
      }
    }
  }

  return (
    <main className={`MainCadastro ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
      <section className='fundo'>
        <div className="fundo-secundario-cadastro">
          <div className="cadastro-fundo">
            <h1>Cadastro</h1>
            <h2>Crie sua Conta! Para melhorar sua experiência</h2>
          </div>
          <div className="conteiner-cadastro">
            <input type="text" name='nome' placeholder="Nome" value={form.nome} onChange={F} />
            <input type="email" name='email' placeholder="Email" value={form.email} onChange={F} />
            <input type="password" name='senha' placeholder="Senha" value={form.senha} onChange={F} />
            <input type="password" name='confirmarSenha' placeholder="Confirmar Senha" value={form.confirmarSenha} onChange={F} />
            <div className='separados'>
              <input type="text" className='separado' name='palavra' placeholder="Palavra de Segurança" value={form.palavra} onChange={F} />
              <input type="date" className='data' name='idade' value={form.idade} onChange={F} />
            </div>
          </div>
        </div>
      </section>
      <section className='conteiner-link-botao-cas'>
        <div className='fundo-botao'>
          <p className='texto'>Pronto! Agora que tem uma conta <br /> faça o <Link className='Link' to={'/Login'}>Login</Link>!</p>
          <button className='botao' onClick={FF}>Cadastrar</button>
        </div>
      </section>
    </main>
  )
}
export default Cas;