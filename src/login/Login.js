import React from 'react';
import Modal from 'react-bootstrap/Modal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import { handleLogin } from '../redux/actions';
import Button from 'react-bootstrap/Button';
import '../App.css';

class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoginOpen: props.isLoginOpen,
            isLoginSelected: true,
            isSignUpSelected: false
        };
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleLoginSelect = this.handleLoginSelect.bind(this);
        this.handleSignUpSelect = this.handleSignUpSelect.bind(this);
    }

    handleOnClose = () => {
        this.props.handleLogin(false);
    }

    handleLoginSelect = () => {
        this.setState(prevState => {
            return { ...prevState, isLoginSelected: true, isSignUpSelected: false }
        });
    }

    handleSignUpSelect = () => {
        this.setState((prevState) => {
            return { ...prevState, isLoginSelected: false, isSignUpSelected: true }
        });
    }

    render() {
        let { isLoginOpen, isLoginSelected, isSignUpSelected } = this.state;
        return <div>
            <Modal show={isLoginOpen} onHide={this.handleOnClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>
                        <Button variant={isLoginSelected ? "dark" : "light"} onClick={this.handleLoginSelect} block>Login</Button>
                        <Button variant={isSignUpSelected ? "dark" : "light"} onClick={this.handleSignUpSelect} block>SignUp</Button>
                        </span>
                    {isLoginSelected ? <SignIn /> : null}
                    {isSignUpSelected ? <SignUp /> : null}
                </Modal.Body>
                <Modal.Footer className="Login">
                    {isLoginSelected ? <div>
                        Don't have an account yet ?
                         <Button variant="link" onClick={this.handleSignUpSelect}>Sign up</Button>
                    </div> : null}
                </Modal.Footer>
            </Modal>
        </div>
    }
}

let mapStateToProps = (state) => {
    console.log("In state to props");
    console.table(state);
    const { isLoginOpen } = state.header;
    return { isLoginOpen: isLoginOpen };
};

export default connect(
    mapStateToProps,
    { handleLogin }
)(Login);
