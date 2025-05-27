import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { MdOutlineArrowForward } from "react-icons/md";
import Container from 'react-bootstrap/esm/Container';
import shape from '../../../assets/images/shape2.png';
import bgweball from '../../../assets/images/bgweball.png';
import downloadApp from '../../../assets/images/downloadApp.png';
import apps from '../../../assets/images/apps.png';
import appg from '../../../assets/images/appg.png';
import { Button, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import './About.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AboutYou = () => {
     const history = useHistory();
  const [essay, setEssay] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage under its own key
    localStorage.setItem('tempaboutYouEssay',  JSON.stringify({ essay }));

    // Navigate to /basics
    history.push('/upload-photo');
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
              <Row className="m-0-responsive">
                <Col md={12} className="all-title-top mb-1 text-center">
                  <h4>About Me</h4>
                  <p className="sub-p">To continue you need to add an essay.</p>
                </Col>

                <Row>
                  <Col className="mt-4" md={12}>
                    <Form onSubmit={handleSubmit}>
                      <div className="about-field-style about-field-area">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Your Story</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={7}
                            required
                            placeholder="To continue you need to add an essay."
                            value={essay}
                            onChange={(e) => setEssay(e.target.value)}
                          />
                          <span className="char-span">{1000 - essay.length}</span>
                        </Form.Group>
                      </div>

                      <Row className="m-0-responsive">
                        <Col md={6} className="text-center offset-md-3 btn-modal-round mt-4">
                          <Button type="submit" className="full-width btn-all-landing margin-all-modal-btn btn" variant="link">
                            Continue <MdOutlineArrowForward className="arrow-sign" />
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>

                <Row className="m-0-responsive">
                  <hr className="hr-color mt-3" />
                  <p className="text-center app-p mb-0">
                    <span><img src={downloadApp} alt="downloadApp" /></span>Download our app for:
                  </p>

                  <div className="col-md-12 text-center">
                    <Button className="btn-app-link"><img src={apps} alt="apps" /></Button>
                    <Button className="btn-app-link"><img src={appg} alt="appg" /></Button>
                  </div>
                </Row>
              </Row>
            </div>
          </Container>
        </div>
        <div className="shape-footer-all">
          <img src={bgweball} alt="bgweball" />
        </div>
      </div>
    </section>
           
    );
};

export default AboutYou;