import React, { Component } from "react";
// style
import "./SideDrawer.scss";
// components
import Logo from "../../Assets/Icons/logo-telemed.png";
import { CgClose } from "react-icons/cg";
import { IoLogOutSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GiVideoConference } from "react-icons/gi";
import { RiHomeSmileFill } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";

const SideDrawer = (props) => {
  return (
    <nav className={`side-drawer p-3 ${props.show && "open"}`}>
      <div className="d-flex justify-content-between align-items-center">
        <img src={Logo} alt="logo" className="logo side-drawer-logo" />
        <CgClose className="side-drawer-close" onClick={() => props.close()} />
      </div>
      <div className="d-flex flex-column justify-content-center mt-5 navigation-elements">
        <div
          className="menu-item"
          onClick={() => {
            props.close();
            props.setSelectedPage("DoctorHomePage");
          }}
        >
          <RiHomeSmileFill
            className={props.highlightDoctorHomepage ? "active-icon" : "icon"}
          />
          <p
            className={`font-nunito-bold ${
              props.highlightDoctorHomepage && "active-description-icon"
            }`}
          >
            Acasă
          </p>
        </div>

        <div
          className="menu-item"
          onClick={() => {
            props.close();
            props.setSelectedPage("DoctorApointments");
          }}
        >
          <AiFillSchedule
            className={props.highlightDoctorApointments ? "active-icon" : "icon"}
          />
          <p
            className={`font-nunito-bold ${
              props.highlightDoctorApointments && "active-description-icon"
            }`}
          >
            Programări
          </p>
        </div>

        <div
          className="menu-item"
          onClick={() => {
            props.close();
            props.setSelectedPage("Meeting");
          }}
        >
          <GiVideoConference
            className={props.highlightMeeting ? "active-icon" : "icon"}
          />
          <p className={props.highlightMeeting && "active-description-icon"}>
            Consult
          </p>
        </div>

        <div
          className="menu-item"
          onClick={() => {
            props.close();
            props.setSelectedPage("PacientsList");
          }}
        >
          <IoIosPeople
            className={props.highlightPacientsList ? "active-icon" : "icon"}
          />
          <p
            className={`font-nunito-bold ${
              props.highlightPacientsList && "active-description-icon"
            }`}
          >
            Pacienți
          </p>
        </div>
        <div
          className="logout-container d-flex align-items-center"
          onClick={props.logout}
        >
          <IoLogOutSharp className="logout-icon" />
          <span className="ml-1 font-nunito-bold">Delogare</span>
        </div>
      </div>
    </nav>
  );
};

export default SideDrawer;
