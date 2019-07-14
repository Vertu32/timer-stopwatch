import React, { Component } from 'react';
import AddTimer from './components/AddTimer';
import AddSecond from "./components/AddSecond";
import Wheather from "./components/Wheather"
import { directive } from '@babel/types';


class App extends Component {
  
  constructor (props) {
    super (props);
    this.state = {
      secondClass:'second',
      timerClass: 'timer show',
      btnShadowS: 'btn-menu btn-sec',
      btnShadowT: 'btn-menu btn-tim timOn',
      globalColorClass: "global timColor",
    }
  }

  secondOn = () => {
    this.setState ({
      secondClass: "second show",
      timerClass: "timer",
      btnShadowS: "btn-menu btn-sec secOn",
      btnShadowT: "btn-menu btn-tim",
      globalColorClass: "global secColor",
    })
  }
  timerOn = () => {
    this.setState ({
      secondClass: "second",
      timerClass: "timer show",
      btnShadowS: 'btn-menu btn-sec',
      btnShadowT: 'btn-menu btn-tim timOn',
      globalColorClass: "global timColor",
    })
  }

  render() { 
    return ( 
      <div className = {this.state.globalColorClass}>
        <div className = "global__container">
          <div className = "global__btn">
            <button className = {this.state.btnShadowS} onClick = {this.secondOn}>Секундомер </button>
            <button className = {this.state.btnShadowT} onClick = {this.timerOn}>Таймер </button>
          </div>
          <div className = "main__content">
            <Wheather />
            <div className = "clock__container">
              <AddTimer timerBtn = {this.state.timerClass} />
              <AddSecond secondBtn = {this.state.secondClass}/>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
export default App;

