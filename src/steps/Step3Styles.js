import styled from "styled-components";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export const StyledCard = styled(Card)`
    display: flex;
`;

export const StyledCardContent = styled(CardContent)`
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const StyledCardImage = styled.img`
    width: 450px;
    height: 300px;
`;

export const StyledCardActions = styled(CardActions)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const StyledStep3Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledButtonGroup = styled(ButtonGroup)`
`;