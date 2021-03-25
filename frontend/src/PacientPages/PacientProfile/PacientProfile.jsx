import React, { Component } from "react";
import { Card } from "react-bootstrap";
import User from '../../Assets/Images/avatar.png';
import './PacientProfile.scss';

class PacientProfile extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center pacient-profile-page">
        <p className="h2">Profilul meu</p>
        <Card className="mt-5 card-profile">
          <Card.Img variant="top" src={User}/>
          <Card.Body>
            <Card.Title>Pacient</Card.Title>
            <Card.Text>
              Email: pacient@pacient.ro
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Created at 16.09.2020</small>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default PacientProfile;
