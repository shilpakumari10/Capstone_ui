import React from 'react';
import { Table, Alert, Container, ModalBody, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { vehicleSubCategoryIdMap, fuelTypeIdMap, locationMap, locationIdMap } from '../constants/admin';
import { getVehicles } from '../redux/actions';
import { Redirect } from 'react-router';
import { handleLogin } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCross, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { StyledCard, StyledCardContent, StyledCardImage, StyledCardActions, StyledStep3Header, StyledButtonGroup } from "../steps/Step3Styles";
import { Typography, Backdrop, CircularProgress } from '@material-ui/core';
import { updateVehicleAvailability } from '../service/vehicle/vehicleService';
import '../App.css';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddVehicleClicked: false,
            isChangeAvailabilityModalVisible: false,
            vehicleToUpdate: undefined,
            isUpdating: false
        };

    }

    componentDidMount = async () => {
        if (this.props.jwtToken === null || this.props.jwtToken === undefined) {
            this.props.dispatch(handleLogin(true));
        }
        this.props.dispatch(getVehicles(this.props.jwtToken));
    }

    handleAddButton = (event) => {
        this.setState(prevState => {
            return { ...prevState, isAddVehicleClicked: true }
        });
    }

    handleChangeAvailablility = (isVisisble, vehicle) => {
        this.setState(prevState => { return { ...prevState, isChangeAvailabilityModalVisible: isVisisble, vehicleToUpdate: vehicle } });
    }

    updateAvailability = async (vehicle) => {
        this.setState(prevState => { return { ...prevState, isUpdating: true } });
        let { vehicleToUpdate } = this.state;
        let data = { "availability_status": !vehicleToUpdate.availability_status ? 1 : 0 };
        let response = await updateVehicleAvailability(vehicleToUpdate.vehicleId, data, this.props.jwtToken);
        if (response !== null || response !== undefined) {
            this.setState(prevState => { return { ...prevState, isChangeAvailabilityModalVisible: false } });
            this.props.dispatch(getVehicles(this.props.jwtToken));
        }
        this.setState(prevState => { return { ...prevState, isUpdating: false } });
    }

    getListOfVehicles = (vehicle, index) => {
        const { carImageUrl, vehicleModel, color, fuelType, vehicleSubCategoryId, locationId, availability_status } = vehicle;
        return <StyledCard className={!availability_status ? "Inactive" : undefined}>
            <StyledCardImage
                src={carImageUrl}
            />
            <StyledCardContent>
                <h4>{vehicleModel}</h4>
                <div><b>Color: </b>{color}</div>
                <div><b>Fuel Type: </b>{fuelType}</div>
                <div><b>Sub Category: </b>{vehicleSubCategoryIdMap[vehicleSubCategoryId]}</div>
                <div><b>Location: </b>{locationIdMap[locationId]}</div>
                <div><b>Visible : </b>{availability_status ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faTimes} />}</div>
            </StyledCardContent>
            <StyledCardActions>
                <Button
                    color={availability_status ? "secondary" : "primary"}
                    onClick={e => this.handleChangeAvailablility(true, vehicle)}
                >
                    {availability_status ? "TakeDown" : "Enable"}
                </Button>
            </StyledCardActions>
        </StyledCard>
    };

    getChangeAvailabilityModal = () => {
        let { vehicleToUpdate, isChangeAvailabilityModalVisible } = this.state;

        return <Modal show={isChangeAvailabilityModalVisible} onHide={() => this.handleChangeAvailablility(false, undefined)}>
            <ModalBody>
                <StyledCard>
                    <StyledCardContent>
                        <Typography>This will make the vehicle {vehicleToUpdate.availability_status ? "unavailable" : "available"}</Typography>
                    </StyledCardContent>
                    <StyledCardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={e => this.updateAvailability(vehicleToUpdate)}
                        >
                            Proceed
            </Button>
                    </StyledCardActions>
                </StyledCard>
            </ModalBody>

        </Modal>
    };

    render() {
        let { isAddVehicleClicked, isChangeAvailabilityModalVisible } = this.state;
        let { jwtToken } = this.props;

        return <Container fluid="md">
            <div classname="row justify-content-end">
                <button className="btn btn-link" onClick={e => this.handleAddButton(e)}>
                    <span><FontAwesomeIcon icon={faPlusCircle} /></span> Add Vehicle
        </button>
            </div>
            {jwtToken === null || jwtToken === undefined ? <Redirect to="/home" /> : null}
            {isAddVehicleClicked ? <Redirect push to="/admin/add-vehicle" /> : null}
            {isChangeAvailabilityModalVisible ? this.getChangeAvailabilityModal() : null}
            {this.props.userVehicles.length > 0 ? <List>
                {this.props.userVehicles.map((vehicle, index) => {
                    return <ListItem key={index}>
                        {this.getListOfVehicles(vehicle, index)}
                    </ListItem>

                })}
            </List> : null}
            {
                this.props.userVehicles.length === 0 ?
                    <Alert variant="danger">
                        No Vehicles , please add some to see here.
                </Alert> : null
            }
        </Container>

    }
}

export default connect(
    (state) => {
        let { userId, jwtToken } = state.login;
        let { vehicles } = state.user;
        return { userId, userVehicles: vehicles, jwtToken };
    }
)(AdminDashboard);