import React, { Component } from 'react';
// style
import './SideDrawer.scss';
// components
import { Icon } from "rsuite";
import Logo from '../../Assets/Icons/logo-telemed.png';
import {CgClose} from 'react-icons/cg';

const SideDrawer = (props) => {
    return (
      <nav className={`side-drawer p-3 ${props.show ? 'open' : null}`}>
        <div className='d-flex justify-content-between align-items-center'>
          <img src={Logo} alt="logo" className='logo side-drawer-logo' />
          <CgClose className='side-drawer-close' onClick={() =>  props.close()} />
        </div>
         <div className="d-flex flex-column justify-content-center mt-5 navigation-elements">
            <div
              className="menu-item"
              onClick={() => {
                props.close();
                props.setSelectedPage("Meeting");
              }}
            >
              {/* <Icon
                className={
                  props.highlightCalendarIcon ? "active-icon" : "icon"
                }
                icon="calendar"
              /> */}
              <p
                // className={
                //   props.highlightCalendarIcon && "active-description-icon"
                // }
              >
                Meeting
              </p>
            </div>
            
            <div
              className="menu-item"
              onClick={() => {
                props.close();
                props.setSelectedPage("PacientsList");
              }}
            >
              {/* <Icon
                className={
                  props.highlightAcasaIcon ? "active-icon" : "icon"
                }
                icon="home"
              /> */}
              <p
                // className={
                //  `font-nunito-bold ${props.highlightAcasaIcon && "active-description-icon"}`
                // }
              >
                Lista Pacienților
              </p>
            </div>
          </div>
      </nav>
    )
  
}

export default SideDrawer
