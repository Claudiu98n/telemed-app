import React, { Component } from 'react'
import {ReactComponent as VerifyDoctorSvg} from '../../Assets/Svg/undraw_QA_engineers_dg5p.svg';
import './VerifyDoctor.scss';

class VerifyDoctor extends Component {
    render() {
        return (
            <div className="verify d-flex flex-column justify-content-center align-items-center">
                <p className="font-nunito-bold">Din motive de securitate, contul de doctor va fi activat după o vericiare suplimentară.</p>
                <p className="font-nunito-bold" >Trimiteți actele necesare la mail-ul <a href="mailto:contact-telemed@gmail.com">contact-telemed@gmail.com</a></p>
                <VerifyDoctorSvg className="verify-image"/>
            </div>
        )
    }
}

export default VerifyDoctor;