import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './NavHeader.css';

// Import your images
import useravatar from '../../assets/images/fev1.jpg';
import searchnav from '../../assets/images/searchnav.png';
import golive from '../../assets/images/golive.png';
import postvodeo from '../../assets/images/postvodeo.png';
import uploadimage from '../../assets/images/uploadimage.png';
import chat from '../../assets/images/chat.png';
import notification from '../../assets/images/notification.png';
import logoi from '../../assets/images/logo-inner.png';

const NavHeader = () => {
    return (
        <Navbar expand="lg" className="customHeader" collapseOnSelect>
            <Container fluid> {/* Use fluid for full width */}
                {/* Logo - Always on the left */}
                <Navbar.Brand as={NavLink} to="/">
                    <img src={logoi} alt="logo" className="logo-img" />
                </Navbar.Brand>

                {/* Wrapper for Toggler and Mobile User Avatar, aligned to the right on small screens */}
                <div className="d-flex align-items-center ms-auto">
                    {/* Mobile User Avatar (visible only on small screens) */}
                    <Nav className="d-lg-none me-3"> {/* d-lg-none hides it on 'lg' and up, me-3 adds space */}
                        <Dropdown align="end" className="useravatar-dropdown-mobile">
                            <Dropdown.Toggle id="dropdown-user-mobile" className="user-toggle">
                                <div className="user-avatar-small">
                                    <img src={useravatar} alt="user avatar" />
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-custom">
                                {/* Add your mobile dropdown items here */}
                                <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/settings">Settings</Dropdown.Item>
                                <Dropdown.Item onClick={() => console.log('Logout')}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>

                    {/* Navbar Toggler (Hamburger Icon) */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggler-custom" />
                </div>

                {/* Collapsible content (main nav links and desktop user avatar) */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* Main Navigation Links - Centered on desktop, full width vertical on mobile */}
                    <Nav className="main-nav mx-auto my-3 my-lg-0">
                        <NavLink to="/search-filters" className="nav-link-item" activeClassName="active">
                            <span className="nav-icon"><img src={searchnav} alt="search" /></span>
                            <span className="nav-text">SEARCH</span>
                        </NavLink>
                        <NavLink to="" className="nav-link-item" activeClassName="active">
                            <span className="nav-icon"><img src={golive} alt="go live" /></span>
                            <span className="nav-text">Go Live</span>
                        </NavLink>
                        <NavLink to="/" className="nav-link-item" activeClassName="active">
                            <span className="nav-icon"><img src={postvodeo} alt="post video" /></span>
                            <span className="nav-text">Post video</span>
                        </NavLink>
                        <NavLink to="/" className="nav-link-item" activeClassName="active">
                            <span className="nav-icon"><img src={uploadimage} alt="upload" /></span>
                            <span className="nav-text">Upload Image</span>
                        </NavLink>
                        <NavLink to="/chat" className="nav-link-item" activeClassName="active">
                            <span className="nav-icon"><img src={chat} alt="chat" /></span>
                            <span className="nav-text">Chat</span>
                        </NavLink>
                        <NavLink to="/Notifications" className="nav-link-item" activeClassName="active">
                            <span className="nav-icon"><img src={notification} alt="notification" /></span>
                            <span className="nav-text">Notifications</span>
                        </NavLink>
                    </Nav>

                    {/* Desktop User Avatar (visible only on large screens and up) */}
                    <Nav className="d-none d-lg-block ms-auto"> {/* d-none hides on small, d-lg-block shows on 'lg' and up */}
                        <Dropdown align="end" className="useravatar-dropdown-desktop">
                            <Dropdown.Toggle id="dropdown-user-desktop" className="user-toggle">
                                <div className="user-avatar-desktop">
                                    <img src={useravatar} alt="user avatar" />
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-custom">
                                {/* Add your desktop dropdown items here */}
                                <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to="/settings">Settings</Dropdown.Item>
                                <Dropdown.Item onClick={() => console.log('Logout')}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavHeader;