import React, { useState } from 'react';
import CommonLayout from '../../layouts/Common';
import shape from '../../assets/images/shape2.png';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import { Button, Dropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import './Setting.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // Using useHistory instead of useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        confirmButtonText: 'OK'
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://kiqko-backend.onrender.com/api/auth/forgot-password', { email });
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: res.data.message || 'Password reset link sent!',
        confirmButtonText: 'OK'
      }).then(() => {
        history.push('/password-reset', { email }); // Using history.push instead of navigate
      });
      
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
   <CommonLayout>
      <section className="all-top-shape">
        <img src={shape} alt="shape" />
        <h1 className="for-h1">Forgot Password</h1>
      </section>
      <div className="all-container">
        <div className="all-container-inner setting-area for-got-area">
          <Container>
            <div className="all-seting-area">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <p className="p-up-loc text-center">
                      Enter the email associated with your account. We will email you a code to reset your password.
                    </p>
                  </Col>
                  <Col className="mt-2 offset-md-3" md={6}>
                    <Form.Control
                      className="input-settings text-center"
                      type="email"
                      placeholder="e.g. (email@sample1.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                          Sending...
                        </>
                      ) : (
                        'Send Code'
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Row>
                <Col className="mt-don-acc offset-md-3" md={6}>
                  <Row>
                    <Col md={6}>
                      <label className="label-acc whitspace">Don't have an account?</label>
                    </Col>
                    <Col md={6}>
                      <Button 
                        className="settings-btn mt-4 btn-acc mb-4 w-100" 
                        variant="primary"
                        onClick={() => history.push('/register')} // Using history.push
                      >
                        Create Account
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
    );
};

export default ForgotPassword;