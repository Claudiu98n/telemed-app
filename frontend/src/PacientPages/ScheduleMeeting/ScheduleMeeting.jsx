import React, { Component } from "react";
import ScheduleSelector from "react-schedule-selector";
import "./ScheduleMeeting.scss";
import ChooseDoctorModal from "./ChooseDoctorModal/ChooseDoctorModal";
import axios from "axios";
import { modalDate } from "../../utils/formatDate";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

class ScheduleMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      schedule: [],
      newSchedule: "",
      showApointments: false,
      doctors: [],
    };
  }

  componentDidMount = async () => {
    let finishedApointments = [];

    this.props.apointments.map((el) => {
      finishedApointments.push(el.date);
    });

    this.setState({ schedule: finishedApointments });

    try {
      let doctors = await axios.get(
        "http://localhost:1337/users?_where[role.type]=doctor",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      this.setState({
        doctors: doctors.data,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleChange = (newSchedule) => {
    if (newSchedule.length > 0) {
      if (!this.state.schedule.includes(newSchedule[newSchedule.length - 1])) {
        this.setState({
          show: true,
          newSchedule: newSchedule[newSchedule.length - 1],
        });
      }
    }
  };

  handleShowApointments = () => {
    this.setState({
      showApointments: !this.state.showApointments,
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  makeApointment = async (date, doctor) => {
    let response = await axios.post(
      "http://localhost:1337/createApointment",
      {
        date: date,
        doctorId: doctor,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response.data);
    if(response.data.semafor === false) {
      toast.error(`Doctorul ${response.data.doctorName} are deja o programare activă la această oră 👨‍⚕️`);
    } else {
      toast.success(`Programare realizată cu succes la Doctorul ${response.data.doctorName} 👨‍⚕️`)
    }
  };

  render() {
    let toRender = null;

    toRender = this.props.apointments?.map((el, index) => {
      return (
        <Card className="my-3" key={index}>
          <Card.Body>
            <Card.Title className="font-nunito-regular">
              {" "}
              Data și ora: {modalDate(el.date)}{" "}
            </Card.Title>
            <Card.Subtitle className="font-nunito-light">
              Numele doctorului:{" "}
              {this.state.doctors.map((doc) => {
                if (el.doctor === doc.id) return doc.username;
              })}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      );
    });

    return (
      <div className="pacient-schedule-page">
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
                ? `Ascunde programările efectuate`
                : `Arată programările efectuate`}
            </Button>
            {this.state.showApointments && (
              <div className="confirmed-apointments-container mt-3">
                {toRender}
              </div>
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <p>Nu aveți programări efectuate</p>
          </div>
        )}
        <ChooseDoctorModal
          newSchedule={this.state.newSchedule}
          show={this.state.show}
          onHide={this.closeModal}
          makeApointment={this.makeApointment}
        />
      </div>
    );
  }
}

export default ScheduleMeeting;
