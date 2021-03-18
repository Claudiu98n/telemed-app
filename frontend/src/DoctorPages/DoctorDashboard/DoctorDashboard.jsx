import React, { Component } from 'react';
// style
import './DoctorDashboard.scss'
import { toast } from 'react-toastify';
// nav-components
import SideDrawer from '../DoctorNavigation/SideDrawer';
import Backdrop from '../DoctorNavigation/Backdrop';
import Header from '../DoctorNavigation/Header/Header';
// pages-components
import Meeting from '../Meeting/Meeting';
import PacientsList from '../PacientsList/PacientsList';
import DoctorHomePage from '../DoctorHomePage/DoctorHomePage';

class DoctorDashboard extends Component {
  constructor() {
    super();
    this.state={
      selectedPage: 'DoctorHomePage',
      userType: '',
      loading : false,
      sideDrawerOpen: false,
      highlightMeeting: false,
      highlightPacientsList: false,
      highlightDoctorHomepage: true,
    };
  }

  // componentDidMount() {
  //   // const { history, location } = window;
  //   // history.pushState(null, null, location.href);
  //   if(localStorage.getItem('jwt') === null) {
  //       this.props.history.push('/');
  //   }
  // }

  logout = () => {
      localStorage.clear();
      this.props.history.push('/');
      toast.success('Te-ai deconectat cu succes');
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  setSelectedPage = (value) => {
    if (value === 'Meeting') {
      this.setState({
        selectedPage: value,
        highlightMeeting: true,
        highlightPacientsList: false,
        highlightDoctorHomepage: false,
      });
    } else if (value === 'PacientsList') {
        this.setState({
            selectedPage: value,
            highlightMeeting: false,
            highlightPacientsList: true,
            highlightDoctorHomepage: false,
        });    
    } else if (value === 'DoctorHomePage') {
      this.setState({
          selectedPage: value,
          highlightMeeting: false,
          highlightPacientsList: false,
          highlightDoctorHomepage: true,
      });    
    }
  };

  render() {
    if ( this.state.loading === true )
    return <p> Se incarca... </p>
    let toRender = null ;
    if (this.state.selectedPage === 'Meeting')
      toRender = <Meeting/>;
    if (this.state.selectedPage === 'PacientsList')
      toRender = <PacientsList/>;
    if (this.state.selectedPage === 'DoctorHomePage')
      toRender = <DoctorHomePage/>;

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
          logout={this.logout}
          highlightMeeting={this.state.highlightMeeting}
          highlightPacientsList={this.state.highlightPacientsList}
          highlightDoctorHomepage={this.state.highlightDoctorHomepage}
        />

        {backdrop}
        <div className="content-container to-render-pages">
          {toRender}
        </div>
      </div>
    )
  }
}

export default DoctorDashboard;
