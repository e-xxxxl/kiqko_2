import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { MdOutlineArrowForward } from "react-icons/md";
import Container from 'react-bootstrap/esm/Container';
import shape from '../../../assets/images/shape2.png';
import bgweball from '../../../assets/images/bgweball.png';
import downloadApp from '../../../assets/images/downloadApp.png';
import apps from '../../../assets/images/apps.png';
import appg from '../../../assets/images/appg.png';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Disclaimer = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <section>
            <section className="all-top-shape all-shape-inner">
                <img src={shape} alt="shape" />
            </section>
            <div className="all-container margin-bottom-step">
                <div className="all-container-inner setting-area position-top-all">
                    <Container>
                        <div className="all-seting-area ull-width">
                            <Row>
                                <Col md={12} className="all-title-top mb-1 text-center">
                                    <h4>Disclaimer</h4>
                                </Col>
                            </Row>
                            <Form>
                                <Row>
                                    <Col lg={12}>
                                        <h5 className="notice-h4 mb-2"><strong>Notice:</strong></h5>
                                        <p className="notice-p">
                                            You understand that you are solely responsible for your interaction with other members. Furthermore, you understand and agree that the company currently does not conduct criminal background checks on its
                                            members. The company also does not inquire into the backgrounds of all of its members or attemps to verify the statements of its members...
                                        </p>

                                        <Form.Group className="mb-4 mt-4 pt-0 check-form check-long" controlId="formBasicCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                label="Check here to indicate that you have read and agree to the terms of the Disclaimer."
                                                checked={isChecked}
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Col lg={10} className="offset-md-1">
                                    <Row>
                                        <Col md={6} className="text-center btn-modal-round mt-3">
                                            <Button
                                                className="full-width btn-all-landing margin-all-modal-btn btn"
                                                variant="link"
                                            >
                                                Disagree <MdOutlineArrowForward className="arrow-sign" />
                                            </Button>
                                        </Col>
                                        <Col md={6} className="text-center btn-modal-round mt-3">
                                            <NavLink exact to={isChecked ? "/covid" : "#"} onClick={e => !isChecked && e.preventDefault()}>
                                                <Button
                                                    className="full-width btn-all-landing margin-all-modal-btn btn"
                                                    variant="link"
                                                    disabled={!isChecked}
                                                >
                                                    Agree <MdOutlineArrowForward className="arrow-sign" />
                                                </Button>
                                            </NavLink>
                                        </Col>
                                    </Row>
                                </Col>

                                <Row>
                                    <hr className="hr-color mt-2" />
                                    <p className="text-center app-p mb-0">
                                        <span><img src={downloadApp} alt="downloadApp" /></span>Download our app for:
                                    </p>
                                    <div className="col-md-12 text-center">
                                        <NavLink exact to="bout">
                                            <Button className="btn-app-link">
                                                <img src={apps} alt="apps" />
                                            </Button>
                                        </NavLink>
                                        <NavLink exact to="bout">
                                            <Button className="btn-app-link">
                                                <img src={appg} alt="appg" />
                                            </Button>
                                        </NavLink>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </Container>
                </div>

                {/* shape-footer-all */}
                <div className="shape-footer-all">
                    <img src={bgweball} alt="bgweball" />
                </div>
            </div>
        </section>
    );
};

export default Disclaimer;
