

import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import shape from '../../../assets/images/shape2.png';
import bgweball from '../../../assets/images/bgweball.png';
import downloadApp from '../../../assets/images/downloadApp.png';
import apps from '../../../assets/images/apps.png';
import appg from '../../../assets/images/appg.png';
import { Button, Dropdown } from 'react-bootstrap';
import './verify.css'
import { NavLink } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const history = useHistory();
  const email = location?.state?.email;

  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!email) {
      history.replace('/signup');
    }
  }, [email, history]);

  const handleResend = async () => {
    try {
      const response = await fetch('https://kiqko-backend.onrender.com/api/auth/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Verification code resent!');
      } else {
        alert('Error resending code.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to resend code.');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return alert('Please enter the verification code');

    setVerifying(true);
    try {
      const response = await fetch('https://kiqko-backend.onrender.com/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Email verified successfully!');
        history.push('/email-verified'); // redirect after success
      } else {
        alert(data.message || 'Invalid or expired code');
      }
    } catch (err) {
      console.error(err);
      alert('Verification failed');
    } finally {
      setVerifying(false);
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
              <Row>
                <Col md={12} className="all-title-top mb-1 text-center">
                  <h4>Verify Email</h4>
                </Col>
                <Col md={12}>
                  <p className="p-up-loc text-center mt-1 mb-2">
                    To activate your account, we sent you a verification code <br />
                    to the email address you signed up with.
                  </p>
                </Col>
              </Row>

              <Form onSubmit={handleVerify}>
                <Row>
                  <Col lg={12}>
                    <p className="all-login-p text-center mb-0 mt-0">
                      Please check your spam or junk folder.
                    </p>
                    <h5 className="text-center h5-verify">Email sent to:</h5>
                    <span className="text-center span-verify d-block mb-3">{email}</span>

                    <Form.Group className="text-center mb-3">
                      <Form.Control
                        className="form-custom text-center"
                        type="text"
                        placeholder="Enter verification code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </Form.Group>

                    <div className="text-center mb-3">
                    <Button
  type="submit"
  disabled={verifying}
  style={{
    backgroundColor: '#9B72FE',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding: '12px',
    fontWeight: 'bold'
  }}
>
  {verifying ? 'Verifying...' : 'Verify Email'}
</Button>

                    </div>

                    <p className="text-center p-verufy-all-small color-blue-link">
                      <strong><button type="button" className="btn btn-link p-0" onClick={handleResend}>Resend code</button></strong>
                    </p>
                  </Col>
                </Row>

                <Row className="m-0-responsive mt-4">
                  <hr className="hr-color margintop-116" />

                  <p className="text-center app-p mb-0">
                    <span><img src={downloadApp} alt="downloadApp" /></span> Download our app for:
                  </p>

                  <div className="col-md-12 text-center mt-2">
                    <NavLink exact to="/bout"><Button className="btn-app-link"><img src={apps} alt="apps" /></Button></NavLink>
                    <NavLink exact to="/bout"><Button className="btn-app-link"><img src={appg} alt="appg" /></Button></NavLink>
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

export default VerifyEmail;
