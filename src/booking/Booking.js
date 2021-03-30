import { Container, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';

class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: null,
            steps: []
        };

    }

    render() {
        let { activeStep, steps } = this.state;
        return <Container>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map(lable => {
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                })}
            </Stepper>
        </Container>
    }

}