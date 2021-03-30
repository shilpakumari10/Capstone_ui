import React from 'react';
import { requiredParameters } from '../constants/signUp';
import { handleLogin } from '../redux/actions';
import { signUpService } from '../service/identity/authService';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            mobileNo: null,
            password: null,
            confirmPassword: null,
            isSuccess: null
        };
    }

    verifyPassword = (password, confirmPassword) => {
        return password === confirmPassword;
    }

    handleInput = (event) => {
        console.table(event.target);
        this.setState(prevState => {
            prevState[event.target.id] = event.target.value;
            return prevState;
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let isVerified = this.verifyPassword(this.state.password, this.state.confirmPassword);

        let data = {};



        if (isVerified) {
            Object.keys(this.state)
            .filter(key => requiredParameters.includes(key))
            .forEach(key => data[key] = this.state[key]);

            let signUpResponse = await signUpService(data);
            console.log(signUpResponse);
            if (signUpResponse['statusCode'] == 200) {
                this.props.dispatch(handleLogin(false));
            }
        } else {
            this.setState(prevState => {
                return { ...prevState, isSuccess: false };
            })
        }
    }




    render() {
        let { isSuccess } = this.state;
        return <div>
            {isSuccess != null && !isSuccess ?
                <Alert variant="danger">
                    Please try again.
              </Alert> : null
            }
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter first name"
                                onChange={e => this.handleInput(e)}
                                value={this.state.firstName} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter last name"
                                onChange={e => this.handleInput(e)}
                                value={this.state.lastName} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                placeholder="Enter email"
                                onChange={e => this.handleInput(e)}
                                value={this.state.email} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
      </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="mobileNo">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="number"
                                placeholder="Enter mobileNo"
                                onChange={e => this.handleInput(e)}
                                value={this.state.mobileNo} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                placeholder="Password"
                                onChange={e => this.handleInput(e)}
                                value={this.state.password} />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                placeholder="Confirm Password"
                                onChange={e => this.handleInput(e)}
                                value={this.state.confirmPassword} />
                        </Form.Group>
                        <Button variant="primary"
                            type="submit"
                            onClick={e => this.handleSubmit(e)}>
                            SignUp
    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    }
}

export default connect()(SignUp);