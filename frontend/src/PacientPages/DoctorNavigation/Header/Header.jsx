import React, { Component } from 'react';
// style
import './Header.scss';
// components
import {Row, Col} from 'react-bootstrap';
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaUserAlt} from 'react-icons/fa';

class Header extends Component {
  render() {
    return (
      <header id='header' className='container-fluid'>
        <div className='header-container'>
        <Row className='align-items-center'>
          <Col  className='d-flex justify-content-start'>
            <GiHamburgerMenu 
              id='menu-icon'
              className='mr-4' 
              onClick={() => this.props.drawerToggleClickHandler()} 
            />
          </Col>
          <Col className='d-flex justify-content-end'>
            <div className='user-icon-container' onClick={() => this.props.setSelectedPage("")}>
              <FaUserAlt />
            </div>
          </Col>
        </Row>
        </div>
      </header>
    )
  }
}

export default Header
