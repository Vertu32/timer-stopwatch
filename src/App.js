import React, { Component } from 'react';
import AddTimer from './components/AddTimer';
import AddSecond from "./components/AddSecond";
import Wheather from "./components/Wheather"
import { directive } from '@babel/types';


class App extends Component {
  
  constructor (props) {
    super (props);
    this.state = {
      animat: false,
      secondClass: "second__main",
      timerClass: "timer__main show",
      btnShadowS: "btn-menu",
      btnShadowT: "btn-menu timOn",
      globalColorClass: "global",
      repeat: false,
    }
  }

  secondOn = () => {
    if(!this.state.animat && !this.state.repeat ) {
      this.setState ({
        btnShadowS: "btn-menu secOn",
        btnShadowT: "btn-menu",
        globalColorClass: "global secColor",
        repeat: true,
      });
      this.animationClock();
      setTimeout(() => {
        this.setState ({
          secondClass: "second__main show",
          timerClass: "timer__main",
        });
      },100);
    } 
  }
  timerOn = () => {
    if(!this.state.animat && this.state.repeat ) {
      this.setState ({
        btnShadowS: "btn-menu",
        btnShadowT: "btn-menu timOn",
        globalColorClass: "global",
        repeat: false,
      });
      this.animationClock();
      setTimeout(() => {
        this.setState ({
          secondClass: "second__main",
          timerClass: "timer__main show",
        });
      },100);
    }
  }
  animationClock = () => {
    this.setState({ animat: true });
    setTimeout(() => {
        this.setState({ animat: false })
    }, 500);
};
  saveTime = (a) => {

  }

  render() { 
    return ( 
      <div className = {this.state.globalColorClass}>
        <div className = "global__container">
          <div className = "global__btn">
            <button className = {this.state.btnShadowS} onClick = {this.secondOn}>Stopwatch</button>
            <button className = {this.state.btnShadowT} onClick = {this.timerOn}>Timer</button>
          </div>
          <div className = "main__content">
            <div className = "global__content">
              <AddTimer timerBtn = {this.state.timerClass} animation = {this.state.animat}/>
              <AddSecond secondBtn = {this.state.secondClass} animation = {this.state.animat} />
            </div>
            <Wheather />
          </div>
        </div>
      </div>
     );
  }
}
 
export default App;

