// import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import React from 'react';
// import { FirstComponent } from './componant/learning-exemples/FirstComponent';
//import SecondComponent from './componant/learning-exemples/SecondCompenent';
import {TodoApp} from './componant/todo/TodoApp';
// import { Counter } from './componant/counter/Counter';
 
// function App() {
//   return (
//     <div className="App">
//       hello world
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }


 class App extends React.Component
 {
    render() {
      return (
        <div className="App">
          {/* <Counter/> */}
          <TodoApp/>
        </div>)
    }
 }

//  class learningComponents extends Component {
//    render(){
//      return (
//        <div>
//           <h1>Liste de clients</h1>
//           <FirstComponent></FirstComponent>
//           <SecondComponent></SecondComponent>
//        </div>
//      );
//    }
//  }



export default App;
