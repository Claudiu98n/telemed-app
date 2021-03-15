import React, { Component } from 'react'
// scss
import './SignIn.scss';
// rsuite, react-bootstrap
import { Input, InputGroup } from 'rsuite';
import { Button } from 'react-bootstrap';
// svg
import { ReactComponent as LeftSideImage } from '../../Assets/Svg/undraw_medicine_b1ol.svg';
import Logo from '../../Assets/Icons/logo-telemed.png';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiTwotoneMail } from 'react-icons/ai';

class SignIn extends Component {
    render() {
        return (
            <div className="sign-in-page d-flex flex-column align-items-center">
                <img src={Logo} alt="logo-telemed" />
                <div className="content-container d-flex align-items-center justify-content-center mb-5">
                    <div className="sign-in-box d-flex">
                        <div className="left-side-sign-in w-50 d-flex justify-content-center align-items-center">
                            <LeftSideImage className="left-side-image" />
                        </div>
                        <div className="right-side-sign-in w-50 p-5 d-flex flex-column justify-content-center align-items-center">
                            <p className="font-nunito-bold font-color-white font-size-40">Bine ai venit!</p>
                            <div className="login-form-container">
                            <InputGroup className="group-input">
                                <InputGroup.Addon>
                                    <AiTwotoneMail />
                                </InputGroup.Addon>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Adresa de email"
                                />
                            </InputGroup>                                
                            <InputGroup className="group-input mt-3">
                                <InputGroup.Addon>
                                    <RiLockPasswordFill />
                                </InputGroup.Addon>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Parola"
                                />
                            </InputGroup>        
                                <div className="login-form-buttons-container mt-5 d-flex justify-content-center">
                                    <Button variant="primary" className="btn-primary">Creează cont</Button>
                                    <Button variant="outline-primary" className="btn-outline-primary ml-3">Logare</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;
