import React from 'react';
import './Error404.scss';
import {Button} from 'react-bootstrap';
import {ReactComponent as Err404} from '../Assets/Svg/404.svg';
import {withRouter} from 'react-router-dom';

function Error404(props) {
    return (
        <div className="error-404-page">
            <div className="content-container d-flex flex-column justify-content-center align-items-center">
                <p className="font-size-40 font-weight-bold text-center">Uuups... Se pare că pagina pe care încerci</p>
                <p className="font-size-40 font-weight-bold text-center">să o accesezi nu există</p>
                <Err404 className="error-image" alt="error-404"/>
                <Button variant="primary" className="btn-primary" onClick={() => props.history.push('/')}>Go to homepage</Button>
            </div>
        </div>
    )
}

export default withRouter(Error404);