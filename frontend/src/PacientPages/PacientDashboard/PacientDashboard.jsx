import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";

class PacientDashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
      apointments: [],
    };
  }

  componentDidMount() {
    const { history, location } = window;
    history.pushState(null, null, location.href);
    if (
      localStorage.getItem("jwt") === null ||
      localStorage.getItem("userType") === "undefined" ||
      localStorage.getItem("userType") === "doctor"
    ) {
      this.props.history.push("/");
    }
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/");
    toast.success("Te-ai deconectat cu succes");
  };

  componentDidMount = async () => {
    try {
      let userInfo = await axios.get("http://localhost:1337/identifyUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      this.setState({
        user: userInfo.data,
        loading: false,
        apointments: userInfo.data.apointments
      });
    } catch (e) {
      console.log(e);
    }
  };

  makeApointment = async () => {
    let response = await axios.post(
      "http://localhost:1337/createApointment",
      {
        Data: "marti la 5",
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );

    console.log(response.data);
  };

  render() {
    // onClick={this.makeApointment}

    console.log(this.state);
    return (
      <div onClick={this.makeApointment}
      >
        <div onClick={this.logout}>pacient</div>
        {this.state.apointments.map((el, index) => {
          return (
            <div 
              key={index}
              className="mt-5 mt-5"
              style={{ background: "black", color: "white" }}
            >
              {el.Data}
            </div>
          );
        })}
      </div>
    );
  }
}

export default PacientDashboard;
