import React, { Component } from 'react';
// jutsu
import { Jutsu } from 'react-jutsu';
// react-bootstrap
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// scss
import './DoctorMeeting.scss';

class DoctorMeeting extends Component {
    constructor() {
        super();
        this.state = {
            room: '',
            name: '',
            call: false,
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick = (event) => {
        event.preventDefault();
        if( this.state.room && this.state.name ) {
            this.setState({
                call: true
            });
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="doctor-meeting-page">
                <p className="h1 text-center font-nunito-bold">Creează un consult</p>
                <div className="doctor-meeting d-flex align-items-center justify-content-center">
                    {
                    this.state.call
                    ?   (
                        <Jutsu
                            roomName={this.state.room}
                            displayName={this.state.name}
                            password={this.state.password}
                            onMeetingEnd={() => console.log('Meeting has ended')}
                            loadingComponent={<p>Se încarcă ...</p>}
                            errorComponent={<p>Oops, a apărut o eroare.</p>} />
                        ) : (
                        <form className="w-50 d-flex flex-column justify-content-center align-items-center">
                        <FormControl id='room' type='text' name="room" placeholder='Cameră' value={this.state.room} onChange={this.handleChange} />
                        <FormControl id='name' type='text' name="name" placeholder='Nume' value={this.state.name} onChange={this.handleChange} />
                        <FormControl id='password' type='text' name="password" placeholder='Parolă (opțional)' value={this.state.password} onChange={this.handleChange} />
                        <Button variant="primary" className="btn-primary mt-3" onClick={this.handleClick} type='submit'>
                            Start / Join
                        </Button>
                        </form>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default DoctorMeeting;