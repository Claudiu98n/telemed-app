import React, { Component } from "react";
import ScheduleSelector from "react-schedule-selector";
import "./ScheduleMeeting.scss";
import { removeOffset } from "../../utils/formatDate";
import ChooseDoctorModal from "./ChooseDoctorModal/ChooseDoctorModal";
import axios from 'axios';

class ScheduleMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      schedule: [],
      newSchedule: "",
    };
  }

  componentDidMount = () => {
    let finishedApointments = [];

    this.props.apointments.map((el) => {
      finishedApointments.push(removeOffset(el.date));
    });

    this.setState({ schedule: finishedApointments });
  };

  handleChange = (newSchedule) => {
    if(!this.state.schedule.includes(newSchedule[newSchedule.length-1])) {
      this.setState({
        show: true,
        newSchedule: newSchedule[newSchedule.length-1]
      })
    }
  };

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  makeApointment = async (date) => {
    let response = await axios.post(
      "http://localhost:1337/createApointment",
      {
        date: date,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response.data);
  };

  render() {
    console.log(this.state.schedule);

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
        <ChooseDoctorModal
          newSchedule={this.state.newSchedule}
          show={this.state.show}
          onHide={this.closeModal}
          makeApointment={this.makeApointment}
        />
      </div>

      // <div onClick={this.makeApointment}>
      //   <div onClick={this.logout}>pacient</div>
      //   {this.state.apointments.map((el, index) => {
      //     return (
      //       <div
      //         key={index}
      //         className="mt-5 mt-5"
      //         style={{ background: "black", color: "white" }}
      //       >
      //         {el.Data}
      //       </div>
      //     );
      //   })}
      // </div>
    );
  }
}

export default ScheduleMeeting;
