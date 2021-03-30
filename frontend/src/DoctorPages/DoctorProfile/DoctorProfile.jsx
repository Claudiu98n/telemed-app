import React, { Component } from "react";
import { Card } from "react-bootstrap";
import {formatDate} from "../../utils/formatDate";
import User from "../../Assets/Images/avatar.png";
import "./DoctorProfile.scss";

class DoctorProfile extends Component {
  render() {
    const { email, date } = this.props;

    return (
      <div className="d-flex flex-column align-items-center doctor-profile-page">
        <p className="h2">Profilul meu</p>
        <Card className="mt-5 card-profile">
          <Card.Img variant="top" src={User} />
          <Card.Body>
            <Card.Title>Doctor</Card.Title>
            <Card.Text>Email: {email}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Member since {formatDate(date)}
            </small>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default DoctorProfile;
