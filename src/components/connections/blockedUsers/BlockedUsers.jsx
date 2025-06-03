import React, { useEffect, useState } from "react";
import CommonLayout from "../../../layouts/Common";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-router-dom";
import shape from "../../../assets/images/shape2.png";
import fev1 from "../../../assets/images/fev1.jpg";
import photo2 from "../../../assets/images/photo2.jpg";
import photo3 from "../../../assets/images/photo3.jpg";
import photo4 from "../../../assets/images/photo4.png";
import photo5 from "../../../assets/images/photo5.png";
import myphoto from "../../../assets/images/myphoto.jpg";
import { MdClear } from "react-icons/md";

import settingView from "../../../assets/images/myProfile.png";
import settingEdit from "../../../assets/images/editPofile.png";
import settingUpload from "../../../assets/images/updateLocation.png";
import settingReset from "../../../assets/images/resetPassword.png";
import settingHide from "../../../assets/images/hideProfile.png";
import settingDelete from "../../../assets/images/deleteAccount.png";
import settingLogout from "../../../assets/images/logout.png";
import manageMedia from "../../../assets/images/manageMedia.png";
import viewedMe from "../../../assets/images/viewedMe.png";
import myLikes from "../../../assets/images/myLikes.png";
import likesMe from "../../../assets/images/likesMe.png";
import homea from "../../../assets/images/homea.png";
import liveicon from "../../../assets/images/liveicon.png";
import yourm from "../../../assets/images/yourm.png";
import blockedUserss from "../../../assets/images/blockedUsers.png";
import serr from "../../../assets/images/serr.png";
import axios from "axios";
import { toast } from "react-toastify";
import OnlineUsers from "../../profile/OnlineUsers/OnlineUsers";
const BlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get(
          `https://kiqko-backend.onrender.com/api/users/blocked-users/${currentUserId}`
        );
        setBlockedUsers(response.data.data || []);
      } catch (error) {
        toast.error("Failed to load blocked users");
        console.error("Error fetching blocked users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, [currentUserId]);

  const handleUnblock = async (blockedId) => {
    try {
      await axios.delete("https://kiqko-backend.onrender.com/api/users/unblock-user", {
        data: { blockerId: currentUserId, blockedId },
      });

      setBlockedUsers((prev) =>
        prev.filter((user) => user.blocked._id !== blockedId)
      );
      toast.success("User unblocked successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unblock user");
    }
  };

 if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-purple" style={{ width: '3rem', height: '3rem', borderWidth: '0.2rem', borderColor: '#9c27b0', borderRightColor: 'transparent' }}></div>
    </div>
);
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
                            <img src={blockedUserss} alt="blockedUsers" />
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
                  <div className="profile-main-part-area-inner bg-all-pages mar-top-responsive">
                    <Col md={12} className="all-title-top mb-4 text-center">
                      <h4>Blocked Users</h4>
                    </Col>

                    {blockedUsers.length === 0 ? (
                      <Col md={12} className="text-center">
                        <p>You haven't blocked any users yet</p>
                      </Col>
                    ) : (
                      <Col
                        className="photo-list-all all-margin-connection all-user-pic width-cons"
                        md={12}
                      >
                        <ul>
                          {blockedUsers.map(({ blocked }) => (
                            <li key={blocked._id}>
                              <div className="photo-list">
                                <span
                                  className="close-photo"
                                  onClick={() => handleUnblock(blocked._id)}
                                >
                                  <MdClear />
                                </span>
                                <img
                                  src={
                                    blocked.profile?.profilephoto ||
                                    "/default-profile.png"
                                  }
                                  alt={blocked.username}
                                />
                                <div className="username-text">
                                  {blocked.username}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    )}
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

export default BlockedUsers;
