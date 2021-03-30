import { useState } from "react";
import {useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { clearLoginData } from "../redux/actions";

const { Button, Dropdown, DropdownButton, ButtonGroup } = require("react-bootstrap");
const { Redirect } = require("react-router");

const handleDashboardOnClick = (event) => {
    return;
};

const User = (props) => {
    const [isDashboardClicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    return (
        <>
            {isDashboardClicked ? <Redirect push to="/admin/dashboard" /> : null}
            <FontAwesomeIcon icon={faUser} />
            <DropdownButton as={ButtonGroup} title={props.firstName} id="bg-vertical-dropdown-1">
                {props.roleName === "Admin" ? <Dropdown.Item eventKey="1" onClick={e => setClicked(true)}>Dashboard</Dropdown.Item> : null}
                {props.roleName === "User" ? <Dropdown.Item disabled="true" eventKey="2">Wallet : INR {props.walletMoney}</Dropdown.Item> : null}
                <Dropdown.Item eventKey="2" onClick={() => dispatch(clearLoginData())}>Logout</Dropdown.Item>
            </DropdownButton>
        </>
    );
}

export default User;