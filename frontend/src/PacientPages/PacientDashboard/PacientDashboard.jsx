import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./PacientDashboard.scss";
// nav-components
import Header from "../PacientNavigation/Header/Header";
import SideDrawer from "../PacientNavigation/SideDrawer";
import Backdrop from "../PacientNavigation/Backdrop";
// pages-components
import Meeting from "../Meeting/Meeting";
import ScheduleMeeting from "../ScheduleMeeting/ScheduleMeeting";
import MedicalRecords from "../MedicalRecords/MedicalRecords";
import Medication from "../Medication/Medication";
import PacientProfile from "../PacientProfile/PacientProfile";
import PacientHomePage from "../PacientHomePage/PacientHomePage";

class PacientDashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      selectedPage: "PacientHomePage",
      sideDrawerOpen: false,
      highlightScheduleMeetingIcon: false,
      highlightMeeting: false,
      highlightMedicationIcon: false,
      highlightMedicalRecords: false,
      highlightPacientHomepage: true,
    };
  }

  setSelectedPage = (value) => {
    if (value === "ScheduleMeeting") {
      this.setState({
        selectedPage: value,
        highlightScheduleMeetingIcon: true,
        highlightMeeting: false,
        highlightMedicationIcon: false,
        highlightMedicalRecords: false,
        highlightPacientHomepage: false,
      });
    } else if (value === "Meeting") {
      this.setState({
        selectedPage: value,
        highlightScheduleMeetingIcon: false,
        highlightMeeting: true,
        highlightMedicationIcon: false,
        highlightMedicalRecords: false,
        highlightPacientHomepage: false,
      });
    } else if (value === "Medication") {
      this.setState({
        selectedPage: value,
        highlightScheduleMeetingIcon: false,
        highlightMeeting: false,
        highlightMedicationIcon: true,
        highlightMedicalRecords: false,
        highlightPacientHomepage: false,
      });
    } else if (value === "MedicalRecords") {
      this.setState({
        selectedPage: value,
        highlightScheduleMeetingIcon: false,
        highlightMeeting: false,
        highlightMedicationIcon: false,
        highlightMedicalRecords: true,
        highlightPacientHomepage: false,
      });
    } else if (value === "PacientProfile") {
      this.setState({
        selectedPage: value,
        highlightScheduleMeetingIcon: false,
        highlightMeeting: false,
        highlightMedicationIcon: false,
        highlightMedicalRecords: false,
        highlightPacientHomepage: false,
      });
    } else if (value === "PacientHomePage") {
      this.setState({
        selectedPage: value,
        highlightScheduleMeetingIcon: false,
        highlightMeeting: false,
        highlightMedicationIcon: false,
        highlightMedicalRecords: false,
        highlightPacientHomepage: true,
      });
    }
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  logout = () => {
    localStorage.clear();
    this.props.history.push("/");
    toast.success("Te-ai deconectat cu succes");
  };

  componentDidMount = async () => {
    const { history, location } = window;
    history.pushState(null, null, location.href);

    if (
      localStorage.getItem("jwt") === null ||
      localStorage.getItem("userType") !== "pacient"
    ) {
      this.props.history.push("/");
    }

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

  render() {
    let toRender = null;
    if (this.state.selectedPage === "Meeting") toRender = <Meeting />;
    if (this.state.selectedPage === "ScheduleMeeting")
      toRender = <ScheduleMeeting apointments={this.state.user.apointments} />;
    if (this.state.selectedPage === "MedicalRecords")
      toRender = <MedicalRecords />;
    if (this.state.selectedPage === "Medication") toRender = <Medication />;
    if (this.state.selectedPage === "PacientProfile")
      toRender = (
        <PacientProfile
          email={this.state.user.email}
          date={this.state.user.created_at}
        />
      );
    if (this.state.selectedPage === "PacientHomePage")
      toRender = <PacientHomePage />;

    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div className="pacient-dashboard">
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
          highlightScheduleMeetingIcon={this.state.highlightScheduleMeetingIcon}
          highlightMeeting={this.state.highlightMeeting}
          highlightMedicationIcon={this.state.highlightMedicationIcon}
          highlightMedicalRecords={this.state.highlightMedicalRecords}
          highlightPacientHomepage={this.state.highlightPacientHomepage}
        />
        {backdrop}
        <div className="content-container to-render-pages">{toRender}</div>
      </div>
    );
  }
}

export default PacientDashboard;
