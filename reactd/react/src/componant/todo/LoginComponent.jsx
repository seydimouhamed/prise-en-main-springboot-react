import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService'

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state= {
            username: 'smb',
            password:  '',
            hasLoginFailed: false,
            showLoginSuccess: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    // handleUsernameChange(event){
    //     // alert(event.target.value);
    //     this.setState(
    //         {
    //             username: event.target.value
    //         }
    //     )
    // }
    handleChange(event){
        // alert(this.state);
        this.setState({ [event.target.name] : event.target.value });
    }
    // handlePasswordChange(event){
    //     // alert(event.target.value);
    //      // alert(event.target.name);
    //     this.setState({ [event.target.name] : event.target.value });
    // }

    loginClicked(){
        // if(this.state.username === 'smb' && this.state.password === 'smb'){
        //     // this.setState({showLoginSuccess:true});
        //     // this.setState({hasLoginFailed: false})
        //     AuthenticationService.registerSuccessfullLogin(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`);
        // }
        // else{
        //     this.setState({showLoginSuccess:false});
        //     this.setState({hasLoginFailed: true})
        // } 

        AuthenticationService
        .executeJwtAuthenticationService(this.state.username, this.state.password)
        .then( (response)=>{
            console.log(response.data.token);
            AuthenticationService.registerSuccessfullLoginForJwt(this.state.username, response.data.token)
            this.props.history.push(`/welcome/${this.state.username}`);
        }).catch( (res)=> {
            console.log(res); 
            this.setState({showLoginSuccess: false});
            this.setState({hasLoginFailed: true});
        })
        // .
        // catch(
        //     this.setState({showLoginSuccess:false});
        //     this.setState({hasLoginFailed: true})
        // );
    }

    render(){
        return (
            <div>
                <h1>Login</h1>
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showLoginSuccess && <div>Login Success</div>}
                {/* <ShowSuccesLogin showLoginSuccess={this.state.showLoginSuccess}/> */}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>,
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button className="btn btn-warning" onClick={this.loginClicked}>Login</button>
            </div>
        )
    }

}

export default LoginComponent;
