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
import './login.css';
import { NavLink, useHistory } from 'react-router-dom';
import CommonLayout from '../../../layouts/Common';
import Swal from 'sweetalert2';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch('https://kiqko-backend.onrender.com/api/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ usernameOrEmail, password }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success!',
  //         text: 'Login successful!',
  //         timer: 2000,
  //         showConfirmButton: false
  //       });
  //       localStorage.setItem('userId', data.user);
  //       history.push('/profile');
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: data.message || 'Invalid credentials.',
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Login failed. Please try again.',
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('https://kiqko-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login successful!',
        timer: 2000,
        showConfirmButton: false
      });

      const userId = data.user;
      localStorage.setItem('userId', userId);

      // 🔹 Send Location
      const tempLocation = localStorage.getItem('tempLocationData');
      if (tempLocation) {
        const locationData = JSON.parse(tempLocation);
        await fetch(`https://kiqko-backend.onrender.com/api/users/update-location/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            city: locationData.city,
            state: locationData.state,
            country: locationData.country,
          }),
        });
        localStorage.removeItem('tempLocationData');
      }

      // 🔹 Send Headline
      const headlineData = localStorage.getItem('tempHeadlineData');
      if (headline) {
        const { headline } = JSON.parse(headlineData);
        await fetch(`https://kiqko-backend.onrender.com/api/users/headline/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ headline }),
        });
        localStorage.removeItem('headline');
      }

      // 🔹 Send Compliment
      const complimentData = localStorage.getItem('tempComplimentData');
      if (complimentData) {
        const { compliment } = JSON.parse(complimentData);
        await fetch(`https://kiqko-backend.onrender.com/api/users/compliment/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ compliment }),
        });
        localStorage.removeItem('tempComplimentData');
      }

      // 🔹 Send Dealbreakers
      const dealbreakerData = localStorage.getItem('tempDealbreakerData');
      if (dealbreakerData) {
        const { dealbreakers } = JSON.parse(dealbreakerData);
        await fetch(`https://kiqko-backend.onrender.com/api/users/dealbreaker/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dealbreakers }),
        });
        localStorage.removeItem('tempDealbreakerData');
      }

      // 🔹 Send About Essay
      const aboutEssayData = localStorage.getItem('tempaboutYouEssay');
      if (aboutEssayData) {
        const { essay } = JSON.parse(aboutEssayData);
        await fetch(`https://kiqko-backend.onrender.com/api/users/about/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ about: essay }),
        });
        localStorage.removeItem('tempaboutYouEssay');
      }

      // 🔹 Send Photo
      const profilePhoto = localStorage.getItem('profilePhoto');
      if (profilePhoto) {
        const formData = new FormData();
        const blob = await (await fetch(profilePhoto)).blob();
        formData.append('profilePhoto', blob, 'profile.jpg');

        const uploadRes = await fetch(`https://kiqko-backend.onrender.com/api/users/upload-photo/${userId}`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          console.error('Photo upload failed');
        } else {
          localStorage.removeItem('profilePhoto');
        }
      }

      // ✅ Done, go to profile
      history.push('/profile');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message || 'Invalid credentials.',
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Login failed. Please try again.',
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <CommonLayout>
      <section className="all-top-shape">
        <img src={shape} alt="shape" />
        <h1>Sign In</h1>
      </section>
      <div className="all-container">
        <div className="all-container-inner setting-area">
          <Container>
            <div className="all-seting-area-pass">
              <Row>
                <Col md={12}>
                  <p className="p-up-loc text-center mb-2">Welcome Back!</p>
                  <p className="p-up-loc text-center">
                    You may sign in with your new password to access your KIQKO account.
                  </p>
                </Col>
              </Row>
              <Form onSubmit={handleLogin}>
                <Row className="mt-3">
                  <Col md={6}>
                    <Form.Control
                      className="input-settings text-center"
                      type="email"
                      placeholder="Email"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      className="input-settings text-center"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mt-4 pt-2">
                  <Col md={6}>
                    <Form.Group className="mb-3 check-form" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <p className="p-up-loc text-end forget-pss">Forgot your password?</p>
                  </Col>
                </Row>

                <Col md={6} className="text-center offset-md-3">
                  <Button className="settings-btn mt-4" variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </Col>
              </Form>
            </div>
          </Container>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Login;