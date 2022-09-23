import { Link } from "react-router-dom";

export default function LandingPage(){
    return <div>
        <h1>Holi, soy la LandingPage</h1>
        <Link to="/home"><h2>Entrar</h2></Link>
    </div>
}