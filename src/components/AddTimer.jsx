import React, { Component } from 'react';


class AddTimer extends Component {
    state = {
        iconStartBtn: " play",
        visibleBtnStop: "btnSecStop",
        visibleBtnStart: "btnSecStart",
        disabledBtn: "",
        copySt: true,
        timerPassive: true,
        secondsTotal: null,
        loader: {},
        second: "00",
        minute: "00",
        hour: "00",
        secondC: "",
        minuteC: "",
        hourC: "",
    }

    componentDidUpdate = () => {
        (this.props.timerBtn == "timer__main" && !this.state.timerPassive) && this.clickBtnStop();
    }
    inputValue = (e) => {
        let b = String.fromCharCode(e.which);
        const { id, value } = e.currentTarget;

        (!(/[0-9]/.test(b))) && e.preventDefault();
        (value >= 0 && value <= 60 && value.length <= 2) ? this.setState({ [id]: value, copySt: true }) : e.preventDefault();
        this.lineLoaderStop();
    }
    inputBlur = () => {
        const { second, minute, hour } = this.state;
        (second.length == 0) && this.setState({ second: "00" });
        (minute.length == 0) && this.setState({ minute: "00" });
        (hour.length == 0) && this.setState({ hour: "00" });
        (second.length < 2 && second.length != 0) && this.setState({ second: "0" + second });
        (minute.length < 2 && minute.length != 0) && this.setState({ minute: "0" + minute });
        (hour.length < 2 && hour.length != 0) && this.setState({ hour: "0" + hour });
    }
    copyState = () => {
        const { second, minute, hour } = this.state;
        (this.state.copySt) && (this.setState({ copySt: false, secondC: second, minuteC: minute, hourC: hour, }))
    }

    clickBtn = () => {
        const { second, minute, hour } = this.state;
        let seconds = (+second) + (+minute) * 60 + (+hour) * 60 * 60;

        if (seconds != 0) {
            this.copyState();
            this.lineLoaderStr();

            if (this.state.timerPassive) {
                this.iconPauseStart();
                this.invisibleBtn()
                this.setState({ timerPassive: false, });

                let timer = setInterval(() => {
                    if (seconds == 1) {
                        this.lineLoaderStop();
                        this.iconPlayStart();
                    }
                    (seconds <= 0) && this.visibleBtn();
                    if (seconds <= 0 || this.state.timerPassive) {
                        clearInterval(timer);
                        this.setState({ timerPassive: true, });
                    } else {
                        seconds--;
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
                        });
                    }
                }, 1000);
            } else {
                this.visibleBtn();
                this.iconPlayStart();
                this.lineLoaderPause();
                this.setState({ timerPassive: true });
            }
        }
        return false;
    }
    clickBtnStop = () => {
        const { secondC, minuteC, hourC } = this.state;
        this.setState({
            second: secondC,
            minute: minuteC,
            hour: hourC,
            copySt: true,
            timerPassive: true
        })
        this.iconPlayStart();
        this.lineLoaderStop();
        this.invisibleBtn();
    }
    visibleBtn = () => this.setState({ visibleBtnStart: "btnSecStart transfStart", visibleBtnStop: "btnSecStop transfStop" });
    invisibleBtn = () => this.setState({ visibleBtnStart: "btnSecStart", visibleBtnStop: "btnSecStop" });

    iconPlayStart = () => this.setState({ iconStartBtn: " play" });
    iconPauseStart = () => this.setState({ iconStartBtn: " pause" });

    lineLoaderStr = () => {
        if (this.state.secondsTotal == null) {
            const { second, minute, hour } = this.state;
            let seconds = (+second) + (+minute) * 60 + (+hour) * 60 * 60;

            this.setState({
                loader: {
                    animation: `moveLoader ${seconds}s linear infinite`,
                    animationPlayState: "running",
                },
                secondsTotal: seconds,
            })
        } else {
            this.setState({
                loader: {
                    animation: `moveLoader ${this.state.secondsTotal}s linear infinite`,
                    animationPlayState: "running",
                }
            })
        }
    }
    lineLoaderPause = () => {
        this.setState({
            loader: {
                animation: `moveLoader ${this.state.secondsTotal}s linear infinite`,
                animationPlayState: "paused",
            }
        })
    }
    lineLoaderStop = () => {
        this.setState({
            loader: {
                animation: "moveLoader1 0.3s ease-in-out",
            },
            secondsTotal: null,
        });
    }

    render() {
        const { second, minute, hour, loader, visibleBtnStart, iconStartBtn, visibleBtnStop, timerPassive } = this.state;
        return (
            <div className="timer">
                <div className={this.props.timerBtn}>
                    <div
                        className="timer__content"
                        style={(this.props.animation) ? { animation: 'opacityClock 0.5s ease-in-out' } : {}}
                    >
                        <div className="timer__display">
                            <input
                                className="timer__input"
                                type="text"
                                id="hour"
                                value={hour}
                                onChange={this.inputValue}
                                onBlur={this.inputBlur}
                                disabled={!timerPassive}
                            />:
                            <input
                                className="timer__input"
                                type="text"
                                id="minute"
                                value={minute}
                                onChange={this.inputValue}
                                onBlur={this.inputBlur}
                                disabled={!timerPassive}
                            />:
                            <input
                                className="timer__input"
                                type="text"
                                id="second"
                                value={second}
                                onChange={this.inputValue}
                                onBlur={this.inputBlur}
                                disabled={!timerPassive}
                            />
                        </div>
                        <div className="preLoader" style={loader}></div>
                        <div className="timer__button">
                            <div className="timer__button-content">
                                <button
                                    className={visibleBtnStart + iconStartBtn}
                                    onClick={this.clickBtn}
                                ></button>
                                <button
                                    className={visibleBtnStop + " stop"}
                                    onClick={this.clickBtnStop}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTimer;