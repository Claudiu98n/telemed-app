import React, { Component } from 'react'
import { toast } from 'react-toastify';

class PacientDashboard extends Component {

    componentDidMount() {
        // const { history, location } = window;
        // history.pushState(null, null, location.href);
        if(localStorage.getItem('jwt') === null) {
            this.props.history.push('/');
        }
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
        toast.success('Te-ai deconectat cu succes');
    }

    render() {
        return (
            <div onClick={this.logout}>
                pacient
            </div>
        )
    }
}

export default PacientDashboard;