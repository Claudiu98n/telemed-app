import React, { Component } from "react";
import ScheduleSelector from "react-schedule-selector";
import "./DoctorApointments.scss";

class DoctorApointments extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [],
    };
  }

  componentDidMount = () => {
    let finishedApointments = [];

    this.props.apointments.map((el) => {
      finishedApointments.push(el.date);
    });

    this.setState({ schedule: finishedApointments });
  };

  handleChange = (newSchedule) => {
    console.log("new", newSchedule);
    if (newSchedule.length !== this.state.schedule.length) {
      alert(
        "Doctorul nu poate face programări. Rugați pacientul să o efectueze!"
      );
    }
  };

  render() {
    console.log(this.props.apointments);

    return (
      <div className="doctor-apointments-page">
        <ScheduleSelector
          selection={this.state.schedule}
          numDays={5}
          minTime={8}
          maxTime={23}
          hourlyChunks={1}
          selectedColor={"#962DAF"}
          unselectedColor={"#E7C3EF"}
          hoveredColor={"#968e45"}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DoctorApointments;
