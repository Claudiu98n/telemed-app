import React, { Component } from "react";
import { Card } from "react-bootstrap";
import User from "../../Assets/Images/avatar.png";
import { formatDate } from "../../utils/formatDate";
import "./PacientProfile.scss";

class PacientProfile extends Component {
  render() {
    const { email, date, username } = this.props;

    return (
      <div className="d-flex flex-column align-items-center pacient-profile-page">
        <p className="h2">Profilul meu</p>
        <Card className="mt-5 card-profile">
          <Card.Img variant="top" src={User} />
          <Card.Body>
            <Card.Title>Pacient</Card.Title>
            <Card.Text>
              <p style={{ marginBottom: 0 }}>
                <span
                  style={{ marginRight: "5px" }}
                  className="font-nunito-bold"
                >
                  Nume:
                </span>
                {username}
              </p>
              <p style={{ marginBottom: 0 }}>
                <span
                  style={{ marginRight: "5px" }}
                  className="font-nunito-bold"
                >
                  Email:
                </span>
                {email}
              </p>
            </Card.Text>
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

export default PacientProfile;
