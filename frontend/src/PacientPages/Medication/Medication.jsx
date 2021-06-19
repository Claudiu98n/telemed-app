import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";
import MedicationImage from "../../Assets/Svg/medication.png";

class Medication extends Component {
  render() {
    console.log(this.props.medications);

    let toRender = null;

    if (this.props.medications.length > 0) {
      toRender = this.props.medications.map((el, index) => {
        return (
          <Col key={index} className="mb-3 d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={MedicationImage} />
              <Card.Body>
                <Card.Title>{el.medicament}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Doctor: {el.doctor_name}
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
          </Col>
        );
      });
    } else {
      toRender = (
        <p style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
          Nu aveți medicație.
        </p>
      );
    }

    return (
      <div>
        <Row className="d-flex" lg={3} md={2} sm={2} xs={1}>
          {toRender}
        </Row>
      </div>
    );
  }
}

export default Medication;
