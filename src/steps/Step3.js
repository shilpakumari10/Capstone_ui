import React from 'react';
import {StyledCard, StyledCardContent, StyledCardImage, StyledCardActions, StyledStep3Header, StyledButtonGroup} from "./Step3Styles";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {fetchVehicles} from "../service/vehicle/vehicleService";
import { setCarData, setSelectedVehicleIndex, handleLogin} from '../redux/actions';
import { ArrowBackIos } from '@material-ui/icons';
import {vehicleSubCategoryIdMap, carSubCategorylist, bikeSubCategorylist, fuelTypeIdMap} from "../constants/admin";

class Step3 extends React.Component {

    constructor() {
        super();
        this.state = {
            vehicleType: "CAR",
            subCategory: -1
        };
    }

    getCardComponent = (carData, index) => {
        const {vehicleModel, color, fuelTypeId, vehicleSubCategoryId, pricePerDay, carImageUrl} = carData;
        return (
            <StyledCard>
                <StyledCardImage
                    src={carImageUrl}
                />
                <StyledCardContent>
                    <h4>{vehicleModel}</h4>
                    <div><b>Color: </b>{color}</div>
                    <div><b>Fuel Type: </b>{fuelTypeIdMap[fuelTypeId]}</div>
                    <div><b>Sub Category: </b>{vehicleSubCategoryIdMap[vehicleSubCategoryId]}</div>
                </StyledCardContent>
                <StyledCardActions>
                    <h4>₹{pricePerDay}</h4>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if (this.props.jwtToken === null || this.props.jwtToken === undefined) {
                                this.props.dispatch(handleLogin(true));
                            } else {
                                this.props.dispatch(setSelectedVehicleIndex(index));
                                this.props.handleNext(2);
                            }
                        }}
                        >
                        Book now
                    </Button>
                </StyledCardActions>
          </StyledCard>
        );
    }

    handleCategoryChange = async(category) => {
        const {pickUpDate, dropOffDate, location} = this.props.stepData;
        const carDetails = await fetchVehicles(category, pickUpDate, dropOffDate, location, this.props.jwtToken);
        this.props.dispatch(setCarData(carDetails));
        this.setState({vehicleType: category, subCategory: -1})
    }

    getSubCategoryOptions = () => {
        const selectedSubCategoryList = this.state.vehicleType === "CAR" ? carSubCategorylist : bikeSubCategorylist;
        return selectedSubCategoryList.map((data) => {
            return <option key={data} value={data}>{vehicleSubCategoryIdMap[data]}</option>
        });
    }

    render() {
        return (
            <>
                <StyledStep3Header>
                    <Button onClick={this.props.handleBack}>
                        <ArrowBackIos/> Back
                    </Button>
                    <StyledButtonGroup color="primary">
                        <Button 
                            onClick={() => this.handleCategoryChange("CAR")}
                            variant={this.state.vehicleType === "CAR" ? "contained" : "outlined"}
                        >
                            CAR
                        </Button>
                        <Button
                            onClick={() => this.handleCategoryChange("BIKE")}
                            variant={this.state.vehicleType === "BIKE" ? "contained" : "outlined"}
                        >
                            BIKE
                        </Button>
                    </StyledButtonGroup>
                    <div>
                        <select
                            value={this.state.subCategory}
                            onChange={(event) => this.setState({subCategory: event.target.value})}
                            className="form-control"
                            id="vehicleSubCategory"
                        >
                            <option key="all" value="all">Select Category</option>
                            {this.getSubCategoryOptions()}
                        </select>
                    </div>
                </StyledStep3Header>
                {this.props.carData.length > 0 ? 
                <List>
                    {this.props.carData.map((data, index) => {
                       return  (this.state.subCategory === -1 || this.state.subCategory == data.vehicleSubCategoryId) ?
                         (
                            <ListItem key={index}>
                                {this.getCardComponent(data, index)}
                            </ListItem>
                        ) : null;
                    })}
                </List> : null }
            </>
        )
    }
}

export default connect(
    state => {
        let {carData} = state.carDetails;
        let stepData = state.step; 
        let { jwtToken } = state.login;
        return {carData, stepData, jwtToken};
    }
)(Step3);