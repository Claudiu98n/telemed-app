import React, { Component } from 'react';
// images
import Logo from '../../Assets/Icons/logo-telemed.png';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiTwotoneMail } from 'react-icons/ai';
// react-reveal
import Slide from 'react-reveal/Slide';
// scss
import './ResetPassword.scss';
// rsuite, react-bootstrap
import {InputGroup, Input} from 'rsuite';

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (value, event) => {
        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        return (
            <div className="reset-password-page d-flex flex-column align-items-center">
                <img src={Logo} alt="logo-telemed" style={{cursor: 'Pointer'}} onClick={() => this.props.history.push('/')} />
                <Slide bottom>
                    <div className="content-container d-flex align-items-center justify-content-center mb-5">
                        <div className="reset-password-box d-flex flex-column">
                            <p className="font-size-40 font-nunito-bold">Resetează parola contului</p>
                            <InputGroup className="group-input mt-2">
                                <InputGroup.Addon>
                                    <AiTwotoneMail />
                                </InputGroup.Addon>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Adresa de email"
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange}
                                />
                            </InputGroup>  
                        </div>
                    </div>
                </Slide>
            </div>
        )
    }
}

export default ResetPassword;