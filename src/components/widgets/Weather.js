import React from "react";
import axios from "axios";
import "./weather-icons-master/css/weather-icons.css";
import "./weather-icons-master/css/weather-icons.min.css";
import styled from "styled-components";
import "./weather-icons-master/less/mappings/wi-owm.less";
import moment from "moment";
import night from "../../assets/nightsky.png";
import day from "../../assets/bluesky.jpeg";
import evening from "../../assets/sunset.jpg";
import Draggable from 'react-draggable'
import {connect} from 'react-redux'
import {getPosition} from '../../ducks/reducer'


const WeatherWidget = styled.div`
  background-image: url(${props => props.image || day});
  background-size: 180%;
  background-repeat: no-repeat;
  color: white;
  font-size: 28px;
  width: 350px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;

  
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
    
  };
  componentDidMount = () => {

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?zip=84604&units=imperial&appid=${process.env.WEATHER_API_KEY}`
      )
      .then(res => {
        this.setState({
          weather: res.data.weather[0],
          temp: res.data.main,
          place: res.data.name
        });
      });
  };



  

  render() {
 const {deltaX, deltaY} = this.props.position
    let time = moment(this.state.time).format("HH");
    if(time < 17 && time >= 6){
      var image = day
    } else if(time < 19 ){
      image = evening 
    } else if(time >= 19 || time < 6){
      image = night
    }
    let timeDisplay = moment(this.state.time).format("hh:mm");
    let temp = Math.round(this.state.temp.temp);
    let id = this.state.weather.id;
    return (
      <Draggable 
      defaultPosition={{x: deltaX , y: deltaY}}
      // grid={[25, 25]}

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
const mapStateToProps = state => {
  return {
    position: state.position
  }
}

export default connect(mapStateToProps, {getPosition})(Weather);
