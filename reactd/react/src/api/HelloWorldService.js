import axios from "axios"

class HelloWorldService{

    
    executeHelloWorldService(){
        return axios.get('http://localhost:8081/hello_world');
    }
    executeHelloWorldBeanService(){
        return axios.get('http://localhost:8081/hello-world-bean');
    }
    executeHelloWorldPathVariableNameService(name){
        let username= 'smbasse';
        let password = 'password';
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' +password);
    
        return axios.get(`http://localhost:8081/hello-world/path-variable/${name}`,
        {
            headers: {
                authorization: basicAuthHeader
            }
        }
        );
    }

}

export default new HelloWorldService()