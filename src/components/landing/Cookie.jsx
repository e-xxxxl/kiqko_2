import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Cookies.css';

const Cookie = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
            // Optional: Prevent scrolling too
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleConsent = (value) => {
        localStorage.setItem('cookieConsent', value);
        setShowBanner(false);
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (!showBanner) return null;

    return (
        <div className="cookie-overlay">
            <div className="cookie-consent-banner">
                <div className="cookie-content">
                    <p>
                        We use cookies to enhance your experience on our platform. 
                        By continuing to browse, you agree to our use of cookies.
                        <a href="/privacy-policy" className="cookie-policy-link"> Learn more</a>
                    </p>
                    <div className="cookie-buttons">
                        <Button 
                            variant="primary" 
                            onClick={() => handleConsent('accepted')}
                            className="cookie-accept-btn"
                        >
                            Accept
                        </Button>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => handleConsent('declined')}
                            className="cookie-decline-btn"
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cookie;
