import "./index.scss";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import Logo from "/images/icons/logod.png";
import Account from "/images/Black/iconContaBlack.png"
import brightness from "/images/Black/brightness.png";
import brightnessWhite from "/images/White/brightnessWhite.png";
import menuWhite from "/images/White/menuWhite.png";
import Perfil from "../../components/perfil/Perfil"; 
import menuBlack from "/images/Black/menuBlack.png";

export default function Cabecalho({ darkTheme, onChangeTheme, AdminVerify }) {
    // Conta:
    const [user, setUser] = useState(localStorage.getItem('User'));
    const [accountLogo, setAccountLogo] = useState(false);
    const accountRef = useRef(null); // Ref para o ícone de perfil

    function MostarInfoConta(){
        if(user === ""){
            alert("Faça Login!")
            return;
        } else{
            setAccountLogo(!accountLogo);
        }
    }

    const [img90Dg, setImg90Dg] = useState(false);
    function MoverImg() {
        if (img90Dg === false) {
            document.getElementById('imgsun').style.transform = 'rotate(220deg)';
            setImg90Dg(true);
        }
        else {
            document.getElementById('imgsun').style.transform = 'rotate(-25deg)';
            setImg90Dg(false)
        }
    }

    const [resolution, setResolution] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setResolution(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={`header-home ${darkTheme ? "dark" : "light"}`}>
            <img src={Logo} className="logo" alt="Logo" />

            {/*Caso for um mobile, aparecerá um menu hamburguer*/}
            {resolution && <section className="opcoes cell">
                <div onClick={() => { onChangeTheme(); MoverImg(); }} className="column1">
                    <img
                        id="imgsun"
                        src={darkTheme ? brightnessWhite : brightness}
                    />
                    <h3>{darkTheme ? "Modo Claro" : "Modo Escuro"}</h3>
                </div>
                <div className="column2">
                    <img src={darkTheme ? menuWhite : menuBlack} />
                </div>
            </section>}

            {/*Caso for um pc, irá funcionar normalmente*/}
            {!resolution && <section className="opcoes">
                <div className="column2">
                    <Link className="link" to='/Support'>Suporte</Link>
                </div>

                <div className="column3">
                    <h3>Atualizações</h3>
                    <h3 className="h32">Serviços</h3>
                </div>

                <div className="column4">
                    <Link className="link" to={"/Login"}>
                        Login
                    </Link>
                    {AdminVerify ? false : ''}

                    {AdminVerify &&
                        <Link className="link" to={'/Admin'}>Admin </Link>}

                    {!AdminVerify &&
                        <h3></h3>
                    }
                </div>

                {/* Ícone de perfil com ref */}
                <img 
                    ref={accountRef}
                    onClick={MostarInfoConta} 
                    className="accountLogo" 
                    src={Account} 
                />
                
                {/* Passa a ref do ícone para o componente Perfil */}
                {accountLogo && (
                    <Perfil 
                        onClose={() => setAccountLogo(false)} 
                        triggerRef={accountRef}
                    />
                )}

                <div onClick={() => { onChangeTheme(); MoverImg(); }} className="column1">
                    <img
                        id="imgsun"
                        src={darkTheme ? brightnessWhite : brightness}
                    />
                    <h3>{darkTheme ? "Modo Claro" : "Modo Escuro"}</h3>
                </div>
            </section>}
        </header>
    );
}