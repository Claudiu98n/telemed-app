import React, { Component } from "react";
import MedicalRecordImage from "../../Assets/Svg/medrec.png";
import { modalDate } from "../../utils/formatDate";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
  Button,
} from "react-bootstrap";
import "./MedicalRecords.scss";

class MedicalRecords extends Component {
  generatePDF = () => {};

  render() {
    console.log(this.props);

    let toRender = null;

    if (this.props.medicalRecords.length > 0) {
      toRender = this.props.medicalRecords.map((el, index) => {
        return (
          <Col key={index} className="mb-3 d-flex justify-content-center">
            <Card style={{ width: "100%" }}>
              <div className="w-100 d-flex justify-content-center">
                <Card.Img
                  className="medrec-img"
                  variant="top"
                  src={MedicalRecordImage}
                />
              </div>
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
                    onClick={this.generatePDF}
                  >
                    Generează PDF
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        );
      });
    } else {
      toRender = (
        <p className="w-100 d-flex justify-content-center">
          Nu aveți fișă medicală generată.
        </p>
      );
    }

    return (
      <div className="pacient-medical-records">
        <Row className="d-flex" md={1} sm={1} xs={1}>
          {toRender}
        </Row>
      </div>
    );
  }
}

export default MedicalRecords;
