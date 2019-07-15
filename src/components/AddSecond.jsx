import React, { Component } from 'react';



class AddSecond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            time: [],
            iconStopBtn: ' pause',
            iconStartBtn: ' play',
            saveBtn: false,
            secondActive: false,
            visibleBtnStop: "btnSecStop",
            visibleBtnStart: "btnSecStart",
            second: '00',
            minute: '00',
            hour: '00',
        }
    }
    clickBtnStr = () => {
        if (!this.state.secondActive && !this.state.saveBtn) {
            this.visibleBtn();
            this.iconSaveStart();
            this.iconPauseStop();
            this.setState({ secondActive: true });
            const { second, minute, hour } = this.state;
            let seconds = (+second) + (+minute) * 60 + (+hour) * 60 * 60;

            let scnd = setInterval(() => {
                if (this.state.secondActive) {
                    seconds++;
                    let second = Math.floor((seconds) % 60),
                        minute = Math.floor((seconds / 60) % 60),
                        hour = Math.floor((seconds / 60 / 60));

                    (second < 10) && (second = "0" + second);
                    (minute < 10) && (minute = "0" + minute);
                    (hour < 10) && (hour = "0" + hour);

                    this.setState({
                        second,
                        minute,
                        hour,
                    })
                } else {
                    clearInterval(scnd);
                }
            }, 1000);

        } else {
            this.saveTime();
        }
    }
    clickBtnStop = () => {
        if (!this.state.secondActive && !this.state.secondActive) {
            this.stopProg();
            this.invisibleBtn();
            this.iconPlayStart();
            this.clearTime();
        } else {
            this.setState({ secondActive: false, saveBtn: false });
            this.iconPauseStart();
            this.iconStopStop();
        }
    }
    stopProg = () => this.setState({ secondActive: false, second: '00', minute: '00', hour: '00', });

    visibleBtn = () => this.setState({ visibleBtnStart: "btnSecStart transfStart", visibleBtnStop: "btnSecStop transfStop" });
    invisibleBtn = () => this.setState({ visibleBtnStart: "btnSecStart", visibleBtnStop: "btnSecStop" });

    iconPlayStart = () => this.setState({ iconStartBtn: ' play' });
    iconSaveStart = () => this.setState({ iconStartBtn: ' circle-down' });
    iconPauseStart = () => this.setState({ iconStartBtn: ' pause' });
    iconPauseStop = () => this.setState({ iconStopBtn: ' pause' });
    iconStopStop = () => this.setState({ iconStopBtn: ' stop' });


    saveTime = () => {
        const { second, minute, hour, number } = this.state;
        const a = [
            <div key={number} className="saveTimer__container">
                <div className="saveTimer__line">
                    <div className="saveTimer__number">{number}</div>
                </div>
                <div className="saveTimer__time">{hour}:{minute}:{second}</div>
            </div>, ...this.state.time
        ]
        this.setState({ time: a, number: number + 1 });
    }
    clearTime = () => this.setState({ time: [], number: 1 });

    render() {
        const { second, minute, hour } = this.state;

        return (
            <div className={this.props.secondBtn} >
                <div
                    className="second__content"
                    style={(this.props.animation) ? { animation: 'opacity1 0.5s ease-in-out' } : {}}
                >
                    <div className="second__display">
                        <p className="second__time">{hour}:{minute}:{second}</p>
                    </div>
                    <div className="timer__button">
                        <div className="second__button-content">
                            <button
                                className={this.state.visibleBtnStart + this.state.iconStartBtn}
                                onClick={this.clickBtnStr}
                                style={this.state.iconStart}
                            ></button>
                            <button
                                className={this.state.visibleBtnStop + this.state.iconStopBtn}
                                onClick={this.clickBtnStop}
                            ></button>
                        </div>
                    </div>
                    {this.state.time}
                </div>
            </div>
        )
    }
}

export default AddSecond;