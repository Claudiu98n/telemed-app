import React, { Component } from 'react';
// style
import './DoctorDashboard.scss'
// nav-components
import SideDrawer from '../DoctorNavigation/SideDrawer';
import Backdrop from '../DoctorNavigation/Backdrop';
import Header from '../DoctorNavigation/Header/Header';
// pages-components
import Meeting from '../Meeting/Meeting';
import PacientsList from '../PacientsList/PacientsList';

class DoctorDashboard extends Component {
  constructor() {
    super();
    this.state={
      selectedPage: 'Meeting',
      userType: '',
      loading : false,
      sideDrawerOpen: false,
    };
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
      });
    } else if (value === 'PacientsList') {
        this.setState({
            selectedPage: value,
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
