import * as anchor from '@project-serum/anchor';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//import Grid from '@material-ui/core/Grid';
//import p from '@material-ui/core/p';
import { MintCountdown } from './MintCountdown';
import { toDate, formatNumber } from '../utils/utils';
import { CandyMachineAccount } from '../utils/candy-machine';

type HeaderProps = {
    candyMachine?: CandyMachineAccount;
};

export const Header = ({
    candyMachine,
    refreshCandyMachineState,
}: {
    candyMachine?: CandyMachineAccount;
    refreshCandyMachineState: any;
}) => {
    return (
        <Container>
            <Row className="justify-content-center" style={{ flexWrap: 'nowrap' }}>
                {candyMachine && (
                    <>
                        <Col>
                            <p
                                style={{
                                    margin: '0px',
                                    fontSize: '0.875rem',
                                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                    fontWeight: '400',
                                    lineHeight: '1.43',
                                    letterSpacing: '0.01071em',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                Remaining
                            </p>
                            <p
                                style={{
                                    margin: '0px',
                                    fontSize: '1.25rem',
                                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                    fontWeight: 'bold',
                                    lineHeight: '1.6',
                                    letterSpacing: '0.01071em',
                                    color: 'rgba(255, 255, 255,1)',
                                }}
                            >{`${candyMachine?.state.itemsRemaining}`}</p>
                        </Col>
                        <Col>
                            <p
                                style={{
                                    margin: '0px',
                                    fontSize: '0.875rem',
                                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                    fontWeight: '400',
                                    lineHeight: '1.43',
                                    letterSpacing: '0.01071em',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                Price
                            </p>
                            <p
                                style={{
                                    margin: '0px',
                                    fontSize: '1.25rem',
                                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                    fontWeight: 'bold',
                                    lineHeight: '1.6',
                                    letterSpacing: '0.01071em',
                                    color: 'rgba(255, 255, 255, 1)',
                                }}
                            >
                                {getMintPrice(candyMachine)}
                            </p>
                        </Col>
                        </>
                )}
                <MintCountdown
                    date={toDate(
                        candyMachine?.state.goLiveDate
                            ? candyMachine?.state.goLiveDate
                            : candyMachine?.state.isPresale
                            ? new anchor.BN(new Date().getTime() / 1000)
                            : undefined
                    )}
                   
                    status={
                        !candyMachine?.state?.isActive || candyMachine?.state?.isSoldOut
                            ? 'COMPLETED'
                            : candyMachine?.state.isPresale
                            ? 'PRESALE'
                            : 'LIVE'
                    }
                    refreshCandyMachineState={refreshCandyMachineState}
                />
            </Row>
        </Container>
    );
};

const getMintPrice = (candyMachine: CandyMachineAccount): string => {
    const price = formatNumber.asNumber(
        candyMachine.state.isPresale && candyMachine.state.whitelistMintSettings?.discountPrice
            ? candyMachine.state.whitelistMintSettings?.discountPrice!
            : candyMachine.state.price!
    );
    return `◎ ${price}`;
};
