import React, { Component } from "react";
import { FormControl, Form } from "react-bootstrap";

class EditPacientsMedication extends Component {
  constructor() {
    super();
    this.state = {
      medicament: null,
      hour: null,
      startDate: null,
      endDate: null
    };
  }

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
          onChange={this.handleChange}
        />
        <Form.Label htmlFor="hour" className="mt-3">
          Ora administrării
        </Form.Label>
        <FormControl type="time" name="hour" onChange={this.handleChange} />
        <Form.Label htmlFor="startDate" className="mt-3">
          Data începerii
        </Form.Label>
        <FormControl
          type="date"
          name="startDate"
          placeholder="Data începerii"
          onChange={this.handleChange}
        />
        <Form.Label htmlFor="endDate" className="mt-3">
          Data finalizării
        </Form.Label>
        <FormControl
          type="date"
          name="endDate"
          placeholder="Data finalizării"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default EditPacientsMedication;
