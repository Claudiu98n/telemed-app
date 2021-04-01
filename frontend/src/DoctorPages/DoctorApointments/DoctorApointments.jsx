import React, { Component } from "react";
import ScheduleSelector from "react-schedule-selector";
import "./DoctorApointments.scss";
import { Button, Card } from "react-bootstrap";
import { modalDate } from "../../utils/formatDate";
import axios from "axios";

class DoctorApointments extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [],
      showApointments: false,
      pacients: [],
    };
  }

  componentDidMount = async () => {
    let finishedApointments = [];

    this.props.apointments.map((el) => {
      finishedApointments.push(el.date);
    });

    this.setState({ schedule: finishedApointments });

    try {
      let pacients = await axios.get(
        "http://localhost:1337/users?_where[role.type]=pacient",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      this.setState({
        pacients: pacients.data,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
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

  deleteApointment = async (id) => {
    console.log(id);

    let response = await axios.delete(
      `http://localhost:1337/apointments/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response.data);
  }

  render() {
    let toRender = null;
    toRender = this.props.apointments.map((el) => {
      return (
        <Card className="my-3">
          <Card.Body>
            <Card.Title className="font-nunito-regular"> Data și ora: {modalDate(el.date)} </Card.Title>
            <Card.Subtitle className="font-nunito-light">
              Numele pacientului:{" "}
              {this.state.pacients.map((pac) => {
                if (el.users_permissions_user === pac.id) return pac.username;
              })}
            </Card.Subtitle>
            <Card.Link onClick={() => this.deleteApointment(el.id)} style={{color: '#962DAF'}} href="#">Marchează ca efectuată</Card.Link>
          </Card.Body>
        </Card>
      );
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
