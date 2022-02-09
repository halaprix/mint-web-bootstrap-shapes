import { Container, Nav, Navbar, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
//import logo from './assets/img/redbutton.png';
//import back from './assets/img/back.png';

const ConnectButton = styled(WalletMultiButton)`
    background-color: #ab1109 !important;
    font-family: 'Luckiest Guy' !important;
    border-radius: 2cm !important;
    font-size: 18px !important;
`;
export const NavbarCustom = (props: any) => {
    return (
        <Navbar expand="lg">
            <Container>
                <Col>
                    <a href="https://redbutton.wtf">
                        {' '}
                        {/* <img src={back} className="d-lg-none" height="20vW" /> */}
                    </a>

                    <Navbar.Collapse className="text-black ">
                        <span style={{ fontWeight: 'bold', fontSize: '1vW' }}>
                            <a href="https://redbutton.wtf">
                                {/* <img src={back} width="fill" height="15vW" /> */} BACK TO MAIN SITE
                            </a>
                        </span>
                    </Navbar.Collapse>
                </Col>
                <Col xs={6} lg={2} xl={2}>
                   {/*  <img src={logo} width="100%" /> */}
                </Col>
                <Col>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="justify-content-end text-black"
                            style={{ width: '100%', color: 'black !important' }}
                        >
                            {!props.walletAddress ? (
                                <ConnectButton>CONNECT WALLET</ConnectButton>
                            ) : (
                                props.walletAddress && (
                                    <Nav.Link className="text-black" onClick={props.clicked}>
                                        {props.balance} SOL: {props.walletAddress}
                                    </Nav.Link>
                                )
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Col>
            </Container>
        </Navbar>
    );
};
