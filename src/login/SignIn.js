import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginService } from '../service/identity/authService';
import { handleLogin, setLoginData } from '../redux/actions';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import '../App.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isSuccess: null
    };
    this.handleInput = this.handleInput.bind(this);
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
    let loginData = await loginService(this.state.email, this.state.password);
    console.log(loginData);
    if (loginData['statusCode'] === 200) {
      console.log(this.props);
      this.props.dispatch(setLoginData(loginData['data']));
      this.props.dispatch(handleLogin(false));
      this.setState(prevState => {
        return { ...prevState, isSuccess: true }
      });
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

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                placeholder="Password"
                onChange={e => this.handleInput(e)}
                value={this.state.password} />
            </Form.Group>
            <Button variant="primary"
              type="submit"
              onClick={e => this.handleSubmit(e)}>
              Submit
  </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  }
}

export default connect(null)(SignIn);
