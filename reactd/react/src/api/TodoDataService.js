import axios from "axios";
import { API_URL, JPA_API_URL } from "../Constants";

class TodoDataService{
    retrieveAllTodos(user){
        return axios.get(`${JPA_API_URL}/users/${user}/todos`
        );
    }
    retrieveTodo(user,id){
        return axios.get(`${API_URL}/users/${user}/todos/${id}`);
    }
    deleteTodo(user, id){
        return axios.delete(`${API_URL}/users/${user}/todos/${id}`);
    }

    updateTodo(user,id, todo){
        return axios.put(`${API_URL}/users/${user}/todos/${id}`, todo);
    }
    saveTodo(user, todo){
        return axios.post(`${API_URL}/users/${user}/todos`, todo);
    }
}

export default new TodoDataService();