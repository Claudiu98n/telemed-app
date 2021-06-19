import React, { Component } from "react";
// style
import "./EditPacientsModal.scss";
// react-bootstrap
import { Modal, Nav } from "react-bootstrap";

// components
import EditPacientsMedication from "./minicomponents/EditPacientsMedication";
import EditPacientsMedicalRecords from "./minicomponents/EditPacientMedicalRecords";
import EditPacientsHistory from "./minicomponents/EditPacientsHistory";

class EditPacientsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "medication",
    };
  }

  handleSelect = (selectedKey) => {
    this.setState({ active: selectedKey });
  };

  render() {
    let toRender = null;
    switch (this.state.active) {
      case "medicalRecords":
        toRender = <EditPacientsMedicalRecords activePacient={this.props.activePacient}/>;
        break;
      case "medication":
        toRender = <EditPacientsMedication activePacient={this.props.activePacient}/>;
        break;
      case "history":
        toRender = <EditPacientsHistory activePacient={this.props.activePacient}/>;
        break;
      default:
        return null;
    }

    return (
      <Modal
        className="edit-pacients-modal"
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Acțiuni asupra pacientului:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav
            fill
            variant="tabs"
            activeKey="/home"
            onSelect={this.handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey="medication">Medicație</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="medicalRecords">Fișă medicală</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history">Istoric</Nav.Link>
            </Nav.Item>
          </Nav>
          {toRender}
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditPacientsModal;
