import React, { Component, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "react-loader-spinner";
import "./App.scss";

// import Error404 from "./Pages/error404/Error404";
import VerifyDoctor from "./Onboarding/VerifyDoctor/VerifyDoctor";

const SignIn = lazy(() => import("./Onboarding/SignIn/SignIn"));
const SignUp = lazy(() => import("./Onboarding/SignUp/SignUp"));
const ResetPassword = lazy(() => import("./Onboarding/ResetPassword/ResetPassword"));
const SelectType = lazy(() => import("./Onboarding/SelectType/SelectType"));
const DoctorDashboard = lazy(() => import("./DoctorPages/DoctorDashboard/DoctorDashboard"));
const PacientDashboard = lazy(() => import("./PacientPages/PacientDashboard/PacientDashboard"));
const Pdf = lazy(() => import("./PacientPages/GeneratePdf/Pdf"));

class App extends Component {
  render() {
    return (
      <div className="Telemed-App">
        <Router>
          <Suspense
            fallback={
              <Loader
                className="loader"
                type="Bars"
                color="#962DAF"
                height={80}
                width={80}
                timeout={3000}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            }
          >
            <ToastContainer />
            <Switch>
              <Route path="/" exact component={SignIn} />
              <Route path="/creeaza-cont" exact component={SignUp} />
              <Route path="/reseteaza-parola" exact component={ResetPassword} />
              <Route path="/selecteaza-tipul" exact component={SelectType} />
              <Route path="/verificare-suplimentara" exact component={VerifyDoctor} />
              <Route path="/doctor-dashboard" exact component={DoctorDashboard} />
              <Route path="/pacient-dashboard" exact component={PacientDashboard} />
              <Route path="/generează-pdf/:id" exact component={Pdf} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
