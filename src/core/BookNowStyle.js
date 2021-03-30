import Button from 'react-bootstrap/Button';
import styled from "styled-components";

export const StyledHomeButtom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
`;

export const StyledHomePageText = styled.h4`
`;

export const StyledHomePageButton = styled(Button)`
    margin-top: 20px;
    width: 25%
`;