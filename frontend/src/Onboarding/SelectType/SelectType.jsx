import React, { Component } from 'react';
// images
import Logo from '../../Assets/Icons/logo-telemed.png';
import Doctor from '../../Assets/Images/doctor-character.jpg';
import Pacient from '../../Assets/Images/pacient-character-2.jpg';
// react-reveal
import Slide from 'react-reveal/Slide';
// rsuite, react-bootstrap
import { Row, Col } from 'react-bootstrap';
// scss
import './SelectType.scss';

class SelectType extends Component {
    render() {
        return (
            <div className="select-type-page d-flex flex-column align-items-center">
                <img src={Logo} alt="logo-telemed" style={{cursor: 'Pointer'}} onClick={() => this.props.history.push('/')} />
                <Slide bottom>
                    <div className="content-container d-flex align-items-center justify-content-center mb-5">
                        <div className="select-type-box d-flex flex-column align-items-center w-100">
                            <p className="font-size-40 font-nunito-bold text-center">Alege tipul contului</p>
                            <Row className="mt-4">
                                <Col className="col-select d-flex flex-column">
                                    <div className="select-container">
                                        <img src={Doctor} alt="doctor" className="character-image" />
                                        <p className="w-100 text-center font-nunito-bold">Doctor</p>
                                    </div>
                                </Col>
                                <Col className="col-select d-flex flex-column align-items-center">
                                    <div className="select-container">
                                        <img src={Pacient} alt="doctor" className="character-image" />
                                        <p className="w-100 text-center font-nunito-bold">Pacient</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Slide>
            </div>
        )
    }
}

export default SelectType;