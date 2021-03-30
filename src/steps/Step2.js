import React from 'react';
import {StyledTextField, StyledFormGroup, StyledStep2Form, StyledText} from "./Step2Styles";
import {LocationList} from "./constants";
import { connect } from 'react-redux';
import { setStepData } from '../redux/actions';
import {locationMap} from "../constants/admin"

class Step2 extends React.Component {

    constructor(props) {
        super();
    }

    getLocationList = () => {
        console.log(LocationList);
        return LocationList.map(location => <option key={location} value={locationMap[location]}>{location}</option>)
    }

    render() {
        return (
            <div>
                <StyledText>PickUp Date: {this.props.pickUpDate}</StyledText>
                <StyledStep2Form>
                    <StyledFormGroup className="form-group">
                        <select required value={this.props.location} onChange={(event => this.props.dispatch(setStepData(event)))} className="form-control" id="location">
                            <option></option>
                            {this.getLocationList()}
                        </select>
                    </StyledFormGroup>
                    <StyledTextField
                        id="dropOffDate"
                        label=""
                        type="date"
                        value={this.props.dropOffDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => this.props.dispatch(setStepData(event))}
                    />
                </StyledStep2Form>
            </div>
        );
    }
}

export default connect(
    state => {
        let {pickUpDate, location, dropOffDate} = state.step; 
        return {pickUpDate, location, dropOffDate};
    }
)(Step2);