import React, { Component } from 'react';
import './DoctorHomePage.scss';
import {ReactComponent as DoctorHomepageIcon} from '../../Assets/Svg/undraw_doctors_hwty.svg';
class DoctorHomePage extends Component {
    render() {
        return (
            <div className="doctor-homepage d-flex flex-column justify-content-center align-items-center h-100">
                <p className="h1 mb-3 text-center font-nunito-bold">Bine ați venit!</p>
                <DoctorHomepageIcon className="doctor-homepage-icon mb-1"/>
                <p className="underlined-description font-nunito-light small">Doctor account</p>
            </div>
        )
    }
}

export default DoctorHomePage;