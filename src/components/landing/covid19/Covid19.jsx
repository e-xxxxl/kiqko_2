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
import { useHistory } from 'react-router-dom';

const Covid19 = () => {
    const [vaccinationStatus, setVaccinationStatus] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!vaccinationStatus) {
            alert('Please select your vaccination status');
            return;
        }

        // Save to localStorage
        localStorage.setItem('tempVaccinationStatus', vaccinationStatus);
        
        // Navigate to next page
        history.push('/sign-up');
    };

    const handleRadioChange = (e) => {
        setVaccinationStatus(e.target.value);
    };

    return (
        <section>
            <section className="all-top-shape all-shape-inner">
                <img src={shape} alt="shape" />
            </section>
            <div className="all-container margin-bottom-step">
                <div className="all-container-inner setting-area position-top-all">
                    <Container>
                        <div className="all-seting-area">
                            <Row>
                                <Col md={12} className="all-title-top mb-1 text-center">
                                    <h4>Vaccination</h4>
                                </Col>
                                <Col md={12}>
                                    <p className="text-center covid-p mt-2 pt-1">Are you vaccinated against Covid-19?</p>
                                </Col>
                            </Row>
                            <Form onSubmit={handleSubmit}>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3 mt-1 form-radio-covid">
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-Yes`}
                                            value="vaccinated"
                                            checked={vaccinationStatus === 'vaccinated'}
                                            onChange={handleRadioChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Yes & Boosted"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-YesBoosted`}
                                            value="vaccinated_and_boosted"
                                            checked={vaccinationStatus === 'vaccinated_and_boosted'}
                                            onChange={handleRadioChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-No`}
                                            value="not_vaccinated"
                                            checked={vaccinationStatus === 'not_vaccinated'}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                ))}
                                <Col md={6} className="text-center offset-md-3 btn-modal-round">
                                    <Button 
                                        type="submit"
                                        className="full-width btn-all-landing margin-all-modal-btn btn mtb-all-margin space-fit-all" 
                                        variant="link"
                                    >
                                        Continue<MdOutlineArrowForward className="arrow-sign" />
                                    </Button>
                                </Col>
                            </Form>
                            
                            <Row>
                                <hr className="hr-color mt-1"></hr>
                                <p className="text-center app-p mb-0"><span><img src={downloadApp} alt="downloadApp" /></span>Download our app for:</p>
                                <div className="col-md-12 text-center">
                                    <a href="/about"><Button className="btn-app-link"> <img src={apps} alt="apps" /></Button></a>
                                    <a href="/about"><Button className="btn-app-link"> <img src={appg} alt="appg" /></Button></a>
                                </div>
                            </Row>
                        </div>
                    </Container>
                </div>
                {/* shape-footer-all */}
                <div className="shape-footer-all">
                    <img src={bgweball} alt="bgweball" />
                </div>
                {/* shape-footer-all */}
            </div>
        </section>
    );
};

export default Covid19;