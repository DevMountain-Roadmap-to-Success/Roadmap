import React from "react";
import axios from "axios";
import "./weather-icons-master/css/weather-icons.css";
import "./weather-icons-master/css/weather-icons.min.css";
import styled from "styled-components";
import "./weather-icons-master/less/mappings/wi-owm.less";
import moment from "moment";
import night from "../../assets/nightsky.png";
import day from "../../assets/daysky.jpg";
import evening from "../../assets/sunset.jpg";
import Draggable from 'react-draggable'




const WeatherWidget = styled.div`
  background-image: url(${props => props.image || day});
  background-size: 160%;
  background-repeat: no-repeat;
  color: white;
  font-size: 28px;
  width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  
  border-radius: 4px;
  box-shadow: 0px 5px 8px 2px rgb(80, 79, 110);

  i {
    font-size: 60px;
  }
  .wrapper {
    display: flex;
    width: 100%;
    position: relative;
    justify-content: space-evenly;
    align-items: center;
    
  }
  .weather-description {
    font-size: 28px;
    font-weight: lighter;
  }
`;
const Temp = styled.div`
  font-size: 38px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 17px;
    text-align: right;
    margin: 10px;   
  }
`;
const Time = styled.div`
  font-size: 48px;
  font-weight: bold;
`;
const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

class Weather extends React.Component {
  state = {
    weather: [],
    temp: {},
    code: null,
    date: moment().format("M.DD"),
    day: days[new Date().getDay()],
    time: new Date().getTime(),
    place: "",
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };
  componentDidMount = () => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?zip=84604&units=imperial&appid=d116831d7664ec954f3938831a231317"
      )
      .then(res => {
        this.setState({
          weather: res.data.weather[0],
          temp: res.data.main,
          place: res.data.name
        });
      });
  };


  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
    // console.log(this.state.deltaPosition);   

  }

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  }


  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    let time = moment(this.state.time).format("HH");
    if(time < 17 && time >= 6){
      var image = day
    } else if(time < 19 ){
      image = evening 
    } else if(time >= 19 || time < 6){
      image = night
    }
    // console.log(this.state);
    let timeDisplay = moment(this.state.time).format("hh:mm");
    let temp = Math.round(this.state.temp.temp);
    let id = this.state.weather.id;
    return (
      <Draggable onDrag={this.handleDrag} {...dragHandlers}
      defaultPosition={{x:1160 , y: -400}}
      grid={[25, 25]}

      >
      <WeatherWidget image={image}>
        <div className="wrapper">
          {time < 17 ? (
            <i className={`wi wi-owm-day-${id}`} />
          ) : (
            <i className={`wi wi-owm-night-${id}`} />
          )}

          <TimeWrapper>
            <span>{`${this.state.day} ${this.state.date}`}</span>
            <Time>{timeDisplay}</Time>
            <span>{this.state.place}</span>
          </TimeWrapper>
        </div>
        <div className='wrapper'>
          <Temp>{temp} &#8457;</Temp>

          <p className="weather-description">
            {this.state.weather.description}
          </p>
        </div>
      </WeatherWidget>
      </Draggable>
    );
  }
}

export default Weather;
