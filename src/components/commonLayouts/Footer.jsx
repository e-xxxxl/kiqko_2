import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import { DropdownButton, Nav } from 'react-bootstrap';
import './Footer.css';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const Footer = () => {
   const { i18n } = useTranslation();

  const languages = {
    en: 'English',
    fr: 'French',
    zh: 'Chinese',
    de: 'German',
    th: 'Thailand'
  };

  const getInitialLanguage = () => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    i18n.changeLanguage(savedLang);
    return languages[savedLang] || 'LANGUAGE';
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('appLanguage', lng);
    setSelectedLanguage(languages[lng]);
  };
    return (
        <div className="footer-area">
            <Container>
                <Row>
                    <Col md={3}>
                        <p className="p-copy-right">© Copyright 2022, KIQKO</p>
                    </Col>

                    <Col className="ps-0" md={7}>
                        <Nav className="nav-footer">
                            <Nav.Item>
                                <Nav.Link href="/terms">TERMS OF USE</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/privacy">PRIVACY POLICY</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/cookie-policy">COOKIE POLICY</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/safety-tips">SAFETY TIPS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/faq">FAQ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="li-dooted" href="/contact-us">
                                    CONTACT US
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

              <Col md={2}>
      <DropdownButton
        className="drop-down-custom"
        id="dropdown-basic-button"
        title={selectedLanguage}
      >
        {Object.entries(languages).map(([lng, label]) => (
          <Dropdown.Item key={lng} onClick={() => changeLanguage(lng)}>
            {label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default Footer;