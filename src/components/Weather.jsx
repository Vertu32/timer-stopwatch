import React, { Component } from 'react';
import Skycons from 'react-skycons';

const place = [
    {
        lot: "55.742793",
        long: "37.6154",
    },
    {
        lot: "51.5085",
        long: "-0.12574",
    },
    {
        lot: "48.8534",
        long: "2.3488",
    },
    {
        lot: "40.7143",
        long: "-74.006",
    }
]
class Weather extends Component {
    state = {
        city: place,
        data: "",
        icon: "",
        temperature: "",
        summary: "",
        timezone: "",
        animat: false,
    };
    componentDidMount = async () => {
        const { city } = this.state;
        let places = new Array;
        for (let i = 0; i < city.length; i++) {
            const api_url = await
                fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f9f73fae5939ef99afdaf6f4ff490ced/${city[i].lot},${city[i].long}`);
            const dt = await api_url.json();
            const { temperature, summary, icon } = dt.currently;
            let newData = [{
                temperature,
                summary,
                timezone: dt.timezone,
                icon: icon.replace(/-/g, "_").toUpperCase(),
            }, ...places];
            places = newData;
        }
        this.setState({ data: places });
        this.showContent();
    }
    showContent = () => {
        const { data } = this.state;
        this.setState({
            icon: data[0].icon,
            temperature: data[0].temperature.toFixed(1) + "F",
            summary: data[0].summary,
            timezone: data[0].timezone,
        });
        let i = 0;
        setInterval(() => {
            this.animationWeather();
            setTimeout(() => {
                i++;
                (i == 4) && (i = 0);
                this.setState({
                    icon: data[i].icon,
                    temperature: data[i].temperature.toFixed(1) + "F",
                    summary: data[i].summary,
                    timezone: data[i].timezone,
                });
            }, 500);
        }, 15000);
    };
    animationWeather = () => {
        this.setState({ animat: true });
        setTimeout(() => {
            this.setState({ animat: false })
        }, 2000);
    };
    
    render() {
        const { icon, temperature, summary, timezone, animat } = this.state;
        return (
            <div className="global__content weather">
                <div
                    className="weather__content"
                    style={(animat) ? { animation: "opacityWheater 1s ease-in-out" } : {}}
                >
                    <div className="weather__icon">
                        <Skycons
                            color="white"
                            icon={icon}
                            autoplay={true}
                        />
                    </div>
                    <div className="weather__text">
                        <p className="weather-city">{timezone}</p>
                        <p className="weather-temp">{temperature}</p>
                        <p className="weather-summary">{summary}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;