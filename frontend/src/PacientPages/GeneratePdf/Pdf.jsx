import React from "react";
import Pdf from "react-to-pdf";
import "./Post.scss";
import { Button } from "react-bootstrap";
import axios from "axios";
import LogoTelemed from "../../Assets/Icons/logo-telemed.png";

const ref = React.createRef();

class PDF extends React.Component {
  constructor() {
    super();
    this.state = {
      activePacient: {},
      medicalRecords: [],
    };
  }

  componentDidMount = async () => {
    let id = this.props.match.params.id;

    try {
      let pacientData = await axios.get(
        `http://localhost:1337/medical-records?_where[id]=${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      this.setState({
        activePacient: pacientData.data[0].pacient,
        medicalRecords: pacientData.data[0].medrec,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="post-pdf jumbotron" ref={ref}>
          <img src={LogoTelemed} alt="logo-telemed" className="logo-telemed" />
          <p className="h2">Fișă Medicală</p>
          <p className="h6 mt-5">
            Subsemnatului {this.state.activePacient.username} i s-a generat în
            urma consulturilor efectuate pe Platforma de Telemedicina TeleMed
            următorul tabel,
          </p>
          <p className="h6">
            prezentând date referitoate la afecțiunile cu care a fost
            diagnosticat, precum și categoria de apartenență a celor din urmă.
          </p>
          <table class="table mt-3">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Categoria afecțiunii</th>
                <th scope="col">Descrierea afecțiunii</th>
              </tr>
            </thead>
            {this.state.medicalRecords.map((el, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{1 + index}</th>
                    <td>{el.category}</td>
                    <td>{el.affection}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <Pdf targetRef={ref} filename="Fișă-Medicală-TeleMed.pdf">
          {({ toPdf }) => (
            <Button
              variant="primary"
              className="btn-primary w-100 d-flex justify-content-center mb-3"
              onClick={toPdf}
            >
              Descarcă Fișa medicală ca PDF
            </Button>
          )}
        </Pdf>
      </>
    );
  }
}

export default PDF;
