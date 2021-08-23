import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/HelloWorldService';

class WelcomeComponent extends Component{

    constructor(props){
        super(props)

        this.retrieveWelcomeMessage= this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessulResponse = this.handleSuccessulResponse.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
        this.state = {
            welcomeMessage : ''
        }
    }
  
    render(){
        return (
        <>

            <h1>Welcome!</h1> 
            <div className="container">
                <div>
                    {this.state.welcomeMessage} &nbsp;
                    {/* {this.props.match.params.name}  */}
                    <Link to="/list"> Voir les todos</Link>
                </div>
                <div>
                    Cliquez ici pour personaliser le message de bienvenue!
                   <button onClick={this.retrieveWelcomeMessage} className="btn btn-success" > Get welcome message</button>
                    
                </div>
            </div>
                
        </>)
    }

    retrieveWelcomeMessage(){
        const name= this.props.match.params.name;
        HelloWorldService.executeHelloWorldPathVariableNameService(name).
        then( response => {
            this.handleSuccessulResponse(response);
        }).catch( err => this.handleErrorResponse(err));
        
    }

    handleSuccessulResponse(response){
        this.setState({welcomeMessage: response['data']['message']})
    }
    handleErrorResponse(err){
        console.log(err.response);
       // this.setState({welcomeMessage: err.response.data.message})
    }
}

export default WelcomeComponent;