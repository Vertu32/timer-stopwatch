import React, { Component } from 'react';


class AddTimer extends Component {
   constructor (props) {
       super (props);

       this.state =  { 
            copySt: true,
            timerPassive: true,
            secondsTotal: null,
            loader: {},
            visible: {},
            iconClass: 'btnStart play',
            second: '00',
            minute: '00',
            hour: '00',
            secondC: '',
            minuteC: '',
            hourC: '', 
        }
    }

    lineLoaderStr = () => {
        if (this.state.secondsTotal == null) {
            const {second,minute,hour} = this.state;
            let seconds = (+second) + (+minute)*60 + (+hour)*60*60;

            this.setState ({
                loader: {
                    'animation': `move ${seconds}s linear infinite`,
                    'animation-play-state': 'running',
                },
                secondsTotal: seconds,
            })
        } else {
            this.setState ({
                loader: {
                    'animation': `move ${this.state.secondsTotal}s linear infinite`,
                    'animation-play-state': 'running',
                }   
            })  
        }
    }
    lineLoaderPause = () => {
        this.setState ({
            loader: {
                'animation': `move ${this.state.secondsTotal}s linear infinite`,
                'animation-play-state': 'paused',
            }   
        }) 
    }
    lineLoaderStop = () => {
        this.setState ({
            loader: {
                'animation': 'move1 0.3s ease-in-out',
            },
            secondsTotal: null,
        });
    }

    inputValue = (e) => {
        let tt = String.fromCharCode(e.which);
        const {id, value} = e.currentTarget;

        (!(/[0-9]/.test(tt))) && e.preventDefault();
        (value >= 0 && value <=60 && value.length <= 2)? this.setState ({[id]: value, copySt: true}): e.preventDefault();
    }
    inputBlur = () => {
        /* if(e.target.id === this.state.inputSelectID) { 
             return false
         } */
         const {second,minute,hour} = this.state;                                              //Посмотреть возможность короткой записи
         (second.length == 0 ) && this.setState ({second: '00'});
         (minute.length == 0 ) && this.setState ({minute:'00'});
         (hour.length == 0) && this.setState ({hour: '00'});
         (second.length < 2 && second.length != 0 ) && this.setState ({second: '0' + second});
         (minute.length < 2 && minute.length != 0 ) && this.setState ({minute:'0' +  minute});
         (hour.length < 2 && hour.length != 0) && this.setState ({hour: '0' + hour});
    }

    visibleBtn = () => {
        this.setState ({visible: {display: 'inline'}});
    } 
    invisibleBtn = () => {
        this.setState ({visible: {display: 'none'}});
    }

    changeIconPause = () => {
        this.setState({iconClass: 'btnStart pause'});
    }
    changeIconPlay = () => {
        this.setState({iconClass: 'btnStart play'});
    }

    copyState = () => {
        const {second,minute,hour} = this.state;
        (this.state.copySt) && (this.setState ({copySt: false, secondC: second, minuteC: minute, hourC: hour,}))
    }

    clickBtn = () => {
        this.copyState();
        this.invisibleBtn();
        this.changeIconPause();
        this.lineLoaderStr();

        if (this.state.timerPassive) {
            const {second,minute,hour} = this.state;
            let seconds = (+second) + (+minute)*60 + (+hour)*60*60;
            this.setState ({
                timerPassive: false,
            });
            let timer = setInterval (() => {
                if (seconds <= 1) {
                    this.lineLoaderStop();
                    this.changeIconPlay();
                    this.visibleBtn();
                }
                if (seconds <= 0 || this.state.timerPassive) {
                    clearInterval(timer);
                    this.setState ({
                        timerPassive: true,
                    }); 
                } else {
                    seconds--;
                    let secondX = Math.floor ((seconds) % 60),
                        minuteX = Math.floor ((seconds/60) % 60),
                        hourX = Math.floor ((seconds/60/60));

                    (secondX < 10) && (secondX = "0" + secondX);
                    (minuteX < 10) && (minuteX = "0" + minuteX);
                    (hourX < 10) && (hourX = "0" + hourX);
                   
                    this.setState ({
                        second:secondX,
                        minute:minuteX,
                        hour:hourX
                    });
                }
            },1000);
        } else {
            this.visibleBtn();
            this.changeIconPlay();
            this.lineLoaderPause();
            this.setState ({timerPassive: true});
        }
    
    }
    clickBtnStop = () => {
        this.invisibleBtn();
        this.lineLoaderStop();
        const {secondC,minuteC,hourC} = this.state;
        this.setState ({
            second: secondC,
            minute: minuteC,
            hour: hourC,
            copySt: true,
            timerPassive: true
        })
    }
    
    render() { 
        const {second,minute,hour,loader,iconClass,visible} = this.state;

        return (
            <div className = {this.props.timerBtn}>
                <div className = "timer__content">
                    <div className = "timer__display">
                        <input 
                        className = "timer__input"
                        type="text" 
                        id = "hour" 
                        value = {hour} 
                        onChange = {this.inputValue}
                        onBlur = {this.inputBlur}
                        />:
                        <input 
                        className = "timer__input"
                        type="text" 
                        id = "minute" 
                        value = {minute} 
                        onChange = {this.inputValue}
                        onBlur = {this.inputBlur}
                        />:
                        <input 
                        className = "timer__input"
                        type="text"
                        id = "second" 
                        value = {second} 
                        onChange = {this.inputValue}
                        onBlur = {this.inputBlur}
                        />
                    </div>
                    <div className = "preLoader" style = {loader}></div>
                    <div className = "timer__button">
                        <div className ="timer__button-content">
                            <button
                            className = {iconClass}
                            onClick = {this.clickBtn}
                            ></button>
                            <button
                            className = "btnStop"
                            onClick = {this.clickBtnStop}
                            style = {visible}
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default AddTimer;