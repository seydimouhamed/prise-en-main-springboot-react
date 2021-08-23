import axios from "axios";
import { API_URL } from "../../Constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser"

class AuthenticationService{

    exexuteBaiscAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicaut`, {headers: { authorization : this.createBasicAuthToken(username, password)}});
    }
    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`,
            {
                'username':username, 'password':password
            });
    }

    createBasicAuthToken(username, password){
        return 'Basic '+ window.btoa(username + ":" + password);
    }

    createJWTToken(token){
        return 'Bearer '+ token;  
    }
    registerSuccessfullLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    registerSuccessfullLogin(username,password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        // sessionStorage.setItem('authenticationPassword', password);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));  
    }
    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        //sessionStorage.removeItem('authenticationPassword');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        console.log(user);
        if(user === null ) return false;

        return true;
    }
    getCurrentUser(){
        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    setupAxiosInterceptors(token){
        //console.log('dans linterceptor');
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token
                } 
                return config;
            }
        )
    }
}

export default new AuthenticationService();
