import React, { Component } from 'react';
// style
import './DoctorDashboard.scss'
// import { toast } from 'react-toastify';
// nav-components
import SideDrawer from '../DoctorNavigation/SideDrawer';
import Backdrop from '../DoctorNavigation/Backdrop';
import Header from '../DoctorNavigation/Header/Header';
// pages-components
import Meeting from '../Meeting/Meeting';
import ScheduleMeeting from '../ScheduleMeeting/ScheduleMeeting';
import MedicalRecords from '../MedicalRecords/MedicalRecords';
import Medication from '../Medication/Medication';

class DoctorDashboard extends Component {
  constructor() {
    super();
    this.state={
      selectedPage: 'ScheduleMeeting',
      userType: '',
      loading : false,
      sideDrawerOpen: false,
    };
  }

  // componentDidMount() {
  //   // const { history, location } = window;
  //   // history.pushState(null, null, location.href);
  //   if(localStorage.getItem('jwt') === null) {
  //       this.props.history.push('/');
  //   }
  // }

  // logout = () => {
  //     localStorage.clear();
  //     this.props.history.push('/');
  //     toast.success('Te-ai deconectat cu succes');
  // }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  setSelectedPage = (value) => {
    if (value === 'ScheduleMeeting') {
      this.setState({
        selectedPage: value,
      });
    } else if (value === 'Meeting') {
        this.setState({
            selectedPage: value,
        });
    } else if (value === 'Medication') {
        this.setState({
            selectedPage: value,
        });
    } else if (value === 'MedicalRecords') {
        this.setState({
            selectedPage: value,
        });
    }
  };

  render() {
    if ( this.state.loading === true )
    return <p> Se incarca... </p>
    let toRender = null ;
    if (this.state.selectedPage === 'ScheduleMeeting')
      toRender = <ScheduleMeeting/>;
    if (this.state.selectedPage === 'Meeting')
      toRender = <Meeting/>;
    if (this.state.selectedPage === 'Medication')
      toRender = <Medication/>;
    if (this.state.selectedPage === 'MedicalRecords')
      toRender = <MedicalRecords/>;

    let backdrop;
    if(this.state.sideDrawerOpen) {
        backdrop =  <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <div className="dashboard">
        <Header 
          drawerToggleClickHandler={this.drawerToggleClickHandler} 
          setSelectedPage={this.setSelectedPage}
        />
        <SideDrawer
          show={this.state.sideDrawerOpen}
          close={this.backdropClickHandler}
          selectedPage={this.state.selectedPage}
          setSelectedPage={this.setSelectedPage}
        />

        {backdrop}
        <div className="to-render-pages">
          {toRender}
        </div>
      </div>
    )
  }
}

export default DoctorDashboard;
