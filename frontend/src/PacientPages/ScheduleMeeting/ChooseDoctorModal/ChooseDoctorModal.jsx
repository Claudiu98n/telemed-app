import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// style
import "./ChooseDoctorModal.scss";
// react-bootstrap
import { Modal, Form, Button } from "react-bootstrap";

import { modalDate } from "../../../utils/formatDate";
import axios from "axios";

class ChooseDoctorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      chosenDoctor: "",
      loading: true
    };
  }

  componentDidMount = async () => {
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

    if(this.state.loading === false ) {
      this.setState({
        chosenDoctor: this.state.doctors[0].username
      });
    }
  };

  chooseDoctor = (event) => {
    this.setState({
      chosenDoctor: event.target.value,
    });
  };

  handleConfirm = () => {
    let doctorId = this.state.doctors.filter(
      (el) => el.username === this.state.chosenDoctor
    )[0].id;
    this.props.makeApointment(this.props.newSchedule, doctorId);
    this.props.onHide();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p className="font-nunito-bold">
              Programare - {modalDate(this.props.newSchedule?.toString())}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="h5 font-nunito-bold text-center">Alegeți doctorul</p>
          <div className="mt-2 d-flex flex-column align-items-center">
            <Form.Control
              as="select"
              className="select-doctor w-50"
              custom
              value={this.state.chosenDoctor}
              onChange={this.chooseDoctor}
            >
              {this.state.doctors.map((el, index) => {
                return <option key={index}>{el.username}</option>;
              })}
            </Form.Control>
            <Button
              variant="primary"
              className="btn-primary mt-5 w-50"
              onClick={this.props.newSchedule ? this.handleConfirm : null}
            >
              Confirmă
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(ChooseDoctorModal);
