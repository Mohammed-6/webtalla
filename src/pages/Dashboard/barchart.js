import React, { Component } from "react"
import { Bar } from "react-chartjs-2"

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mdata: props.mdata,
    }
  }
  render() {
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Sales Analytics",
          backgroundColor: "rgba(52, 195, 143, 0.8)",
          borderColor: "rgba(52, 195, 143, 0.8)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
          hoverBorderColor: "rgba(52, 195, 143, 0.9)",
          data: this.state.mdata.graph,
        },
      ],
    }

    const option = {
      scales: {
        dataset: [
          {
            barPercentage: 0.4,
          },
        ],
      },
    }

    return (
      <React.Fragment>
        <Bar width={474} height={300} data={data} options={option} />
      </React.Fragment>
    )
  }
}

export default BarChart
