import React from 'react';
import { handleLogin } from '../redux/actions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import '../App.css';
import User from './User';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCar} from '@fortawesome/free-solid-svg-icons';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginOnClick = this.handleLoginOnClick.bind(this);
    }

    handleLoginOnClick = () => {
        console.log("Login clicked");
        this.props.dispatch(handleLogin(true));
    };



    render() {
        return (
            <Container fluid="md" className="Header-margin">
                <Navbar bg="primary" variant="dark" fixed="top">
                    <Navbar.Brand href="/home"><FontAwesomeIcon icon={faCar} />HireWheels</Navbar.Brand>
                    <span className="spacer"></span>
                    {this.props.firstName === undefined ?
                        <Nav className="mr-auto ">
                            <div className="Signin-Nav">
                                <Button onClick={this.handleLoginOnClick}>Signin</Button>
                            </div>
                        </Nav> : <User firstName={this.props.firstName}
                            roleName={this.props.roleName}
                            walletMoney={this.props.walletMoney} />
                    }

                </Navbar>
            </Container>
        );
    }
}

export default connect(
    (state) => {
        let { firstName, roleName, walletMoney } = state.login;
        return { firstName, roleName, walletMoney };
    }
)(NavBar);