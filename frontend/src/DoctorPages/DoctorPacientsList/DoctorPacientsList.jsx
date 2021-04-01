import React, { Component } from "react";
import axios from "axios";
// react-bootstrap
import { Table, Button } from "react-bootstrap";
// scss
import "./DoctorPacientsList.scss";
// modal
import EditPacientsModal from "./EditPacientsModal/EditPacientsModal";

class DoctorPacientsList extends Component {
  constructor() {
    super();
    this.state = {
      activePacient: {},
      pacients: [],
      show: false,
    };
  }

  componentDidMount = async () => {
    try {
      let pacients = await axios.get(
        "http://localhost:1337/users?_where[role.type]=pacient",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      this.setState({
        pacients: pacients.data,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  showModal = (el) => {
    this.setState({
      show: true,
      activePacient: el,
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    console.log(this.state.pacients);

    let toRender = null;

    if (this.state.pacients.length > 0) {
      toRender = (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Număr</th>
              <th>Nume</th>
              <th>Email</th>
              <th>Accesează</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pacients.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{1 + index}</td>
                  <td>{el.username}</td>
                  <td style={{wordBreak: 'break-all'}}>{el.email}</td>
                  <td>
                    <p>
                      <Button onClick={() => this.showModal(el)}>
                        Acțiuni
                      </Button>
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else {
      toRender = <p>Nu există pacienți.</p>
    }

    return (
      <div className="pacients-list-page d-flex justify-content-center">
        {toRender}
        <EditPacientsModal
          show={this.state.show}
          onHide={this.closeModal}
          activePacient={this.state.activePacient}
        />
      </div>
    );
  }
}

export default DoctorPacientsList;
