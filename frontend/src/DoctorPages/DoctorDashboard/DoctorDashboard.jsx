import React, { Component } from "react";
// style
import "./DoctorDashboard.scss";
import { toast } from "react-toastify";
import axios from "axios";
// nav-components
import SideDrawer from "../DoctorNavigation/SideDrawer";
import Backdrop from "../DoctorNavigation/Backdrop";
import Header from "../DoctorNavigation/Header/Header";
// pages-components
import DoctorMeeting from "../DoctorMeeting/DoctorMeeting";
import DoctorPacientsList from "../DoctorPacientsList/DoctorPacientsList";
import DoctorHomePage from "../DoctorHomePage/DoctorHomePage";
import DoctorApointments from "../DoctorApointments/DoctorApointments";
import DoctorProfile from "../DoctorProfile/DoctorProfile";

class DoctorDashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedPage: "DoctorHomePage",
      user: {},
      loading: false,
      sideDrawerOpen: false,
      highlightMeeting: false,
      highlightPacientsList: false,
      highlightDoctorHomepage: true,
      highlightDoctorApointments: false,
    };
  }

  componentDidMount = async () => {
    const { history, location } = window;
    history.pushState(null, null, location.href);
    if (
      localStorage.getItem("jwt") === null ||
      localStorage.getItem("userType") !== "doctor"
    ) {
      this.props.history.push("/");
    }

    this.refreshContent();

    setInterval(this.refreshContent, 10000);
  };

  refreshContent = async () => {
    try {
      let userInfo = await axios.get("http://localhost:1337/identifyUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      this.setState({
        user: userInfo.data,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  logout = () => {
    localStorage.clear();
    this.props.history.push("/");
    toast.success("Te-ai deconectat cu succes");
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  setSelectedPage = (value) => {
    if (value === "Meeting") {
      this.setState({
        selectedPage: value,
        highlightMeeting: true,
        highlightPacientsList: false,
        highlightDoctorHomepage: false,
        highlightDoctorApointments: false,
      });
    } else if (value === "PacientsList") {
      this.setState({
        selectedPage: value,
        highlightMeeting: false,
        highlightPacientsList: true,
        highlightDoctorHomepage: false,
        highlightDoctorApointments: false,
      });
    } else if (value === "DoctorHomePage") {
      this.setState({
        selectedPage: value,
        highlightMeeting: false,
        highlightPacientsList: false,
        highlightDoctorHomepage: true,
        highlightDoctorApointments: false,
      });
    } else if (value === "DoctorApointments") {
      this.setState({
        selectedPage: value,
        highlightMeeting: false,
        highlightPacientsList: false,
        highlightDoctorHomepage: false,
        highlightDoctorApointments: true,
      });
    } else if (value === "DoctorProfile") {
      this.setState({
        selectedPage: value,
        highlightMeeting: false,
        highlightPacientsList: false,
        highlightDoctorHomepage: false,
        highlightDoctorApointments: false,
      });
    }
  };

  render() {
    console.log(this.state);
    if (this.state.loading === true) return <p> Se incarca... </p>;
    let toRender = null;
    if (this.state.selectedPage === "Meeting")
      toRender = (
        <DoctorMeeting
          userId={this.state.user.id}
          apoints={this.state.user.apoints}
          username={this.state.user.username}
        />
      );
    if (this.state.selectedPage === "PacientsList")
      toRender = <DoctorPacientsList />;
    if (this.state.selectedPage === "DoctorHomePage")
      toRender = <DoctorHomePage />;
    if (this.state.selectedPage === "DoctorApointments")
      toRender = (
        <DoctorApointments
          apointments={this.state.user.apoints}
          refresh={this.refreshContent}
        />
      );
    if (this.state.selectedPage === "DoctorProfile")
      toRender = (
        <DoctorProfile
          username={this.state.user.username}
          email={this.state.user.email}
          date={this.state.user.created_at}
        />
      );

    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div className="doctor-dashboard">
        <Header
          drawerToggleClickHandler={this.drawerToggleClickHandler}
          setSelectedPage={this.setSelectedPage}
        />
        <SideDrawer
          show={this.state.sideDrawerOpen}
          close={this.backdropClickHandler}
          selectedPage={this.state.selectedPage}
          setSelectedPage={this.setSelectedPage}
          logout={this.logout}
          highlightMeeting={this.state.highlightMeeting}
          highlightPacientsList={this.state.highlightPacientsList}
          highlightDoctorHomepage={this.state.highlightDoctorHomepage}
          highlightDoctorApointments={this.state.highlightDoctorApointments}
        />

        {backdrop}
        <div className="content-container to-render-pages">{toRender}</div>
      </div>
    );
  }
}

export default DoctorDashboard;
