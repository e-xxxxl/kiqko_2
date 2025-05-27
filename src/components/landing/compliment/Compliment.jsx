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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const Compliment = () => {
      const [compliment, setCompliment] = useState('');
  const history = useHistory();
  const userId = localStorage.getItem('userId');

  const handleChange = (e) => {
    setCompliment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userId) {
      // If user is logged in (has userId), save to database
      try {
        await axios.post(`https://kiqko-backend.onrender.com/api/users/compliment/${userId}`, {
          compliment
        });
        history.push('/dealbreaker');
      } catch (error) {
        console.error('Failed to update compliment:', error);
      }
    } else {
      // If user is not logged in, save to localStorage
      localStorage.setItem('tempComplimentData', JSON.stringify({ compliment }));
      history.push('/dealbreaker');
    }
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
                  <h4 className="mb-1">Compliment</h4>
                  <p className="sub-p">Best Compliment I've Ever Received.</p>
                </Col>

                <Row>
                  <Col md={12}>
                    <Form onSubmit={handleSubmit}>
                      <div className="about-field-style about-field-area">
                        <Form.Group className="mb-1">
                          <Form.Control
                            className="input-head"
                            type="text"
                            required
                            placeholder="e.g. (I bet you do the crossword puzzle in ink.)"
                            value={compliment}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="char-span">{100 - compliment.length}</span>
                        </Form.Group>
                      </div>

                      <Row className="m-0-responsive">
                        <Col md={6} className="text-center offset-md-3 btn-modal-round margintop-170">
                          <Button
                            type="submit"
                            className="full-width btn-all-landing margin-all-modal-btn btn"
                            variant="link"
                          >
                            Continue <MdOutlineArrowForward className="arrow-sign" />
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Row>

              <Row className="m-0-responsive">
                <hr className="hr-color mt-3" />
                <p className="text-center app-p mb-0">
                  <span><img src={downloadApp} alt="downloadApp" /></span>
                  Download our app for:
                </p>

                <div className="col-md-12 text-center">
                  <NavLink exact to="bout">
                    <Button className="btn-app-link"><img src={apps} alt="apps" /></Button>
                  </NavLink>
                  <NavLink exact to="bout">
                    <Button className="btn-app-link"><img src={appg} alt="appg" /></Button>
                  </NavLink>
                </div>
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

export default Compliment;