import Card from 'react-bootstrap/Card'
import Countdown from 'react-countdown';
import Col from 'react-bootstrap/Col';
//import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import styled from "styled-components"

const DivRoot = styled.div`
padding: 8px;
margin: 8px;
display: flex;
margin-right: 0;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: center;
background: #384457;
color: white;
border-radius: 5px;
font-weight: bold;
font-size: 18px;`; // add your owns styles here

const SpanItem = styled.span`
font-weight: bold;
font-size: 18px;`

const SpanDone = styled(Col)`
padding: 8px;
margin: 8px;
display: flex;
margin-right: 0;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: center;
background: #384457;
color: white;
border-radius: 5px;
font-weight: bold;
font-size: 18px;
`
const SpanUndone = styled(Col)`
display: flex;
    padding: 0;
`
const StyledCard = styled(Card)`
color: white;
width: 48px;
height: 48px;
margin: 4px;
display: flex;
font-size: 10px;
background: #384457;
align-items: center;
margin-right: 0;
align-content: center;
border-radius: 5px;
flex-direction: column;
justify-content: center;
`
/* const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: white;
    width: 48px;
    height: 48px;
    margin: 4px;
    display: flex;
    font-size: 10px;
    background: #384457;
    align-items: center;
    margin-right: 0;
    align-content: center;
    border-radius: 5px;
    flex-direction: column;
    justify-content: center;
      },
    },
    done: {
      display: 'flex',
      margin: theme.spacing(1),
      marginRight: 0,
      padding: 1px,
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#384457',
      color: 'white',
      borderRadius: 5,
      fontWeight: 'bold',
      fontSize: 18,
    },
    item: {
      fontWeight: 'bold',
      fontSize: 18,
    },
  }),
); */

interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
  refreshCandyMachineState: any;
}

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const MintCountdown: React.FC<MintCountdownProps> = ({
  date,
  status,
  style,
  onComplete,
  refreshCandyMachineState
}) => {
  //const classes = useStyles();
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: MintCountdownRender) => {
    hours += days * 24;
    if (completed) {
      return status ? <SpanDone >{status}</SpanDone> : null;
    } else {
      return (
        <SpanUndone >
          <StyledCard style={{ flexWrap: 'wrap', display: "flex" }} >
            <SpanItem >
              {hours < 10 ? `0${hours}` : hours}
            </SpanItem>
            <span>hrs</span>
          </StyledCard>
          <StyledCard style={{ flexWrap: 'wrap', display: "flex" }}>
            <SpanItem >
              {minutes < 10 ? `0${minutes}` : minutes}
            </SpanItem>
            <span>mins</span>
          </StyledCard>
          <StyledCard style={{ flexWrap: 'wrap', display: "flex" }}>
            <SpanItem >
              {seconds < 10 ? `0${seconds}` : seconds}
            </SpanItem>
            <span>secs</span>
          </StyledCard>
          </SpanUndone>
      );
    }
  };

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={() => refreshCandyMachineState()}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};
