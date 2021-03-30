import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class EditPacientsMedication extends Component {
  constructor() {
    super();
    this.state = {
      hour: "",
    };
  }

  handleHours = (event) => {
    console.log(event);
    this.setState({
      hour: event,
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="mt-4">
        <p className="h5">
          Adaugă medicație pentru {this.props.activePacient.username}
        </p>
        <FormControl
          type="text"
          name=""
          placeholder="Nume medicament"
          onChange={this.handleChange}
        />
        <FormControl
          type="text"
          name=""
          className="mt-3"
          placeholder="Ora administrării"
          onChange={this.handleChange}
        />
        <FormControl
          type="text"
          name=""
          className="mt-3"
          placeholder="Data începerii"
          onChange={this.handleChange}
        />
        <FormControl
          type="text"
          name=""
          className="mt-3"
          placeholder="Data finalizării"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default EditPacientsMedication;
