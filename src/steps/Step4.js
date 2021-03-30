import React from 'react';
import {StyledCard, StyledCardContent, StyledCardImage, StyledCardActions, StyledStep3Header, StyledButtonGroup} from "./Step3Styles";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import {getCarDetails} from "../service/CarDetails/carDetailService";
import { setCarData } from '../redux/actions';
import { ArrowBackIos } from '@material-ui/icons';
import {getBookingDuration, getBookingAmount} from "./utility";
import Modal from 'react-bootstrap/Modal'
import {fuelTypeIdMap} from "../constants/admin";

class Step4 extends React.Component {

    constructor() {
        super();
    }

    getCardComponent = (carData) => {
        const {vehicleModel, color, fuelTypeId, vehicleSubCategoryId, pricePerDay, carImageUrl} = carData;
        const {pickUpDate, dropOffDate} = this.props.stepData
        return (
            <StyledCard>
                <StyledCardImage
                    src={carImageUrl}
                />
                <StyledCardContent>
                    <h4>{vehicleModel}</h4>
                    <div><b>Color: </b>{color}</div>
                    <div><b>Fuel Type: </b>{fuelTypeIdMap[fuelTypeId]}</div>
                    <div><b>Sub Category: </b>{vehicleSubCategoryId}</div>
                    <div><b>Pick Up:: </b>{pickUpDate}</div>
                    <div><b>Drop Off: </b>{dropOffDate}</div>
                    <div><b>Price Per Day:</b> {pricePerDay}</div>
                    <div><b>Number of days: </b>{getBookingDuration(pickUpDate, dropOffDate)}</div>
                    <h4><b>Total Amount: </b>{getBookingAmount(pickUpDate, dropOffDate, pricePerDay)}</h4>
                </StyledCardContent>
          </StyledCard>
        );
    }

    render() {
        const selectedVehicle = this.props.carData[this.props.selectedVehicleIndex];
        return (
            <>
                {this.getCardComponent(selectedVehicle)}
                <Modal show={this.props.showConfirmation} onHide={() => this.props.setShowConfirmation(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your booking for {selectedVehicle.vehicleModel} had been confimed</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.props.setShowConfirmation(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
            </>
        )
    }
}

export default connect(
    state => {
        let {carData, selectedVehicleIndex} = state.carDetails;
        let stepData = state.step; 
        return {carData, stepData, selectedVehicleIndex};
    }
)(Step4);