import React, {Component} from "react";
// style
import "./EditPacientsModal.scss";
// react-bootstrap, rsuite
import { Modal } from "react-bootstrap";
import { Nav } from "rsuite";
//components
// import EditPacientsMedication from "./minicomponents/EditPacientsMedication";
// import EditPacientsMedicalRecords from "./minicomponents/EditPacientMedicalRecords";

class EditPacientsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "medication",
    };
  }

  handleSelect = (activeKey) => {
    this.setState({ active: activeKey });
  };

  render() {
    let toRender = null;
    // switch (this.state.active) {
    //   case "medicalRecords":
    //     toRender = <EditPacientsMedicalRecords />;
    //     break;
    //   case "medication":
    //     toRender = <EditPacientsMedication />;
    //     break;
    //   default:
    //     return null;
    // }

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Acțiuni asupra pacientului:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Nav
            activeKey={this.state.active}
            appearance="tabs"
            onSelect={this.handleSelect}
            className="modals-nav"
          >
            <Nav.Item eventKey="medication"> Medicație </Nav.Item>
            <Nav.Item eventKey="medical-records"> Fișă Medicală </Nav.Item>
          </Nav> */}
          <p>okok</p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditPacientsModal;
