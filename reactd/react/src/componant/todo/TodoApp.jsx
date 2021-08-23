import React, { Component } from "react"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
// import AuthenticationService from './AuthenticationService.js'
import LoginComponent from './LoginComponent'
import ListTodosComponent from './ListTodosComponent'
import HeaderComponent from './HeaderComponent'
import ErrorComponent from './ErrorComponent'
import FooterComponent from './FooterComponent'
import WelcomeComponent from './WelcomeComponent'
import LogoutComponent from './LogoutComponent';
import TodoComponent from "./TodoComponent.jsx"

export class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/> 
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>  
                            <AuthenticatedRoute path="/list" exact component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/list/:id"  component={TodoComponent}/>
                            <Route  component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/* <LoginComponent/> */}
            </div>
        )
    }

}





// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }
// function ShowSuccesLogin(props){
//     if(props.showLoginSuccess){
//         return <div>Login success</div>
//     }
//     return null
// }