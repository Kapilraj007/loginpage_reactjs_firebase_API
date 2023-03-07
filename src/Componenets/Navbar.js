import { Link } from "react-router-dom"
import { isAuthenticated } from "../services/Auth"


export default function Navbar(props){
    return(
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">TSK code</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbar" aria-controls="navbar"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto"  >
           {!isAuthenticated()?<li className="nav-item"><Link to="/register"className="nav-link" >Register</Link></li>:null}
           {!isAuthenticated()?<li><Link to="/login" className="nav-link"  >Login</Link></li>:null}
           {isAuthenticated()?<li className="nav-item"><Link to="/dashboard" className="nav-link" >Dashboard</Link></li>:null}
           {isAuthenticated()?<li><a className="nav-link" style={{cursor:"pointer"}} onClick={props.logoutUser} >Logout</a></li>:null}
        </ul>
    
        </div>
    </nav>
    )
}