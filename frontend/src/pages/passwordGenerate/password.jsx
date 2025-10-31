import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from '../../components/HeaderPages/';
import React, { useState, useEffect } from "react";
import './password.scss';


export default function PasswordGenerator(){
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

    //Gerador de senhas:
        const [password1, setPassword1] = useState("");
        const [passwordLength, setPasswordLength] = useState();
        const [textUp, setTextUp] = useState(true);
        const [textLower, setTextLower] = useState(true);
        const [numbers, setNumbers] = useState(true);
        const [symbols, setSymbols] = useState(true);
        const [senha, setSenha] = useState("");
        const [forca, setForca] = useState("");

            function GerarSenhas(){
                const len = Number(passwordLength) || 0;

                if (!textLower && !textUp && !numbers && !symbols) {
                    alert("Selecione pelo menos uma opção!");
                    return;
                  }
                
                else if(passwordLength < 5){
                    alert("Mínimo de caracteres são 5!");
                    return;
                }
                
                  const lower = "abcdefghijklmnopqrstuvwxyz";
                  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  const nums  = "0123456789";
                  const syms  = "!@#$&()_|";
                
                  let all = "";
                  if (textLower) all += lower;
                  if (textUp)    all += upper;
                  if (numbers)   all += nums;
                  if (symbols)   all += syms;
                
                  let password = "";
                  for (let i = 0; i < passwordLength; i++) {
                    const idx = Math.floor(Math.random() * all.length);
                    password += all[idx];
                  }
                
                  setPassword1(password);
            }
            function evaluatePasswordStrength(password1) {
                let score = 0;
                if (!password1) return "";
            
                if (password1.length > 8) score += 1;
                if (/[a-z]/.test(password1)) score += 1;
                if (/[A-Z]/.test(password1)) score += 1;
                if (/\d/.test(password1)) score += 1;
                if (/[^A-Za-z0-9]/.test(password1)) score += 1;
            
                switch (score) {
                  case 0:
                  case 1:
                  case 2:
                    return "Fraca";
                  case 3:
                    return "Média";
                  case 4:
                  case 5:
                    return "Forte";
                  default:
                    return "";
                }
              }
    return(
        <main className={`mainPassword ${darkTheme ? "dark": "light"}`}>
            <Cabecalho2 darkTheme={darkTheme}  onChangeTheme={ChangeTheme}/>
            <section className="conteiner-gerador">    
                <div className="gerar">
                    <div className="opcoes1">
                        <h1 className="title">Gerador de Senhas!</h1>
                        <div className="op1">
                            <h2>Quantidade de números: </h2>
                            <input 
                                className="tamanho-senha"
                                value={passwordLength}
                                onChange={(e) => setPasswordLength(e.target.value)}
                                type="number" />
                        </div>

                        <div className="op2">
                            <h2>Letras maiusculas?</h2>
                            <input 
                                checked={textUp}
                                onChange={(e) => setTextUp(e.target.checked)}
                                type="checkbox" 
                            />
                        </div>

                        <div className="op3">
                            <h2>Letras minusculas?</h2>
                            <input 
                                checked={textLower}
                                onChange={(e) => setTextLower(e.target.checked)}
                                type="checkbox" />
                        </div>

                        <div className="op4">
                            <h2>Numeros?</h2>
                            <input 
                                checked={numbers}
                                onChange={(e) => setNumbers(e.target.checked)}
                                type="checkbox" />
                        </div>

                        <div className="op5">
                            <h2>Caracteres especiais?</h2>
                            <input 
                                checked={symbols}
                                onChange={(e) => setSymbols(e.target.checked)}
                                type="checkbox" />
                        </div>
                        
                        <button className="botao-gerar" onClick={GerarSenhas}>Gerar Senha:</button>
                    </div>
                    <div className="senha-gerada">
                        <h1 className="senha">Senha:</h1>
                        <h1 className="senha">{password1}</h1>
                    </div>
                </div>
            </section>
            <section className="conteiner-forca">
                <div className="seguranca">
                    <h2 className="resultado">Segurança:</h2>
                    <h2 className="resultado">{forca}</h2>
                </div>
                <div className="verificar-forca">
                    <h2 className="titulo-veri">Verificador de Senhas</h2>
                    <input 
                        type="text"
                        placeholder="Insira a Senha"
                        value={senha}
                        onChange={(e) => {setSenha(e.target.value) }}
                  />
                    <button 
                        className="botao-forca"
                        onClick={() => setForca(evaluatePasswordStrength(senha))}> Verificar senha
                    </button>
                </div>
            </section>
        </main>
    )
}