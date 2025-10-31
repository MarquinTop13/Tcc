import {BrowserRouter, Routes, Route} from "react-router"
import PasswordGenerator from "./pages/passwordGenerate/password"
import VerifyLinks from "./pages/verifylinks/verifylinks"
import Verify from "./pages/verifyarchiver/verify"
import Cas from "./pages/cadastro/cadastro.jsx"
import Support from "./pages/support/support"
import VR from "./pages/infovirus/virusinfo"
import Perfil from "./pages/perfil/Perfil"
import Home from "./pages/home/home.jsx"
import Login from "./pages/login/Login"
import Admin from "./pages/admin/admin"

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/VerifyArchiver" element={<Verify />} />
                <Route path="/VerifyLinks" element={<VerifyLinks />} />
                <Route path="/PasswordGenerator" element={<PasswordGenerator />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Cadastro" element={<Cas />}/>
                <Route path="/Support" element={<Support />}/>
                <Route path="/Perfil" element={<Perfil />}/>
                <Route path="/Viruspage" element={<VR />}/>
            </Routes>
        </BrowserRouter>
    )
}