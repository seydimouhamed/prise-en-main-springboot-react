import { Component } from "react";
import PropTypes from 'prop-types';
import './Counter.css';


export class Counter extends Component{

    render()
    {
      //  const style = { fontSize: "50px", padding: "15px 30px"};
      // style={style}
        return (
            <div className="counter">
            <CounterButton by={1}/>
            <CounterButton by={5}/>
            <CounterButton by={10}/>
            </div>
        );
    }
}
class CounterButton extends Component{
   
    constructor(){
       super();
       this.state= {
           counter : 0
       }

       this.incremente = this.incremente.bind(this)
    }
    render()
    {
      //  const style = { fontSize: "50px", padding: "15px 30px"};
      // style={style}
        return (
        <div className="counterButton">
            <button onClick={this.incremente}>+{this.props.by}</button>
            <span class="count">{this.state.counter} </span>
        </div>
        )
    }

    incremente() {
        // this.state.counter ++; 
        this.setState({
            counter: this.state.counter + this.props.by
        }); 
        // console.log('ça marche');
    } 
}

CounterButton.defaultProps = {
  by: 1
}
CounterButton.propTypes = {
  by:  PropTypes.number
}

// export default Counter;