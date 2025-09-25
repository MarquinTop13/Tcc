import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./pages/home/home"
import Verify from "./pages/verifyarchiver/verify"
import VerifyLinks from "./pages/verifylinks/verifylinks"


export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/VerifyArchiver" element={<Verify />} />
                <Route path="/VerifyLinks" element={<VerifyLinks />} />
            </Routes>
        </BrowserRouter>
    )
}