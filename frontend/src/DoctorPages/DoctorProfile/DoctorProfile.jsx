import React, { Component } from "react";
import { Card } from "react-bootstrap";
import User from '../../Assets/Images/user.png';
import './DoctorProfile.scss';

class DoctorProfile extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center doctor-profile-page">
        <p className="h2">Profilul meu</p>
        <Card className="mt-5 card-profile">
          <Card.Img variant="top" src={User}/>
          <Card.Body>
            <Card.Title>Doctor</Card.Title>
            <Card.Text>
              Email: doctor@doctor.ro
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

export default DoctorProfile;
