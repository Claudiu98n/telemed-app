import React, { Component } from "react";
import ScheduleSelector from 'react-schedule-selector'
import './DoctorApointments.scss';

class DoctorApointments extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [],
    };
  }

  handleChange = (newSchedule) => {
    // modal ales docor pentru pacient
    this.setState({ schedule: newSchedule });
    console.log(newSchedule);
  };

  render() {
    return (
      <div className="doctor-apointments-page">
        <ScheduleSelector
          selection={this.state.schedule}
          numDays={5}
          minTime={8}
          maxTime={23}
          hourlyChunks={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DoctorApointments;
