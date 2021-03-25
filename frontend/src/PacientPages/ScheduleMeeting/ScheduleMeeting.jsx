import React, { Component } from 'react'
import ScheduleSelector from 'react-schedule-selector';
import './ScheduleMeeting.scss'

class ScheduleMeeting extends Component {
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
            <div className="pacient-schedule-page">
            <ScheduleSelector
              selection={this.state.schedule}
              numDays={5}
              minTime={8}
              maxTime={23}
              hourlyChunks={1}
              onChange={this.handleChange}
            />
          </div>
        )
    }
}

export default ScheduleMeeting;