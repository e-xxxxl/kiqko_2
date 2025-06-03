import React, { useEffect, useState } from "react";
import CommonLayout from "../../layouts/Common";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import shape from "../../assets/images/shape2.png";

import { NavLink } from "react-router-dom";
import fev1 from "../../assets/images/fev1.jpg";
import photo2 from "../../assets/images/photo2.jpg";
import photo3 from "../../assets/images/photo3.jpg";
import photo6 from "../../assets/images/photo6.jpg";
import photo7 from "../../assets/images/photo7.jpg";
import adda from "../../assets/images/addnew.png";
import Pagination from "react-bootstrap/Pagination";
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
import axios from "axios";
import { toast } from "react-toastify";

const Liveusers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10; // Adjust based on your UI

  useEffect(() => {
    const fetchLiveUsers = async () => {
      try {
        const response = await axios.get(
          `https://kiqko-backend.onrender.com/api/users/live-users`,
          {
            params: {
              page: currentPage,
              limit: usersPerPage,
            },
          }
        );

        setUsers(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        toast.error("Failed to load live users");
        console.error("Error fetching live users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveUsers();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading)
    return <div className="text-center py-5">Loading live users...</div>;

  return (
    <CommonLayout>
      <section className="all-top-shape">
        <img src={shape} alt="shape" />
      </section>
      <div className="all-container">
        <div className="pr pb-5 mb-5">
          <div className="page-wrapper-all">
            <Container>
              {/* responise-flex-column-reverse */}
              <Row className="m0-all pr-seti">
                <Col md={3}>
                  <div className="left-panel-allpages mar-top-left">
                    <div className="top-user-id text-center">
                      <div className="online-user-all">
                        <h5 className="border-h5">Users Online Now</h5>
                        <div className="online-user-status border-right-online">
                          <h6>Women</h6>
                          <h4>1234</h4>
                        </div>
                        <div className="online-user-status">
                          <h6>men</h6>
                          <h4>1565</h4>
                        </div>
                      </div>
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

                    <div className="add-banner-left add-nbanner-left2">
                      <img src={adda} alt="adda" />
                    </div>

                    <div className="add-banner-left add-nbanner-left2 mt-5">
                      <img src={adda} alt="addb" />
                    </div>
                  </div>
                </Col>
                <Col md={9}>
                  <div className="profile-main-part-area-inner bg-all-pages mar-top-responsive">
                    <Col md={12} className="all-title-top mb-4 text-center">
                      <h4>Live Users</h4>
                    </Col>

                    <Row>
                      <Col md={12} className="mt-4">
                        <ul className="search-user-list search-user-list2 mt-0">
                          {users.length === 0 ? (
                            <li className="text-center py-4">
                              No live users found
                            </li>
                          ) : (
                            users.map((user) => (
                              <li key={user._id}>
                                <NavLink to={`/userprofile/${user._id}`}>
                                  <img
                                    className="user-search-profile"
                                    src={
                                      user.profile?.profilephoto ||
                                      "/default-profile.png"
                                    }
                                    alt={user.username}
                                  />
                                </NavLink>
                                <div className="user-search-details">
                                  <div className="user-details-row">
                                    <h5>
                                      <NavLink to={`/userprofile/${user._id}`}>
                                        {user.username}
                                      </NavLink>
                                    </h5>
                                    <span>{user.profile?.age || "N/A"}</span>
                                  </div>
                                  <div className="user-details-row">
                                    <h6>
                                      {[
                                        user.profile?.gender,
                                        user.profile?.location?.city,
                                        user.profile?.location?.country,
                                      ]
                                        .filter(Boolean)
                                        .join(", ")}
                                    </h6>
                                    <Button variant="success">Connect</Button>
                                  </div>
                                </div>
                              </li>
                            ))
                          )}

                          {/* Ad banner - keep this if you want */}
                          <li className="full-width">
                            <Row>
                              <Col md={4} className="add-bannerall">
                                <img src={adda} alt="Advertisement 1" />
                              </Col>
                              <Col md={4} className="add-bannerall">
                                <img src={adda} alt="Advertisement 2" />
                              </Col>
                              <Col md={4} className="add-bannerall">
                                <img src={adda} alt="Advertisement 3" />
                              </Col>
                            </Row>
                          </li>
                        </ul>
                      </Col>
                    </Row>

                    {totalPages > 1 && (
                      <Row>
                        <Col md={12} className="pagination-list text-center">
                          <Pagination>
                            <Pagination.Prev
                              className="pagi-list-next-pre"
                              onClick={() =>
                                handlePageChange(Math.max(1, currentPage - 1))
                              }
                              disabled={currentPage === 1}
                            />

                            {[...Array(totalPages).keys()].map((page) => (
                              <Pagination.Item
                                key={page + 1}
                                active={page + 1 === currentPage}
                                onClick={() => handlePageChange(page + 1)}
                              >
                                {page + 1}
                              </Pagination.Item>
                            ))}

                            <Pagination.Next
                              className="pagi-list-next-pre"
                              onClick={() =>
                                handlePageChange(
                                  Math.min(totalPages, currentPage + 1)
                                )
                              }
                              disabled={currentPage === totalPages}
                            />
                          </Pagination>
                        </Col>
                      </Row>
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

export default Liveusers;
