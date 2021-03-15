import React, { Component, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "react-loader-spinner";
import "./App.scss";
// import Footer from "./Common/Footer/Footer";
// import Navbar from "./Common/Navigation/Navbar";
// import Error404 from "./Pages/error404/Error404";

const SignIn = lazy(() => import("./Pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));

// const SinglePost = lazy(() => import("./Pages/SinglePost/SinglePostPage"));

class App extends Component {
  render() {
    return (
      <div className="Telemed-App">
        <Router>
          {/* <Navbar /> */}
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
              <Route path="/" exact component={SignIn}></Route>
              <Route path="/creeaza-cont" exact component={SignUp}></Route>
            </Switch>
          </Suspense>
          {/* <Footer /> */}
        </Router>
      </div>
    );
  }
}

export default App;
