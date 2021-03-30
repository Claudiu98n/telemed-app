import React, { Component } from "react";
import ScheduleSelector from "react-schedule-selector";
import "./DoctorApointments.scss";
import { Button } from "react-bootstrap";
import { modalDate } from "../../utils/formatDate";

class DoctorApointments extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [],
      showApointments: false,
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

  handleShowApointments = () => {
    this.setState({
      showApointments: !this.state.showApointments,
    });
  };

  render() {
    console.log(this.props.apointments);

    let toRender = null;
    toRender = this.state.schedule.map((el) => {
      return <p>{modalDate(el)}</p>;
    });

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
        {this.state.schedule.length > 0 ? (
          <div className="d-flex flex-column align-items-center">
            <Button
              variant="primary"
              className="btn-primary mt-5"
              onClick={this.handleShowApointments}
            >
              {this.state.showApointments
                ? `Ascunde programările pacienților`
                : `Arată programările pacienților`}
            </Button>
            {this.state.showApointments && (
              <div className="confirmed-apointments-container mt-3">
                {toRender}
              </div>
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <p>Nu aveți programări momentan.</p>
          </div>
        )}
      </div>
    );
  }
}

export default DoctorApointments;
