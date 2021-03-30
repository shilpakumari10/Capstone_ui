import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/Step4";
import {StyleStepperContent, StyledStepButtonWrapper} from "./StepFormStyle";
import { useSelector, connect } from 'react-redux';
import {step2Next, step4Confirm} from "../steps/utility";
import { setCarData } from '../redux/actions';

function getSteps() {
  return ['Pick up', 'Drop Off', 'Available Vehicles', 'Confirm Booking'];
}

function getStepContent(step, handleBack, handleNext, showConfirmation, setShowConfirmation) {
  switch (step) {
    case 0:
      return <Step1/>;
    case 1:
      return <Step2/>;
    case 2:
      return <Step3 handleBack={handleBack} handleNext={handleNext}/>;
    case 3:
      return <Step4 showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation}/>;
  }
}

function StepForm(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const stepData = useSelector(state => state.step);
  const carDetails = useSelector(state => state.carDetails);
  const {userId,jwtToken} = useSelector(state => state.login);
  const steps = getSteps();

  const handleNext = async(step) => {
    switch (step) {
      case 0:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      case 1:
        const carData = await step2Next(stepData,jwtToken);
        props.dispatch(setCarData(carData))
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      case 2:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      case 3:
        const response = await step4Confirm(stepData, carDetails,userId,jwtToken);
        console.log(response);
        if(response.statusCode == 200)
          setShowConfirmation(true);
        break;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div style={{marginTop: "80px"}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        <StyleStepperContent>
        {getStepContent(activeStep, handleBack, handleNext, showConfirmation, setShowConfirmation)}
            <StyledStepButtonWrapper>
                {activeStep !== 0 && activeStep !== 2 ? 
                <Button onClick={handleBack}>
                    Back
                </Button> : null}
                {activeStep !== 2 ? 
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext(activeStep)}
                    >
                    {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
                </Button> : null}
            </StyledStepButtonWrapper>
        </StyleStepperContent>
    </div>
  );
}

export default connect()(StepForm);
