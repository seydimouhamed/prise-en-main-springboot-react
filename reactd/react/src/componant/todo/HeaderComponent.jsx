import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthenticationService from './AuthenticationService'


class HeaderComponent extends Component{
   
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    render(){ 
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
        <header>
            <nav className="navbar">
            <ul className="nav">
                <li className="nav-item">
                    <a className="navbar-brand" >À FAIRE</a>
                </li>
               {isUserLoggedIn && <li className="nav-item">
                    <Link className="nav-link active" to="/welcome/Todos">Home</Link>
                </li>}
               {isUserLoggedIn && <li className="nav-item">
                    <Link className="nav-link" to="/list">Todos</Link>
                </li>}
            </ul>
            <ul className="nav">
                {!isUserLoggedIn &&<li className="nav-item">
                    <Link className="nav-link active" to="/login">Login</Link>
                </li>}
                {isUserLoggedIn && <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>Logout</Link>
                </li>}
            </ul>
            </nav>
        </header>)
    }

    logout(){
        AuthenticationService.logout();
        // this.props.history.push("/login");
    }
}

export default withRouter(HeaderComponent);