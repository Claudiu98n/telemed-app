import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { modalDate } from '../../../../utils/formatDate';
import { withRouter } from 'react-router-dom';

class EditPacientMedicalRecords extends Component {
  constructor() {
    super();
    this.state = {
      medication: [],
      medicalRecords: [],
    };
  }

  componentDidMount = async () => {
    try {
      const pacient = await axios.get(
        `http://localhost:1337/users?id=${this.props.activePacient.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      console.log(pacient.data);

      this.setState({
        medication: pacient.data[0].medications,
        medicalRecords: pacient.data[0].medical_records,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let toRenderMedication = null;
    let toRenderMedicalRecords = null;

    if (this.state.medication.length > 0) {
      toRenderMedication = this.state.medication.map((el, index) => {
        return (
          <div key={index} className="pl-0 mr-2 mb-3 d-flex">
            <Card style={{ width: "15rem" }}>
              <Card.Body>
                <Card.Title>{el.medicament}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Acordat de doctorul: {el.doctor_name}
                </Card.Subtitle>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Ora administrării: {el.hour.split(".")[0]}
                </ListGroupItem>
                <ListGroupItem>Data începerii: {el.start}</ListGroupItem>
                <ListGroupItem>Data finalizării: {el.end}</ListGroupItem>
              </ListGroup>
            </Card>
          </div>
        );
      });
    } else {
      toRenderMedication = <p>Pacientul nu are medicație.</p>;
    }

    if (this.state.medicalRecords.length > 0) {
      toRenderMedicalRecords = this.state.medicalRecords.map((el, index) => {
        return (
          <div key={index} className="mb-3 d-flex justify-content-center">
            <Card style={{ width: "97%" }}>
              <Card.Body>
                <Card.Title>Fișă medicală</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Din data de: {modalDate(el.created_at).split(",")[0]}
                </Card.Subtitle>
              </Card.Body>
              <ListGroup className="list-group-flush">
                {el.medrec.map((rec, index) => {
                  return (
                    <React.Fragment>
                      <ListGroupItem>
                        Categoria afecțiunii: {rec.category}
                      </ListGroupItem>
                      <ListGroupItem>
                        Descrierea afecțiunii: {rec.affection}
                      </ListGroupItem>
                    </React.Fragment>
                  );
                })}
                <ListGroupItem>
                  <Button
                    variant="primary"
                    className="btn-primary"
                    onClick={() => {
                      this.props.history.push(`/generează-pdf/${el.id}`);
                    }}
                  >
                    Generează PDF
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </div>
        );
      });
    } else {
      toRenderMedicalRecords = <p>Pacientul are fișă medicală generată.</p>;
    }

    return (
      <div className="mt-4">
        <div style={{ height: "400px", overflowY: "scroll" }}>
          <h6>Istoricul medicației</h6>
          <div className="d-flex flex-wrap">{toRenderMedication}</div>
          <h6>Istoricul fișelor medicale</h6>
          <div className="d-flex flex-wrap">{toRenderMedicalRecords}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditPacientMedicalRecords);
