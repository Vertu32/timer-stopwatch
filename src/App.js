import React, { Component } from 'react';
import AddTimer from './components/AddTimer';
import AddSecond from "./components/AddSecond";
import { directive } from '@babel/types';


class App extends Component {
  
  constructor (props) {
    super (props);
    this.state = {
      secondClass:'second hide',
      timerClass: 'timer show',
      btnShadowS: 'btn-menu secOff',
      btnShadowT: 'btn-menu timOn shadow',
      globalColorClass: "global timColor",
    }
  }

  secondOn = () => {
    this.setState ({
      secondClass: "second show",
      timerClass: "timer hide",
      btnShadowS: "btn-menu secOn shadow",
      btnShadowT: "btn-menu timOff",
      globalColorClass: "global secColor",
    })
  }
  timerOn = () => {
    this.setState ({
      secondClass: "second hide",
      timerClass: "timer show",
      btnShadowS: "btn-menu secOff",
      btnShadowT: "btn-menu timOn shadow",
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
          <AddTimer timerBtn = {this.state.timerClass} />
          <AddSecond secondBtn = {this.state.secondClass}/>
        </div>
      </div>
     );
  }
}
 
export default App;

