import React, { Component } from "react";
// react-bootstrap
import { Table, Button } from "react-bootstrap";

class PacientsList extends Component {
    constructor() {
        super();
        this.state=[
            {
                id: 1,
                name: 'Duffy',
                surname: 'Duck'
            }
        ]
    }

    render() {
    return (
      <div className="d-flex justify-content-center align-items-center">
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
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry</td>
              <td>Larry</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PacientsList;
