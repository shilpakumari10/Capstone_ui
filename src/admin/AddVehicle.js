import React from 'react';
import { Container, Card, Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { requiredFields, requestFields, vehicleSubCategoryMap, fuelTypeMap, locationMap } from '../constants/admin';
import { handleLogin } from '../redux/actions';
import { submitRequest } from '../service/vehicle/vehicleService';

class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleModel: {
                value: undefined,
                disabled: false,
                isValid: true,
                displayName: "Vehicle Model"
            },
            vehicleNumber: {
                value: undefined,
                disabled: false,
                isValid: true,
                displayName: "Vehicle Number"
            },
            vehicleSubCategoryId: undefined,
            vehicleSubCategory: {
                value: undefined,
                disabled: false,
                isValid: true,
                displayName: "Vehicle Sub Category"
            },
            color: {
                value: undefined,
                disabled: false,
                isValid: true,
                displayName: "Color"
            },
            fuelTypeId: undefined,
            fuelType: {
                value: undefined,
                disabled: false,
                isValid: true,
                displayName: "Fuel Type"
            },
            locationId: undefined,
            location: {
                value: undefined,
                disabled: false,
                isValid: true,
                displayName: "Location"
            },
            carImageUrl: {
                value: undefined,
                disabled: false,
                isValid: true,
            },
            availability_status: {
                value: undefined,
                disabled: false,
                isValid: true,
                displayName: " Availability Status"
            },
            isSuccess: undefined,
            isVerified: undefined,
            errorMessage: ""
        };

        let listOfInvalidProperties = [];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount = () => {
        if (this.props.jwtToken === null || this.props.jwtToken === undefined) {
            this.props.dispatch(handleLogin(true));
        }
    }

    handleInput = (event) => {
        console.table(event.target);
        if (event.target.type === "checkbox") {
            this.setState(prevState => {
                prevState[event.target.id].value = event.target.checked;
                return prevState;
            });
        }
        else {
            this.setState(prevState => {
                prevState[event.target.id].value = event.target.value;
                return prevState;
            });
        }
    }

    clearForm = () => {
        Object.keys(this.state)
            .filter(key => requiredFields.includes(key))
            .forEach(key => {
                this.state[key].value = undefined;
                this.state[key].isValid = true
            });
    }

    setSuccess = (isSuccess,errorMessage = null) => {
        this.setState(prevState => {
            if(errorMessage !== null){
                return { ...prevState, isSuccess: isSuccess,errorMessage : errorMessage };
            }
            return { ...prevState, isSuccess: isSuccess };
        });
    }

    setRequiredFieldsMissing = (isVerified) => {
        this.setState(prevState => {
            return { ...prevState, isVerified: isVerified };
        });
    }

    verifyFormData = () => {
        this.listOfInvalidProperties = Object.keys(this.state)
            .filter(key => requiredFields.includes(key) && this.state[key] !== undefined && (this.state[key].value === undefined || this.state[key].value === ""))
            .map(key => this.state[key].displayName)

        return this.listOfInvalidProperties.length == 0;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("in submit");
        if (this.verifyFormData()) {
            console.log("Verified");

            let data = {};
            Object.keys(this.state)
                .filter(
                    s => requestFields.includes(s) && this.state[s] !== undefined
                )
                .forEach(s => data[s] = this.state[s].value);

            data.locationId = locationMap[this.state['location'].value];
            data.fuelTypeId = fuelTypeMap[this.state['fuelType'].value];
            data.vehicleSubCategoryId = vehicleSubCategoryMap[this.state['vehicleSubCategory'].value]
            data.availability_status = data.availability_status ? 1 : 0;

            let response = await submitRequest(data, this.props.jwtToken);

            if (response['statusCode'] === 200) {
                this.clearForm();
                this.setSuccess(true);
            } 
            else {
                this.setSuccess(false,response['message']);
            }


        } else {
            this.setRequiredFieldsMissing(true);
        }
    }

    render() {
        let { isSuccess, isVerified ,errorMessage} = this.state;
        let { jwtToken } = this.props;
        return <>
            {jwtToken === null || jwtToken === undefined ? <Redirect to="/home" /> : null}
            <Card styles={{ height: "100px" }}>
                <Card.Header>
                    Enter Vehicle
                    </Card.Header>
                <Card.Body>
                    {isSuccess != undefined && !isSuccess ?
                        <Alert variant="danger">
                            Add Vehicle failed {errorMessage !== null ? errorMessage : ""}
              </Alert> : null
                    }
                    {isSuccess != null && isSuccess ?
                        <Alert variant="success">
                            Successfully submitted.
              </Alert> : null
                    }
                    {isVerified != null && isVerified ?
                        this.listOfInvalidProperties.map(property => {
                            return <Alert variant="danger">
                                Enter {property}
                            </Alert>
                        }) : null
                    }
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="vehicleModel">
                                    <Form.Label>Vehicle Model</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Vehicle Model"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.vehicleModel.value} />
                                </Form.Group>
                                <Form.Group controlId="vehicleNumber">
                                    <Form.Label>Vehicle Number</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Vehicle Number"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.vehicleNumber.value} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="vehicleSubCategory">
                                    <Form.Label>Vehicle Sub Category</Form.Label>
                                    <Form.Control as="select"
                                        placeholder="Enter Vehicle Category"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.vehicleSubCategory.value}>
                                        <option></option>
                                        <option value="SUV">Suv</option>
                                        <option value="SEDAN">Sedan</option>
                                        <option value="HATCHBACK">Hatchback</option>
                                        <option value="CRUISER">Cruiser</option>
                                        <option value="DIRT BIKE">Dirt Bike</option>
                                        <option value="SPORTS BIKE">Sports Bike</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="color">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Color"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.color.value} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="fuelType">
                                    <Form.Label>Fuel Type</Form.Label>
                                    <Form.Control as="select"
                                        placeholder="Enter Color"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.fuelType.value} >
                                        <option></option>
                                        <option value="PETROL">Petrol</option>
                                        <option value="DIESEL">Diesel</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control as="select"
                                        placeholder="Enter Location"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.location.value} >
                                        <option></option>
                                        <option value="WORLI">Worli</option>
                                        <option value="CHEMBUR">Chembur</option>
                                        <option value="POWAI">Powai</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="availability_status">
                                    <Form.Label>Availability Status</Form.Label>
                                    <Form.Check type="checkbox"
                                        placeholder="Enter Availability Status"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.availability_status.value} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="carImageUrl">
                                    <Form.Label>Image Url</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter Image Url"
                                        onChange={e => this.handleInput(e)}
                                        value={this.state.carImageUrl.value} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary"
                        type="submit"
                        onClick={e => this.handleSubmit(e)}
                    >
                        Submit
                </Button>
                </Card.Footer>
            </Card>
        </>

    }
}

export default connect((state) => {
    let { jwtToken } = state.login;
    return { jwtToken };
})(AddVehicle);