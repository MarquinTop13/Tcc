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

            function GerarSenhas(){
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
                  const syms  = "!@#$%^&*()_+";
                
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
  
  

    return(
        <main className={`mainPassword ${darkTheme ? "dark": "light"}`}>
            <Cabecalho2 darkTheme={darkTheme}  onChangeTheme={ChangeTheme}/>
            <h1 className="title">Gerador de Senhas!</h1>
            <button onClick={GerarSenhas}>Gerar Senha:</button>
            <div className="opcoes1">
                <div className="op1">
                    <h2>Quantidade de números: </h2>
                    <input 
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
                
            </div>

            <h1>{password1}</h1>
        </main>
    )
}