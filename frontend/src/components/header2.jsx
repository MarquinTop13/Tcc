import "./header.scss"
import { Link } from 'react-router';
import React,{ useEffect, useState } from 'react';
import BackgroundBlack from "/images/BackgroundBlack.png"
import BackgroundWhite from "/images/BackgroundWhite.png"

export default function Cabecalho2() {
    const[darkTheme, SetDarktheme] = useState(false)

    function changeTheme(){
        if(darkTheme === false){
            SetDarktheme(true)
        }
        else{
            SetDarktheme(false)
        }
    }

    useEffect(() => {
        if(darkTheme){
            document.body.style.backgroundImage = `url(${BackgroundBlack})`
            document.body.style.color = "white"
        }

        else{
            document.body.style.backgroundImage = `url(${BackgroundWhite})`
            document.body.style.color = "black"
        }
    })

    return (
        <header>
            <img src="" alt="" />

            <section className="opcoes">
                <div className="column1">
                    <img src="../../../public/images/arrows.png" />
                    <h3 onClick={changeTheme}>Modo Escuro</h3>
                </div>

                <div className="column2">
                    <h3><Link className='link' to={'/'}>Voltar</Link></h3>
                </div>


            </section>
        </header>
    )
}