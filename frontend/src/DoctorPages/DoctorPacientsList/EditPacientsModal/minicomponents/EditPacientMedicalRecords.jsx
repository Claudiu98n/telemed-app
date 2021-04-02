import React, { Component } from "react";
import { FormControl, Form, Button } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import axios from "axios";

class EditPacientMedicalRecords extends Component {
  constructor() {
    super();
    this.state = {
      recordsArray: [
        {
          category: "",
          affection: "",
        },
      ],
    };
  }

  handleMedicalRecords = (index, event) => {
    const values = [...this.state.recordsArray];
    values[index][event.target.name] = event.target.value;
    this.setState({
      recordsArray: values,
    });
  };

  generateFields = () => {
    this.setState({
      recordsArray: [
        ...this.state.recordsArray,
        { category: "", affection: "" },
      ],
    });
  };

  createMedicalRecord = async () => {
    let response = await axios.post(
      "http://localhost:1337/createMedicalRecord",
      {
        medrec: this.state.recordsArray,
        pacientId: this.props.activePacient.id
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
    let toRender = null;

    toRender = this.state.recordsArray.map((el, index) => {
      return (
        <div
          className="d-flex align-items-center justify-content-between mt-3"
          key={index}
        >
          <div className="w-75">
            <Form.Label htmlFor="category">
              Introduceți categoria afecțiunii
            </Form.Label>
            <FormControl
              type="text"
              name="category"
              value={el.category}
              onChange={(event) => this.handleMedicalRecords(index, event)}
            />
            <Form.Label htmlFor="affection">Descrieți afecțiuniea</Form.Label>
            <FormControl
              type="text"
              name="affection"
              value={el.affection}
              onChange={(event) => this.handleMedicalRecords(index, event)}
            />
          </div>
          <div className="w-25 d-flex justify-content-center">
            <BsPlusCircle onClick={this.generateFields} />
          </div>
        </div>
      );
    });

    return (
      <div className="mt-4">
        <p className="h5">
          Generează fișă medicală pentru {this.props.activePacient.username}
        </p>
        <Form.Label htmlFor="completeName">Nume complet pacient</Form.Label>
        <FormControl
          type="text"
          name="completeName"
          readOnly
          value={this.props.activePacient.username}
        />
        {toRender}
        <Button
          variant="outline-primary"
          className="btn-outline-primary-black mt-3 w-100"
          onClick={this.createMedicalRecord}
        >
          Trimite
        </Button>
      </div>
    );
  }
}

export default EditPacientMedicalRecords;
