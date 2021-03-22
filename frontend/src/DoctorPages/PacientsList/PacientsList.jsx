import React, { Component } from "react";
// react-bootstrap
import { Table, Button } from "react-bootstrap";
// scss
import "./PacientsList.scss";
// modal
import EditPacientsModal from "./EditPacientsModal/EditPacientsModal";

class PacientsList extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      data: [
        {
          id: 1,
          name: "Duffy",
          surname: "Duck",
        },
        {
          id: 2,
          name: "Duffy",
          surname: "Duck",
        },
        {
          id: 3,
          name: "Duffy",
          surname: "Duck",
        },
        {
          id: 4,
          name: "Duffy",
          surname: "Duck",
        },
        {
          id: 5,
          name: "Duffy",
          surname: "Duck",
        },
      ],
    };
  }

  showModal = () => {
    this.setState({
      show: true
    });
  }

  closeModal = () => {
    this.setState({
      show: false
    });
  }

  render() {
    console.log(this.state.show);
    return (
      <div className="pacients-list-page d-flex justify-content-center align-items-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Număr</th>
              <th>Nume</th>
              <th>Prenume</th>
              <th>Accesează</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((el) => {
              return (
                <tr>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.surname}</td>
                  <td>
                    <p>
                      <Button onClick={this.showModal}>
                        Acțiuni
                      </Button>
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <EditPacientsModal
          show={this.state.show}
          onHide={this.closeModal}
        />
      </div>
    );
  }
}

export default PacientsList;
