import React, { useEffect, useState } from "react";
import CommonLayout from "../../layouts/Common";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import shape from "../../assets/images/shape2.png";
import fev1 from "../../assets/images/fev1.jpg";
import photo2 from "../../assets/images/photo2.jpg";

import photo7 from "../../assets/images/photo7.jpg";
import profile from "../../assets/images/profilep.jpg";
import { MdClear } from "react-icons/md";
import { MdOutlineArrowForward } from "react-icons/md";
import Form from "react-bootstrap/Form";

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
import {  useRef } from "react";
import axios from "axios"; // or your preferred HTTP client
import OnlineStatusUpdater from "../profile/OnlineUsers/OnlineStatusUpdater";
import { MdVideoLibrary } from 'react-icons/md';
const ManageMedia = () => {
    const [profileDetails, setProfileDetails] = useState(null);
    // State for uploaded media
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const userId = localStorage.getItem("userId");
  const fileInputRef = useRef(null);
   const [isSavingVideos, setIsSavingVideos] = useState(false);
     const videoInputRef = useRef(null);
       const [isLoadingVideo, setIsLoadingVideo] = useState(false);
       const [isVideoUploaded, setIsVideoUploaded] = useState(false);





   // Handle video file upload (no display)
  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes("video/")) {
      setError("Please upload a valid video file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Video file size should be less than 10MB");
      return;
    }

    setIsLoadingVideo(true);
    setError(null);

    const formData = new FormData();
    formData.append("video", file);

    try {
      await axios.post(
        `https://kiqko-backend.onrender.com/api/users/${userId}/video`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
setIsVideoUploaded(true);
      setSuccess("Video uploaded successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
    } finally {
      setIsLoadingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };

  // Fetch user media on component mount
  useEffect(() => {
    const fetchUserMedia = async () => {
      if (!userId) {
        setError("User not authenticated");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://kiqko-backend.onrender.com/api/users/${userId}/media`,
          
        );

        console.log("API Response:", response.data); // Debug log

        // Check response structure
        if (response.data && Array.isArray(response.data)) {
          // If the API returns an array directly
          const normalizedMedia = response.data.map((item) => ({
            _id: item._id || item.id,
            url: item.url,
          }));
          setMedia(normalizedMedia);
        } else if (response.data && Array.isArray(response.data.media)) {
          // If the API returns an object with media array
          const normalizedMedia = response.data.media.map((item) => ({
            _id: item._id || item.id,
            url: item.url,
          }));
          setMedia(normalizedMedia);
        } else if (
          response.data &&
          response.data.profile &&
          Array.isArray(response.data.profile.media)
        ) {
          // If the API returns a nested structure
          const normalizedMedia = response.data.profile.media.map((item) => ({
            _id: item._id || item.id,
            url: item.url,
          }));
          setMedia(normalizedMedia);
        } else {
          // Fallback for empty state
          setMedia([]);
        }

        setError(null);
      } catch (err) {
        console.error("Failed to fetch media:", err);
        setError("Failed to load media. Please refresh the page.");
        setMedia([]); // Reset to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMedia();
  }, [userId]);

  // Handle file upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const response = await fetch(
        `https://kiqko-backend.onrender.com/api/users/${userId}/media`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      console.log("Upload response:", data); // Debug log

      if (response.ok) {
        // Handle different response structures
        let newMedia = [];

        if (data.media && Array.isArray(data.media)) {
          newMedia = data.media.map((item) => ({
            _id: item._id || item.id,
            url: item.url,
          }));
        }

        // Update state with new media
        setMedia((prev) => {
          // Create a map of existing IDs to avoid duplicates
          const existingIds = new Set(prev.map((item) => item._id));
          // Only add items that don't already exist in the state
          const uniqueNewMedia = newMedia.filter(
            (item) => !existingIds.has(item._id)
          );
          return [...prev, ...uniqueNewMedia];
        });

        setSuccess("Upload successful!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle media deletion
  const handleDeleteMedia = async (mediaId) => {
    if (!mediaId) {
      console.error("Invalid media ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this media?")) {
      try {
        setIsLoading(true);
        await axios.delete(
          `https://kiqko-backend.onrender.com/api/users/${userId}/media/${mediaId}`,
         
        );

        setMedia((prev) => prev.filter((item) => item._id !== mediaId));
        setSuccess("Media deleted successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError("Failed to delete media. Please try again.");
        console.error("Delete error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `https://kiqko-backend.onrender.com/api/users/${userId}/media/order`,
        {
          mediaIds: media.map((m) => m._id),
        }
      );

      setSuccess("Changes saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to save changes. Please try again.");
      console.error("Save error:", err);
    } finally {
      setIsLoading(false);
    }
  };


    useEffect(() => {
    
    const fetchProfileDetails = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const detailsRes = await fetch(`https://kiqko-backend.onrender.com/api/users/profilee/${userId}`);
        const detailsData = await detailsRes.json();
        if (detailsRes.ok) {
          setProfileDetails(detailsData);
        } else {
          console.error('Error fetching profile:', detailsData.message);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

        fetchProfileDetails()
  }, []);


  // Save videos (no need to pass video IDs since they're not displayed)
  const handleSaveVideos = async () => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    setIsSavingVideos(true);
    try {
    

      setSuccess("Videos saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save videos");
    } finally {
      setIsSavingVideos(false);
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
                   <OnlineUsers/>

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
      <Col className="text-center pr-0-custom-res" md={9}>
      <div className="profile-main-part-area-inner bg-all-pages mar-top-responsive">
        <Col md={12} className="all-title-top mb-4">
          <h4>Media Gallery</h4>
          <p className="all-top-title text-center mt-4 mpt-0 font-segoeui">
            Here is where you can edit your photos and videos. <br />
            To be a verified member you need to add a minimum of five photos.
          </p>
        </Col>

        <Row className="mt-5 left-2row">
          <Col className="photo-list-all custom-4-grid" md={4}>
            <p className="p-p-profile">Your profile photo</p>
            <div className="profile-image position-relative">
              <span
                className="close-photo"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteMedia(profileDetails?.profilephotoId)}
              >
                <MdClear />
              </span>
              <img
                src={profileDetails?.profilephoto || profile}
                alt="profile"
                className="img-fluid rounded"
              />
            </div>
            
          </Col>

          <Col className="photo-list-all-media custom-8-grid p-0" md={8}>
            <ul className="list-unstyled d-flex flex-wrap gap-2">
              <li className="border-0">
                <div
                  className="add-photo-media d-flex align-items-center justify-content-center border border-dashed rounded"
                  style={{
                    width: "120px",
                    height: "120px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    multiple
                    disabled={isLoading}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  />
                  {!isLoading && (
                    <MdOutlineArrowForward size={32} color="#6f42c1" />
                  )}
                  {isLoading && (
                    <div className="spinner-border text-primary" role="status" />
                  )}
                </div>
              </li>

              {error && (
                <li className="w-100 text-danger mt-2">{error}</li>
              )}

              {!isLoading &&
                media.map((item) => (
                  <li
                    key={item._id}
                    style={{ width: "120px", height: "120px", position: "relative" }}
                  >
                    <div className="photo-list-media position-relative rounded overflow-hidden border">
                      <span
                        className="close-photo position-absolute top-0 end-0 m-1"
                        style={{
                          cursor: "pointer",
                          backgroundColor: "rgba(255,255,255,0.8)",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleDeleteMedia(item._id)}
                      >
                        <MdClear />
                      </span>
                      <img
                        src={item.url}
                        alt={`media-${item._id}`}
                        className="img-fluid h-100 w-100 object-fit-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </li>
                ))}

              {!isLoading &&
                Array.from({ length: Math.max(0, 11 - media.length) }).map(
                  (_, index) => (
                    <li
                      key={`empty-${index}`}
                      style={{ width: "120px", height: "120px" }}
                    >
                      <div className="photo-list-media rounded border bg-light"></div>
                    </li>
                  )
                )}
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="mt-5 text-center" md={12}>
            <NavLink exact to="/profile">
              <Button
                className="all-btn-round text-left font-segoeui"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
                <MdOutlineArrowForward className="arrow-sign arrowba ms-2" />
              </Button>
            </NavLink>
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}
          </Col>
        </Row>
        <Row className="mt-5">
                      <Col md={12}>
                        <h5 className="text-start mb-3">Upload Videos</h5>
                        <div className="video-upload-container">
                          <ul className="list-unstyled d-flex flex-wrap gap-2">
                            <li className="border-0">
                              <div
                                className="add-video-media d-flex align-items-center justify-content-center border border-dashed rounded"
                                style={{
                                  width: "200px",
                                  height: "120px",
                                  cursor: isLoadingVideo ? "not-allowed" : "pointer",
                                  position: "relative",
                                }}
                              >
                                <input
                                  type="file"
                                  ref={videoInputRef}
                                  onChange={handleVideoChange}
                                  accept="video/*"
                                  disabled={isLoadingVideo}
                                  style={{
                                    opacity: 0,
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    cursor: isLoadingVideo ? "not-allowed" : "pointer",
                                  }}
                                />
                                {!isLoadingVideo && (
                                  <>
                                    <MdVideoLibrary size={32} color="#6f42c1" />
                                    <span className="ms-2">Add Video</span>
                                  </>
                                )}
                                {isLoadingVideo && (
                                  <div className="spinner-border text-primary" role="status" />
                                )}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12} className="text-center">
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {success && <div className="alert alert-success mt-3">{success}</div>}
                        <Button
  variant="primary"
  onClick={handleSaveVideos}
  disabled={!isVideoUploaded || isLoadingVideo || isSavingVideos}
>
  {isSavingVideos ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
      Saving Videos...
    </>
  ) : (
    "Save Videos"
  )}
</Button>

                      </Col>
                    </Row>
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

export default ManageMedia;
