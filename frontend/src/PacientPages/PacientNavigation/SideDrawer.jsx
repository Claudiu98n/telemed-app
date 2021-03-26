import React, { Component } from "react";
// style
import "./SideDrawer.scss";
// components
import Logo from "../../Assets/Icons/logo-telemed.png";
import { CgClose } from "react-icons/cg";
import { AiFillSchedule } from "react-icons/ai";
import { GiVideoConference } from "react-icons/gi";
import { FaLaptopMedical } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { RiHomeSmileFill } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";

const SideDrawer = (props) => {
  return (
    <nav className={`side-drawer p-3 ${props.show ? "open" : null}`}>
      <div className="d-flex justify-content-between align-items-center">
        <img src={Logo} alt="logo" className="logo side-drawer-logo" />
        <CgClose className="side-drawer-close" onClick={() => props.close()} />
      </div>
      <div className="d-flex flex-column justify-content-center mt-5 navigation-elements">
        <div
          className="menu-item"
          onClick={() => {
            props.close();
            props.setSelectedPage("PacientHomePage");
          }}
        >
          <RiHomeSmileFill
            className={props.highlightPacientHomepage ? "active-icon" : "icon"}
          />
          <p
            className={`font-nunito-bold ${
              props.highlightPacientHomepage && "active-description-icon"
            }`}
          >
            Acasă
          </p>
        </div>

        <div
          className="menu-item"
          onClick={() => {
            props.close();
            props.setSelectedPage("ScheduleMeeting");
          }}
        >
          <AiFillSchedule
            className={
              props.highlightScheduleMeetingIcon ? "active-icon" : "icon"
            }
          />
          <p
            className={`font-nunito-bold ${
              props.highlightScheduleMeetingIcon && "active-description-icon"
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
            props.setSelectedPage("Medication");
          }}
        >
          <FaLaptopMedical
            className={props.highlightMedicationIcon ? "active-icon" : "icon"}
          />
          <p
            className={`font-nunito-bold ${
              props.highlightMedicationIcon && "active-description-icon"
            }`}
          >
            Medicamente
          </p>
        </div>

        <div
          className="menu-item"
          onClick={() => {
            props.close();
            props.setSelectedPage("MedicalRecords");
          }}
        >
          <IoDocuments
            className={props.highlightMedicalRecords ? "active-icon" : "icon"}
          />
          <p
            className={
              props.highlightMedicalRecords && "active-description-icon"
            }
          >
            Fișă Medicală
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
