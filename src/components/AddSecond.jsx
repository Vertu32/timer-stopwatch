import React, { Component } from 'react';



class AddSecond extends Component {
    state = {
        number: 1,
        time: [],
        iconStopBtn: " pause",
        iconStartBtn: " play",
        saveBtn: false,
        secondActive: false,
        totalStop: true,
        visibleBtnStop: "btnSecStop",
        visibleBtnStart: "btnSecStart",
        second: "00",
        minute: "00",
        hour: "00",
    };
    
    componentDidUpdate = () => {
        if(this.props.secondBtn == "second__main" && !this.state.totalStop) {
            this.clickBtnStop();
            this.stopProg();
            this.invisibleBtn();
            this.iconPlayStart();
            this.clearTime();
            this.setState({totalStop: true});
        }
    };
    clickBtnStr = () => {
        if (!this.state.secondActive && !this.state.saveBtn) {
            this.visibleBtn();
            this.iconSaveStart();
            this.iconPauseStop();
            this.setState({ secondActive: true, totalStop: false });
            const { second, minute, hour } = this.state;
            let seconds = (+second) + (+minute) * 60 + (+hour) * 60 * 60;

            let stopWatch = setInterval(() => {
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
                    clearInterval(stopWatch);
                }
            }, 1000);

        } else {
            this.saveTime();
        }
    };
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
    };
    stopProg = () => this.setState({ secondActive: false, second: "00", minute: "00", hour: "00", });

    visibleBtn = () => this.setState({ visibleBtnStart: "btnSecStart transfStart", visibleBtnStop: "btnSecStop transfStop" });
    invisibleBtn = () => this.setState({ visibleBtnStart: "btnSecStart", visibleBtnStop: "btnSecStop" });

    iconPlayStart = () => this.setState({ iconStartBtn: " play" });
    iconSaveStart = () => this.setState({ iconStartBtn: " circle-down" });
    iconPauseStart = () => this.setState({ iconStartBtn: " pause" });
    iconPauseStop = () => this.setState({ iconStopBtn: " pause" });
    iconStopStop = () => this.setState({ iconStopBtn: " stop" });

    saveTime = () => {
        const { second, minute, hour, number, time } = this.state;
        let a = [{
            second,
            minute,
            hour,
            number
        }, ...time];
        (a.length == 11) && a.pop();
        this.setState({
            time: a,
            number: number + 1
        });
    };
    clearTime = () => this.setState({ time: [], number: 1 });

    render() {
        const { second, minute, hour, time, visibleBtnStart, iconStartBtn, iconStart, visibleBtnStop, iconStopBtn } = this.state;
        return (
            <div className="stopWatch">
                <div className={this.props.secondBtn} >
                    <div
                        className="second__content"
                        style={(this.props.animation) ? { animation: "opacityClock 0.5s ease-in-out" } : {}}
                    >
                        <div className="second__display">
                            <p className="second__time">{hour}:{minute}:{second}</p>
                        </div>
                        <div className="timer__button">
                            <div className="second__button-content">
                                <button
                                    className={visibleBtnStart + iconStartBtn}
                                    onClick={this.clickBtnStr}
                                    style={iconStart}
                                ></button>
                                <button
                                    className={visibleBtnStop + iconStopBtn}
                                    onClick={this.clickBtnStop}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
                {time.map((item) =>
                    <div key={item.number} className="saveTime__container">
                        <div className="saveTime__line">
                            <div className="saveTime__number">{item.number}</div>
                        </div>
                        <div className="saveTime__time">{item.hour}:{item.minute}:{item.second}</div>
                    </div>
                )}
            </div>
        )
    }
}

export default AddSecond;