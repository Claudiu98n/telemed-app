import React, { Component } from "react";
import { FormControl, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

class EditPacientsMedication extends Component {
  constructor() {
    super();
    this.state = {
      medicament: "",
      hour: "",
      startDate: "",
      endDate: "",
    };
  }

  handleMedication = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendMedication = async (pacientId) => {
    if (
      this.state.nurofen === "" ||
      this.state.hour === "" ||
      this.state.startDate === "" ||
      this.state.endDate === ""
    ) {
      toast.error("Ati lasat campurile necompletate");
    } else {
      let response = await axios.post(
        "http://localhost:1337/createMedication",
        {
          medicament: this.state.medicament,
          hour: this.state.hour+":00",
          start: this.state.startDate,
          end: this.state.endDate,
          pacientId: pacientId
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      console.log(response.data);
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="mt-4">
        <p className="h5">
          Adaugă medicație pentru {this.props.activePacient.username}
        </p>
        <Form.Label htmlFor="medicament">Nume medicament</Form.Label>
        <FormControl
          type="text"
          name="medicament"
          placeholder="Nurofen"
          onChange={this.handleMedication}
        />
        <Form.Label htmlFor="hour" className="mt-3">
          Ora administrării
        </Form.Label>
        <FormControl type="time" name="hour" onChange={this.handleMedication} />
        <Form.Label htmlFor="startDate" className="mt-3">
          Data începerii
        </Form.Label>
        <FormControl
          type="date"
          name="startDate"
          placeholder="Data începerii"
          onChange={this.handleMedication}
        />
        <Form.Label htmlFor="endDate" className="mt-3">
          Data finalizării
        </Form.Label>
        <FormControl
          type="date"
          name="endDate"
          placeholder="Data finalizării"
          onChange={this.handleMedication}
        />
        <Button
          variant="outline-primary"
          className="btn-outline-primary-black mt-3 w-100"
          onClick={() => this.sendMedication(this.props.activePacient.id)}
        >
          Trimite
        </Button>
      </div>
    );
  }
}

export default EditPacientsMedication;
