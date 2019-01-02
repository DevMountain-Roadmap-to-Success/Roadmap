import {Bar} from 'react-chartjs-2';

import React from 'react'

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
    label: "My First dataset",
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
    }]
}

const chartOptions = {
    width: '400px',
    height: '400px'
}
// Chart.defaults.global.responsive = true;
class ChartWidget extends React.Component {
    render(){

      return (
          <Bar data={data} style={chartOptions}
          height={500}
          width={700}/>
      )
    }
}
  
export default ChartWidget
