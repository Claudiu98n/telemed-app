import React, { Component } from 'react';
import './PacientHomePage.scss';
import {ReactComponent as PacientHomepageIcon} from '../../Assets/Svg/undraw_begin_chat_c6pj.svg';

class PacientHomePage extends Component {
    render() {
        return (
            <div className="pacient-homepage d-flex flex-column justify-content-center align-items-center h-100">
                <p className="h1 mb-3 text-center font-nunito-bold">Bine ați venit!</p>
                <PacientHomepageIcon className="pacient-homepage-icon mb-1"/>
                <p className="underlined-description font-nunito-light small">Pacient account</p>
            </div>
        )
    }
}

export default PacientHomePage;