import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, {Component} from 'react';
import TodoDataService from '../../api/TodoDataService';
import AuthenticationService from './AuthenticationService';

class TodoComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            todo:  {
                id: this.props.match.params.id,
                description: '',
                targetDate: moment(new Date()).format('YYYY-MM-DD')
            }
        }
        this.onSubmit= this.onSubmit.bind(this);
    }

    componentDidMount(){
        const idTodo = this.props.match.params.id;
        if(parseFloat(this.state.todo.id) === -1){
            console.log('sfdgf');
            return;
        }
        console.log('arrivé' + idTodo);
        const user = AuthenticationService.getCurrentUser();
        
        TodoDataService.retrieveTodo(user, idTodo).
        then( response =>{
            console.log(response.data);
            this.setState({
                todo: response.data
            })
        })
    }

    onSubmit(values){
        //console.log(values);
        let username= AuthenticationService.getCurrentUser();
        // console.log(this.props.match.params.id)
        if(parseFloat(this.state.todo.id) === -1){
            console.log(this.props.match.params.id)
            TodoDataService.saveTodo(username, {
                id: this.state.todo.id,
                description: values.description,
                targetDate: values.targetDate
            })
            .then(()=>{
                this.props.history.push('/list');
            })

        }else{

            TodoDataService.updateTodo(username, this.state.todo.id, {
                id: this.state.todo.id,
                description: values.description,
                targetDate: values.targetDate
            })
            .then(()=>{
                this.props.history.push('/list');
            })
        }
    }

    validate(values){
        let errors = {};
         if(!values.description){
             errors.description = 'Enter une description'
         }else if(values.description.length < 5){
            errors.description = "Doit avoir au moins 5 caractères"
         }

         if(!moment(values.targetDate).isValid){
             errors.targetDate='Entrer une date valide';
         }
        return errors;

    }
    render(){
        let {description, targetDate} = this.state.todo; 
        return (

        <div> 
            <h1>TODO</h1>
            <div className="container">
                <Formik
                    initialValues = {{description,targetDate:moment(targetDate).format('YYYY-MM-DD')}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    // validateOnChange={false}
                    enableReinitialize = {true}
                >
                    {
                        (props) => (
                            <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"/>
                            </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date </label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            todo component {this.props.match.params.id}          
        </div>)
    }
}

export default TodoComponent;