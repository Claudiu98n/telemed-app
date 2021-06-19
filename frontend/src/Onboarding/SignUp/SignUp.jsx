import React, { Component } from "react";
// scss
import "./SignUp.scss";
// react-bootstrap
import { FormControl, InputGroup, Button } from "react-bootstrap";
// svg
import { ReactComponent as LeftSideImage } from "../../Assets/Svg/undraw_medical_care_movn.svg";
import Logo from "../../Assets/Icons/logo-telemed.png";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneMail } from "react-icons/ai";
// react-reveal
import Slide from "react-reveal/Slide";
// axios
import axios from "axios";
// react-toastify
import { toast } from "react-toastify";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      pressed: false,
    };
  }

  isPasswordOk = () => {
    if (this.state.password !== this.state.confirmPassword) {
      return false;
    }
    return true;
  };

  createAccount = async () => {
    this.setState({
      pressed: true,
    });

    if (
      this.state.username === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      toast.error("Ati lasat campuri necompletate");
      return;
    }

    if (this.isPasswordOk() === false) {
      toast.error("Cele doua parole nu sunt identice");
      return;
    }

    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      toast.error("Email-ul nu are format corespunzător");
      return;
    }

    let toSend = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    try {
      let response = await axios.post(
        "http://localhost:1337/auth/local/register",
        toSend
      );
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("jwt", response.data.jwt);
        // localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("userType", undefined);
        this.props.history.push("/selecteaza-tipul");
      }

      toast.success("Contul a fost creat cu succes");
    } catch (e) {
      switch (e.response.status) {
        // case 400:
        //   toast.error("Email sau parola gresita");
        //   break;

        default:
          toast.error("S-a produs o eroare la crearea contului");
          break;
      }
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.ariaLabel]: event.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="sign-up-page d-flex flex-column align-items-center">
        <img
          src={Logo}
          alt="logo-telemed"
          style={{ cursor: "Pointer" }}
          onClick={() => this.props.history.push("/")}
        />
        <Slide bottom>
          <div className="content-container d-flex align-items-center justify-content-center mb-5">
            <div className="sign-up-box d-flex flex-row-reverse">
              <div className="left-side-sign-up w-50 d-flex justify-content-center align-items-center">
                <LeftSideImage className="left-side-image" />
              </div>
              <div className="right-side-sign-up w-50 p-3 p-md-3 d-flex flex-column justify-content-center align-items-center">
                <p className="font-nunito-bold font-color-white font-size-40">
                  Creează un cont!
                </p>
                <div className="sign-up-form-container">
                  <InputGroup className="group-input">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <AiTwotoneMail />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="text"
                      placeholder="Nume complet"
                      aria-label="username"
                      aria-describedby="basic-addon1"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="group-input mt-3">
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
                  <InputGroup className="group-input mt-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <RiLockPasswordFill />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="password"
                      placeholder="Confirmă parola"
                      aria-label="confirmPassword"
                      aria-describedby="basic-addon1"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <div className="sign-up-form-buttons-container mt-5 d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="btn-primary"
                      onClick={this.createAccount}
                    >
                      Creează cont
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="btn-outline-primary ml-3"
                      onClick={() => this.props.history.push("/")}
                    >
                      Autentificare
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </div>
    );
  }
}

export default SignUp;
