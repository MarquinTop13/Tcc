import PasswordGenerator from "./pages/passwordGenerate/password"
import {BrowserRouter, Routes, Route} from "react-router"
import VerifyLinks from "./pages/verifylinks/verifylinks"
import UserSupport from "./pages/UserSupport/userSupport"
import Pagamento from "./pages/pagamento/pagamento"
import Verify from "./pages/verifyarchiver/verify"
import Perfil from "./components/perfil/Perfil"
import Support from "./pages/support/support"
import VR from "./pages/infovirus/virusinfo"
import Updates from "./pages/updates/update"
import Cas from "./pages/cadastro/cadastro"
import Home from "./pages/home/home.jsx"
import Admin from "./pages/admin/admin"
import Login from "./pages/login/Login"

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
                <Route path="/Pagamento" element={<Pagamento />} />
                <Route path="/UserSupport" element={<UserSupport />} />
                <Route path="/Updates" element={<Updates />} />
            </Routes>
        </BrowserRouter>
    )
}