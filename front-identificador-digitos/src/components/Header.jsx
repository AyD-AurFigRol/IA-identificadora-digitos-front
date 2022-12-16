import { Link } from "react-router-dom";
import "./css/Header.css"

export default function Header() {
    return (
        <>
            <header className="App-header">
                <div className="Header-izq">
                    <Link to={`/`}><div className="Header-logo"> Skynet </div></Link>
                </div>
                <div className="Header-der">                    
                    <div className="Header-text"><Link to={`/us`}>About us</Link></div>
                    <div className="Header-text"> <Link to={`/login`}>Sign in</Link></div>
                    <div className="Header-btn"> <Link to={`/register`}> Sign up</Link></div>
                </div>
            </header>
        </>
    );
}