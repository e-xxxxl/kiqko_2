import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import CommonLayout from '../../layouts/Common';
import shape from '../../assets/images/shape2.png';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import { Button, Dropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import './Setting.css';

const PasswordReset = () => {
     const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await axios.post('https://kiqko-backend.onrender.com/api/auth/reset-password-otp', {
                email,
                otp,
                newPassword
            });
            
           
                history.push('/password-changed');
           
            
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.message || 'Something went wrong. Please try again.',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

  return (
    <>

         <CommonLayout>
            <section className="all-top-shape">
                <img src={shape} alt="shape" />
                <h1 className="for-h1">Reset Password</h1>
            </section>
            <div className="all-container">
                <div className="all-container-inner setting-area for-got-area">
                    <Container>
                        <div className="all-seting-area">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={12}>
                                        <p className="p-up-loc text-center">
                                            Enter your email, the OTP you received, and your new password
                                        </p>
                                    </Col>
                                    <Col className="mt-2 offset-md-3" md={6}>
                                        <Form.Control
                                            className="input-settings text-center mb-3"
                                            type="email"
                                            placeholder="Your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <Form.Control
                                            className="input-settings text-center mb-3"
                                            type="text"
                                            placeholder="OTP code"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                        <Form.Control
                                            className="input-settings text-center mb-3"
                                            type="password"
                                            placeholder="New password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                        <Button
                                            className="settings-btn mt-4 w-100"
                                            variant="primary"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Resetting...
                                                </>
                                            ) : (
                                                'Reset Password'
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                           <Row>
                <Col className="mt-don-acc offset-md-3" md={6}>
                  <Row>
                    <Col md={6} >
                      <label className="label-acc whitspace">Remember your Password?</label>
                    </Col>
                    <Col md={6}>
                      <Button 
                        className="settings-btn mt-4 btn-acc mb-4 w-100" 
                        variant="primary"
                        onClick={() => history.push('/login')} // Using history.push
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
                        </div>
                    </Container>
                </div>
            </div>
        </CommonLayout>
    
    </>
  )
}

export default PasswordReset