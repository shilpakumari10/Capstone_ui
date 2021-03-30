import React from 'react';
import {StyledTextField, StyledText} from "./Step1Styles";
import { connect } from 'react-redux';
import { setStepData } from '../redux/actions';

class Step1 extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <StyledText>Select Pick Up date</StyledText>
                <StyledTextField
                    id="pickUpDate"
                    label=""
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.props.pickUpDate}
                    onChange={(event) => this.props.dispatch(setStepData(event))}
                />
            </div>
        );
    }
}

export default connect(
    state => {
        let {pickUpDate} = state.step;
        return {pickUpDate};
    }
)(Step1);