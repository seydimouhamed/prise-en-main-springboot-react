import moment from 'moment';
import React, {Component} from 'react';
import TodoDataService from '../../api/TodoDataService';
import AuthenticationService from './AuthenticationService';


class ListTodosComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [
                // {id: 1, description: "description 1", done: false, targetDate: new Date()},
                // {id: 2, description: "description 2", done: false, targetDate: new Date()},
                // {id: 3, description: "description 3", done: false, targetDate: new Date()},
                // {id: 4, description: "description 4", done: false, targetDate: new Date()},
                // {id: 5, description: "description 5", done: false, targetDate: new Date()},
                // {id: 6, description: "description 6", done: false, targetDate: new Date()},
            ],
            dataState: false,
            message: ''
        }

        this.handleSuccessulResponse = this.handleSuccessulResponse.bind(this);
       this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
       this.updateTodoClicked = this.updateTodoClicked.bind(this);
       this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    componentWillUnmount(){}

     componentDidMount(){
        this.refreshTodo();
     }

     refreshTodo(){
        
        const user = AuthenticationService.getCurrentUser();
        TodoDataService.retrieveAllTodos(user).
        then( response => 
            {
                console.log(response);
                this.handleSuccessulResponse(response);
            }
            ).
        catch(err => console.log(err));
     }


    handleSuccessulResponse(response){
        this.setState({todos: response['data']})
        this.setState({dataState:true})
    }
    deleteTodoClicked(id){
       // alert('ds')
        const user = AuthenticationService.getCurrentUser();
        console.log(id)
        // return;
        TodoDataService.deleteTodo(user, +id).
        then( response => 
            {
                
                setTimeout(this.handleDeleteItem(id), 5000)

            }
            ).
        catch(err => console.log(err));
    }

    updateTodoClicked(id){
        this.props.history.push(`/list/${id}`);
    }

    handleDeleteItem(id){
        this.setState({
            todos: this.state.todos.filter( todo => todo.id != id),
            message : `Suppression du todo ${id} fait`}
        )
    }
    render(){
        return (
        <div>
            {/* Welcome {this.props.match.params.name}*/}
            <h1>List Tdos</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
                {this.state.dataState && <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Date</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.todos.map( todo=>
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('DD MM YYYY')}</td>
                                    <td><button className="btn btn-success" onClick={()=> this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={()=> this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                </tr>
                        )}
                    </tbody>
                </table>}
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>ADD</button>
                </div>
                {!(this.state.dataState) && <div>Loading ...</div>
                }
            </div>
        </div>)
    }

    addTodoClicked(){
        this.props.history.push('/list/-1');
    }
}

export default ListTodosComponent;