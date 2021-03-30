import React from 'react';
import Login from '../login/Login';
import BookNow from './BookNow';
import StepForm from './StepForm';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';



class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookNowClicked: false
        }
        console.log("Props from Screen :" + this.props);
    }

    handleBookNowClicked = () => {
        this.setState({
            bookNowClicked: true
        })
    }

    render() {
        return <Container fluid="md">
                    {this.props.isLoginOpen ? <Login /> : null}
                    {this.state.bookNowClicked ? <StepForm/> : <BookNow handleBookNowClicked={this.handleBookNowClicked}/>}
                </Container>    
    }
}

export default connect(
    state => {
        let { isLoginOpen } = state.header;
        let { roleName, jwtToken } = state.login;
        return { isLoginOpen, roleName, jwtToken };
    }
)(Screen);