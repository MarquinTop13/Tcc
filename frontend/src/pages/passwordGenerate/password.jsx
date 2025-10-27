import React, { useState, useEffect } from "react";
import Cabecalho2 from '../../components/HeaderPages/';
import './password.scss';


export default function PasswordGenerator(){
    return(
        <main>
            <Cabecalho2 />
            <h1>Gerador de Senhas!</h1>
        </main>
    )
}