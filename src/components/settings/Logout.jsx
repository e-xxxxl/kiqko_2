import React, { useState } from 'react';
import CommonLayout from '../../layouts/Common';
import shape from '../../assets/images/shape2.png';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import { Button, Dropdown } from 'react-bootstrap';
import hideicon from '../../assets/images/hide.png';
import { NavLink } from 'react-router-dom';


import settingView from '../../assets/images/myProfile.png';
import settingEdit from '../../assets/images/editPofile.png';
import settingUpload from '../../assets/images/updateLocation.png';
import settingReset from '../../assets/images/resetPassword.png';
import settingHide from '../../assets/images/hideProfile.png';
import settingDelete from '../../assets/images/deleteAccount.png';
import settingLogout from '../../assets/images/logout.png';
import manageMedia from '../../assets/images/manageMedia.png';
import viewedMe from '../../assets/images/viewedMe.png';
import myLikes from '../../assets/images/myLikes.png';
import likesMe from '../../assets/images/likesMe.png';
import homea from '../../assets/images/homea.png';
import liveicon from '../../assets/images/liveicon.png';
import yourm from '../../assets/images/yourm.png';
import blockedUsers from '../../assets/images/blockedUsers.png';
import serr from '../../assets/images/serr.png';
import './Setting.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import OnlineUsers from '../profile/OnlineUsers/OnlineUsers';


const Logout = () => {

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const history = useHistory();

    const handleLogout = () => {
        setIsLoggingOut(true);
        try {
            // Clear all user-related data from localStorage
            localStorage.removeItem('userId');
            localStorage.removeItem('userData');
            localStorage.removeItem('profileData');

            // Redirect to home page
            history.push('/');
            window.location.reload(); // Optional: if you want to fully reset the app state
        } catch (err) {
            console.error('Error during logout:', err);
            alert('An error occurred during logout');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleCancel = () => {
        // Navigate back or to another page
        history.goBack();
    };
    return (

        <CommonLayout>
            <section className="all-top-shape">
                <img src={shape} alt="shape" />
            </section>
            <div className="all-container">
                <div className="pr pb-5 mb-5">
                    <div className="page-wrapper-all">
                        <Container>
                            <Row>
                                <Col md={3}>
                                    <div className="left-panel-allpages mar-top-left">
                                        <OnlineUsers/>


                                        <div className="user-type-left">
                                            <ul className="list-user-type left-nav">
                                                <li>
                                                    <NavLink exact to="/profile" activeClassName="active"><img src={homea} alt="homea" />Home</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink exact to="/search-results" activeClassName="active"><img src={serr} alt="liveicon" />Search Results</NavLink>
                                                </li>
                                                <li><NavLink exact to="/live-users" activeClassName="active"><img src={liveicon} alt="liveicon" />Live Users</NavLink></li>
                                                <li><NavLink exact to="/who-viewed-you" activeClassName="active"><img src={viewedMe} alt="viewedMe" />Who Viewed Me</NavLink></li>
                                                <li><NavLink exact to="/who-likes-you" activeClassName="active"><img src={myLikes} alt="myLikes" />Who Likes Me</NavLink></li>
                                                <li><NavLink exact to="/my-likes" activeClassName="active"><img src={likesMe} alt="likesMe" />My Likes</NavLink></li>
                                                <li><NavLink exact to="/your-matches" activeClassName="active"><img src={yourm} alt="likesMe" />Your Matches</NavLink></li>
                                                <li><NavLink exact to="/blocked-users" activeClassName="active"><img src={blockedUsers} alt="blockedUsers" />Blocked Users</NavLink></li>
                                                <li><NavLink exact to="/profile" activeClassName="active"> <img src={settingView} alt="settingView" />View Profile</NavLink></li>
                                                <li><NavLink exact to="/edit-basics" activeClassName="active"> <img src={settingEdit} alt="settingEdit" />Edit Profile </NavLink></li>
                                                <li><NavLink exact to="/manage-media" activeClassName="active"><img src={manageMedia} alt="manageMedia" />Manage Media</NavLink></li>
                                                <li><NavLink exact to="/reset-password"><img src={settingReset} alt="settingReset" />Reset Password</NavLink></li>
                                                <li><NavLink exact to="/update-location"><img src={settingUpload} alt="settingUpload" />Update Location</NavLink></li>
                                                <li><NavLink exact to="/hide-profile"><img src={settingHide} alt="settingHide" />Hide Profile</NavLink></li>
                                                <li><NavLink exact to="/delete-account"><img src={settingDelete} alt="settingDelete" />Delete Account</NavLink></li>
                                                <li><NavLink exact to="/logout"><img src={settingLogout} alt="settingLogout" />Logout</NavLink></li>


                                            </ul>
                                        </div>



                                    </div>
                                </Col>
                                <Col md={9}>
                                    <div className="profile-main-part-area-inner bg-all-pages mb-0-see">
                                        <Col md={12} className="all-title-top mb-4 text-center">
                                            <h4>Logout</h4>
                                        </Col>
                                        <div className="all-seting-area-pass">
                                            <Row>
                                                <Col md={12}>
                                                    <p className="p-up-loc text-center">Are you sure you want to logout?</p>
                                                </Col>
                                            </Row>
                                            <Col md={12} className="text-center mt-5 mb-2">
                                                <img className="change-icon" src={hideicon} alt="hideicon" />
                                            </Col>

                                            <Row>
                                                <Col md={6} className="pr-1 up-field">
                                                    <Button
                                                        className="btn-upgrade btn-later font-segoeui"
                                                        variant="primary"
                                                        onClick={handleCancel}
                                                        disabled={isLoggingOut}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Col>
                                                <Col md={6} className="pl-0 up-field">
                                                    <Button
                                                        className="btn-upgrade btn-upgrade-now font-segoeui"
                                                        variant="primary"
                                                        onClick={handleLogout}
                                                        disabled={isLoggingOut}
                                                    >
                                                        {isLoggingOut ? 'Logging out...' : 'Yes'}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                </div>
            </div>
        </CommonLayout>


    );
};

export default Logout;