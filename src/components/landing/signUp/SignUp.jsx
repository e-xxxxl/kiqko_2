

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
import { Button, Dropdown } from 'react-bootstrap';
import './Signup.css';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
         gender: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

   const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
    }

    if (!formData.gender) {
        newErrors.gender = 'Gender is required';
    }

    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
        newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must have at least 6 characters, one uppercase, one lowercase, one number and one special character';
    }

    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post('https://kiqko-backend.onrender.com/api/auth/signup', {
                username: formData.username,
                email: formData.email,
                 gender: formData.gender,
                password: formData.password
            });

            if (response.data.success) {
                toast.success('Registration successful! Please verify your email.');
                history.push({
                    pathname: '/verify-email',
                    state: { email: formData.email }
                });
            }
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.message || 'Registration failed';
                toast.error(errorMsg);
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            } else {
                toast.error('Network error. Please try again.');
            }
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
                  <h4>Sign Up</h4>
                </Col>
                <Col md={12}>
                  <p className="p-up-loc text-center mt-1">
                    Please complete this form to create an account.
                  </p>
                </Col>
              </Row>

              <Form onSubmit={handleSubmit}>
                <Row className="m-0-responsive">
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Control
                        className="form-custom"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Control
                        className="form-custom"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Control
                        as="select"
                        name="gender"
                        className="form-custom"
                        value={formData.gender}
                        onChange={handleChange}
                        isInvalid={!!errors.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Control
                        className="form-custom"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Control
                        className="form-custom"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <p className="all-login-p text-center">
                      Password must have at least 6 characters, one uppercase
                      letter, one lowercase letter, one number and one special
                      character.
                    </p>
                  </Col>

                  <Col md={6} className="text-center offset-md-3 btn-modal-round">
                    <Button
                      className="full-width btn-all-landing margin-all-modal-btn btn"
                      variant="link"
                      type="submit"
                    >
                      Submit <MdOutlineArrowForward className="arrow-sign" />
                    </Button>
                  </Col>

                  <Col lg={12}>
                    <p className="all-login-p text-center mb-0">
                      By clicking Submit you agree with our Terms of Use &
                      Privacy Policy.
                    </p>
                    <p className="login-p link-color color-blue-link text-center">
                      <strong>
                        Have an account? <NavLink exact to="/login">Login</NavLink>
                      </strong>
                    </p>
                  </Col>
                </Row>

                <Row className="m-0-responsive">
                  <hr className="hr-color mt-1" />
                  <p className="text-center app-p mb-0">
                    <span>
                      <img src={downloadApp} alt="downloadApp" />
                    </span>
                    Download our app for:
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

        <div className="shape-footer-all">
          <img src={bgweball} alt="bgweball" />
        </div>
      </div>
    </section>
    );
};

export default SignUp;
