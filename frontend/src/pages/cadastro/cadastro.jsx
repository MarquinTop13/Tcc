import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import './cadastro.scss'

function Cas() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    palavra: "",
    confirmarSenha: ""
  })

  function validarEmail(email){
    const validar = /^[^\s@]+@gmail+\.com$/ || /^[^\s@]+@outlook+\.com$/;
    return validar.test(email);
  }

  const navigate = useNavigate()

  const F = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const FF = async () => {

    if(!validarEmail(form.email)){
      alert('o email precisa ser válido!');
      return;
    }
    if (!form.senha || form.senha.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if(form.senha !== form.confirmarSenha){
      alert('as senhas não são iguais!');
      return;
    }
    try {
      await axios.post("http://localhost:5010/registro", form)
      alert("Usuário cadastrado com sucesso!")
      navigate("/")
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Erro no cadastro")
      } else {
        alert("Erro ao conectar com o servidor.")
      }
    }
  }

  return (
    <>
    <main>
      <header className='cabecalho-cadastro'>
        <div className='div-logo-cas'>
          <img src="" height="" />
        </div>
        <nav className='nav-login-cas'>
          <button>Modo escuro</button>
          <Link>Suporte</Link>
          <Link>Atualizações <br />e Serviços</Link>
          <Link>Login</Link>
        </nav>
      </header>
      <section className='fundo'>
        <div className="fundo-secundario-cadastro">
          <div className="cadastro-fundo">
            <h1>Cadastro</h1>
            <h2>Crie sua Conta! Para melhorar sua experiência</h2>
          </div>
          <div className="conteiner-cadastro">
            <input type="text" name='nome' placeholder="Nome" value={form.nome} onChange={F}/>
            <input type="email" name='email' placeholder="Email" value={form.email} onChange={F}/>
            <input type="password" name='senha' placeholder="Senha" value={form.senha} onChange={F}/>
            <input type="password" name='confirmarSenha' placeholder="Confirmar Senha" value={form.confirmarSenha} onChange={F}/>
            <input type="text" name='palavra' placeholder="Palavra de Segurança" value={form.palavra} onChange={F}/>
          </div>
        </div>
      </section>
      <section className='conteiner-link-botao-cas'>
            <div className='fundo-botao'>
              <p className='texto'>Pronto! Agora que tem uma conta <br/> faça o login!</p>
              <button className='botao' onClick={FF}>Cadastrar</button>
            </div>
      </section>
    </main>
    </>
  )
}
export default Cas;