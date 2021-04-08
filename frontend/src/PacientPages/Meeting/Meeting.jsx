import React, { Component } from "react";
// jutsu
import { Jutsu } from "react-jutsu";
// react-bootstrap
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
// scss
import "./Meeting.scss";
import axios from "axios";
import { modalDate } from "../../utils/formatDate";
import PacientMeetingImage from "../../Assets/Svg/undraw_business_chat_ldig.png";

class Meeting extends Component {
  constructor() {
    super();
    this.state = {
      room: "",
      name: "",
      password: "telemed",
      call: false,
      nextMeeting: {},
      doctors: [],
      now: "",
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    let roomName = `meeting-telemed-${this.state.nextMeeting.id}`;
    this.setState({
      room: roomName,
      name: this.props.username,
      call: true,
    });
  };

  componentDidMount = async () => {
    try {
      let doctors = await axios.get(
        "http://localhost:1337/users?_where[role.type]=doctor",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      this.setState({
        doctors: doctors.data,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }

    let dateNow = Date.now();
    let now = new Date(dateNow);
    now.setHours(now.getHours() - 1);
    console.log("now", now);
    let greaterDates = this.props.apointments.filter(
      (el) => el.date > now.toISOString()
    );

    greaterDates.sort(function (a, b) {
      var keyA = new Date(a.date),
        keyB = new Date(b.date);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    this.setState({
      now: now,
      nextMeeting: greaterDates[0],
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="pacient-meeting-page">
        <p className="h2 text-center font-nunito-bold">Următorul consult</p>
        <div className="pacient-meeting d-flex align-items-center justify-content-center">
          {this.state.call ? (
            <Jutsu
              roomName={this.state.room}
              displayName={this.state.name}
              password={this.state.password}
              onMeetingEnd={() => this.setState({ call: false })}
              loadingComponent={<p>Se încarcă ...</p>}
              errorComponent={<p>Oops, a apărut o eroare.</p>}
            />
          ) : this.state.nextMeeting ? (
            <Card style={{ width: "23rem" }}>
              <Card.Img variant="top" src={PacientMeetingImage} />
              <Card.Body>
                <Card.Title>Meeting</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Doctor:{" "}
                  {this.state.doctors.map((doc) => {
                    if (
                      this.state.nextMeeting.doctor === doc.id
                    )
                      return doc.username;
                  })}
                </Card.Subtitle>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Data începerii: {modalDate(this.state.nextMeeting.date)}
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="primary"
                    className="btn-primary"
                    onClick={this.handleClick}
                  >
                    Participă
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          ) : (
            <Card style={{ width: "23rem" }}>
              <Card.Img variant="top" src={PacientMeetingImage} />
              <Card.Title className="text-center">
                Nu aveți incă programări
              </Card.Title>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

export default Meeting;
