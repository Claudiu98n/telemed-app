import React, { Component } from "react";
// images
import Logo from "../../Assets/Icons/logo-telemed.png";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneMail } from "react-icons/ai";
// react-reveal
import Slide from "react-reveal/Slide";
// scss
import "./ResetPassword.scss";
// react-bootstrap
import { InputGroup, FormControl } from "react-bootstrap";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.ariaLabel]: event.target.value,
    });
  };

  render() {
    return (
      <div className="reset-password-page d-flex flex-column align-items-center">
        <img
          src={Logo}
          alt="logo-telemed"
          style={{ cursor: "Pointer" }}
          onClick={() => this.props.history.push("/")}
        />
        <Slide bottom>
          <div className="content-container d-flex align-items-center justify-content-center mb-5">
            <div className="reset-password-box d-flex flex-column">
              <p className="font-size-40 font-nunito-bold">
                Resetează parola contului
              </p>
              <InputGroup className="group-input">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <AiTwotoneMail />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="email"
                  placeholder="Adresa de email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  onChange={this.handleChange}
                />
              </InputGroup>
              <InputGroup className="group-input mt-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <RiLockPasswordFill />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="password"
                  placeholder="Parola"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  onChange={this.handleChange}
                />
              </InputGroup>
            </div>
          </div>
        </Slide>
      </div>
    );
  }
}

export default ResetPassword;
