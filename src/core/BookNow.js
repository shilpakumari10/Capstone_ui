import React from 'react';
import Button from 'react-bootstrap/Button';
import {StyledHomeButtom, StyledHomePageText, StyledHomePageButton} from "./BookNowStyle.js";

class BookNow extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <StyledHomeButtom>
                <StyledHomePageText>Self-drive vehicle rental in Mumbai</StyledHomePageText>
                <StyledHomePageButton onClick={() => this.props.handleBookNowClicked()}>Book Now</StyledHomePageButton>
            </StyledHomeButtom>
        );
    }
}

export default BookNow;