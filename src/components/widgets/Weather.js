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
  width: 370px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 3px;
  /* box-shadow: 0px 2px 3px .5px rgb(186, 186, 231); */

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

  }

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  }
  eventLogger = (e = MouseEvent, data = Object) => {
    // console.log('Event: ', e);
    console.log('Data: ', data);

    this.props.getPosition(data)
  };
  ondrop = (e) => {
    console.log(e.target.className)
    e.preventDefault();
    if ( e.target.className === "droptarget" ) {
      var data = e.dataTransfer.getData("Text");
      e.target.appendChild(document.getElementById(data));
      document.getElementById("demo").innerHTML = "The p element was dropped";
    }
  };

  render() {
 const {deltaX, deltaY} = this.props.position
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    let time = moment(this.state.time).format("HH");
    if(time < 17 && time >= 6){
      var image = day
    } else if(time < 19 ){
      image = evening 
    } else if(time >= 19 || time < 6){
      image = night
    }
    console.log(this.props);
    let timeDisplay = moment(this.state.time).format("hh:mm");
    let temp = Math.round(this.state.temp.temp);
    let id = this.state.weather.id;
    return (
      <Draggable onDrag={this.eventLogger} onDrop={this.ondrop} 
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
