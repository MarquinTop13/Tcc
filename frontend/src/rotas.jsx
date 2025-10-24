import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./pages/home/home"
import Cas from "./pages/cadastro/cadastro"
import Verify from "./pages/verifyarchiver/verify"
import VerifyLinks from "./pages/verifylinks/verifylinks"
import Login from "./pages/login/Login.jsx"
import Err from "./components/err/erro/index.jsx"

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/VerifyArchiver" element={<Verify />} />
                <Route path="/VerifyLinks" element={<VerifyLinks />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Cadastro" element={<Cas />}/>
                <Route path="/Err" element={<Err />}/>
            </Routes>
        </BrowserRouter>
    )
}