import React, { Component } from "react";
// scss
import "./SignIn.scss";
// react-bootstrap
import { InputGroup, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
// svg
import { ReactComponent as LeftSideImage } from "../../Assets/Svg/undraw_medicine_b1ol.svg";
import Logo from "../../Assets/Icons/logo-telemed.png";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneMail } from "react-icons/ai";
// react-reveal
import Slide from "react-reveal/Slide";
// toast + axios
import { toast } from "react-toastify";
import axios from "axios";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  login = async () => {
    if (this.state.email === "" || this.state.password === "") {
      toast.error("Ati lasat campurile necompletate");
      return;
    }

    let obj = {
      identifier: this.state.email,
      password: this.state.password,
    };

    try {
      let response = await axios.post("http://localhost:1337/auth/local", obj);
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("userType", response.data.user.role.type);

        // localStorage.setItem('id', response.data.user.id);

        console.log(response.data);

        // if ( response.data.user.isProfesor === true )
        this.props.history.push(`/${response.data.user.role.type}-dashboard`);
      }
      toast.success("Te-ai conectat cu succes la cont");
    } catch (e) {
      switch (e.response.status) {
        case 400:
          toast.error("Email sau parola gresita");
          break;
        default:
          toast.error("S-a produs o eroare la logare");
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
    return (
      <div className="sign-in-page d-flex flex-column align-items-center">
        <img src={Logo} alt="logo-telemed" style={{ cursor: "Pointer" }} />
        <Slide bottom>
          <div className="content-container d-flex align-items-center justify-content-center mb-5">
            <div className="sign-in-box d-flex">
              <div className="left-side-sign-in w-50 d-flex justify-content-center align-items-center">
                <LeftSideImage className="left-side-image" />
              </div>
              <div className="right-side-sign-in w-50 p-3 d-flex flex-column justify-content-center align-items-center">
                <p className="font-nunito-bold font-color-white font-size-40">
                  Bine ai venit!
                </p>
                <div className="login-form-container">
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
                  <p
                    className="reset-password font-color-white font-size-14 mt-1"
                    onClick={() => this.props.history.push("/reseteaza-parola")}
                  >
                    Resetează parola
                  </p>
                  <div className="login-form-buttons-container mt-5 d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="btn-primary"
                      onClick={() => this.props.history.push("/creeaza-cont")}
                    >
                      Creează cont
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="btn-outline-primary ml-3"
                      onClick={this.login}
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

export default SignIn;
