import React, { useEffect, useState } from "react";
import CommonLayout from "../../layouts/Common";
import shape from "../../assets/images/shape2.png";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { Alert, Button, Dropdown, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import settingView from "../../assets/images/myProfile.png";
import settingEdit from "../../assets/images/editPofile.png";
import settingUpload from "../../assets/images/updateLocation.png";
import settingReset from "../../assets/images/resetPassword.png";
import settingHide from "../../assets/images/hideProfile.png";
import settingDelete from "../../assets/images/deleteAccount.png";
import settingLogout from "../../assets/images/logout.png";
import manageMedia from "../../assets/images/manageMedia.png";
import viewedMe from "../../assets/images/viewedMe.png";
import myLikes from "../../assets/images/myLikes.png";
import likesMe from "../../assets/images/likesMe.png";
import homea from "../../assets/images/homea.png";
import liveicon from "../../assets/images/liveicon.png";
import yourm from "../../assets/images/yourm.png";
import blockedUsers from "../../assets/images/blockedUsers.png";
import serr from "../../assets/images/serr.png";
import OnlineUsers from "../profile/OnlineUsers/OnlineUsers";
import OnlineStatusUpdater from "../profile/OnlineUsers/OnlineStatusUpdater";
import axios from "axios";
const HideProfile = () => {
   const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
  const fetchProfileStatus = async () => {
    try {
      const response = await axios.get(
        `https://kiqko-backend.onrender.com/api/users/${userId}/profile-status`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setIsHidden(response.data.isHidden);
    } catch (err) {
      console.error('Error fetching profile status:', err);
    }
  };

  if (userId) {
    fetchProfileStatus();
  }
}, [userId]);

const handleHideProfile = async () => {
  try {
    setLoading(true);
    await axios.put(
      `https://kiqko-backend.onrender.com/api/users/${userId}/hide-profile`,
      { isHidden: true },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    setIsHidden(true);
    setError(null);
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to hide profile');
    console.error('Hide profile error:', err);
  } finally {
    setLoading(false);
  }
};

const handleUnhideProfile = async () => {
  try {
    setLoading(true);
    await axios.put(
      `https://kiqko-backend.onrender.com/api/users/${userId}/hide-profile`,
      { isHidden: false },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    setIsHidden(false);
    setError(null);
  } catch (err) {
    setError('Failed to unhide profile');
    console.error('Unhide profile error:', err);
  } finally {
    setLoading(false);
  }
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
                    <div className="top-user-id text-center">
                     <OnlineUsers/>
                    </div>

                    <div className="user-type-left">
                      <ul className="list-user-type left-nav">
                        <li>
                          <NavLink exact to="/profile" activeClassName="active">
                            <img src={homea} alt="homea" />
                            Home
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/search-results"
                            activeClassName="active"
                          >
                            <img src={serr} alt="liveicon" />
                            Search Results
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/live-users"
                            activeClassName="active"
                          >
                            <img src={liveicon} alt="liveicon" />
                            Live Users
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/who-viewed-you"
                            activeClassName="active"
                          >
                            <img src={viewedMe} alt="viewedMe" />
                            Who Viewed Me
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/who-likes-you"
                            activeClassName="active"
                          >
                            <img src={myLikes} alt="myLikes" />
                            Who Likes Me
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/my-likes"
                            activeClassName="active"
                          >
                            <img src={likesMe} alt="likesMe" />
                            My Likes
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/your-matches"
                            activeClassName="active"
                          >
                            <img src={yourm} alt="likesMe" />
                            Your Matches
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/blocked-users"
                            activeClassName="active"
                          >
                            <img src={blockedUsers} alt="blockedUsers" />
                            Blocked Users
                          </NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/profile" activeClassName="active">
                            {" "}
                            <img src={settingView} alt="settingView" />
                            View Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/edit-basics"
                            activeClassName="active"
                          >
                            {" "}
                            <img src={settingEdit} alt="settingEdit" />
                            Edit Profile{" "}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/manage-media"
                            activeClassName="active"
                          >
                            <img src={manageMedia} alt="manageMedia" />
                            Manage Media
                          </NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/reset-password">
                            <img src={settingReset} alt="settingReset" />
                            Reset Password
                          </NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/update-location">
                            <img src={settingUpload} alt="settingUpload" />
                            Update Location
                          </NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/hide-profile">
                            <img src={settingHide} alt="settingHide" />
                            Hide Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/delete-account">
                            <img src={settingDelete} alt="settingDelete" />
                            Delete Account
                          </NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/logout">
                            <img src={settingLogout} alt="settingLogout" />
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col md={9}>
      <div className="profile-main-part-area-inner bg-all-pages mb-0-see min-height-all mar-top-responsive">
        <Col md={12} className="all-title-top mb-4 text-center">
          <h4>{isHidden ? 'Profile is Hidden' : 'Hide Profile'}</h4>
        </Col>

        <div className="all-seting-area-pass">
          <Row>
            <Col md={12}>
              <p className="p-up-loc text-center mt-4 mb-2">
                {isHidden
                  ? 'Your profile is currently hidden.'
                  : 'Do you want to hide your profile?'}
              </p>
              <p className="p-up-loc text-center">
                Hiding your profile keeps you from being noticed by other users.
              </p>
            </Col>
          </Row>

          {error && (
            <Row>
              <Col md={12} className="text-center">
                <Alert variant="danger">{error}</Alert>
              </Col>
            </Row>
          )}

          <Row>
            <Col md={6} className="text-center up-field">
              <Button
                className="settings-btn mt-4 font-segoeui"
                variant="primary"
                disabled={loading || isHidden}
                onClick={handleHideProfile}
              >
                {loading && !isHidden ? <Spinner size="sm" animation="border" /> : 'Hide My Profile'}
              </Button>
            </Col>
            <Col md={6} className="text-center pl-hidebtn">
              <Button
                className="settings-btn mt-4 font-segoeui"
                variant="primary"
                disabled={loading || !isHidden}
                onClick={handleUnhideProfile}
              >
                {loading && isHidden ? <Spinner size="sm" animation="border" /> : 'Unhide My Profile'}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
              </Row>
               <OnlineStatusUpdater userId={localStorage.getItem("userId")} />
            </Container>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default HideProfile;
