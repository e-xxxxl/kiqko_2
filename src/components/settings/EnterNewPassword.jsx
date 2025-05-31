import React, { useState } from 'react';
import CommonLayout from '../../layouts/Common';
import shape from '../../assets/images/shape2.png';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import { Button, Dropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './Setting.css';
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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const EnterNewPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    // Basic validation
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    //  http://localhost:5000/api/auth/reset-password
    setIsResetting(true);
    try {
      const res = await fetch(
        "https://kiqko-backend.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            currentPassword,
            newPassword,
          }),
        }
      );

      // First check if the response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(text || "Server returned non-JSON response");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      // Show success message
      alert("Password reset successfully!");

      // Optionally redirect to profile page
      history.push("/profile");
    } catch (err) {
      console.error("Error resetting password:", err);
      // Show the raw error message if it's HTML, but truncate it
      const errorMessage = err.message.includes("<!DOCTYPE")
        ? "Server error occurred"
        : err.message;
      alert(errorMessage);
    } finally {
      setIsResetting(false);
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
  <div className="profile-main-part-area-inner setting-area bg-all-pages mb-0-see">
    <Col md={12} className="all-title-top mb-4 text-center">
      <h4>Reset Password</h4>
    </Col>
    <div className="all-seting-area-pass">
      <form onSubmit={handleResetPassword}>
        <Row>
          <div md={12} className="mt-4">
            <p className="p-up-loc text-left">Password is case sensitive and must contain:</p>
          </div>
          
          <Col md={12}>
            <ul className="ul-setting">
              <li>- At least 6 characters</li>
              <li>- At least 1 uppercase letter</li>
              <li>- At least 1 lowercase letter</li>
              <li>- At least 1 number</li>
              <li>- At least 1 special character</li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={6}>
            <Form.Control 
              className="input-settings text-center" 
              type="password" 
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Col>
          <Col md={6}>
            {/* Empty column for layout balance */}
          </Col>
          
          <Col md={6}>
            <Form.Control 
              className="input-settings text-center" 
              type="password" 
              placeholder="New Password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Col>
          <Col md={6}>
            <Form.Control 
              className="input-settings text-center" 
              type="password" 
              placeholder="Confirm New Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Col>
          
          <Col md={6} className="text-center offset-md-3">
            <Button 
              className="settings-btn mt-5" 
              variant="primary" 
              type="submit"
              disabled={isResetting}
            >
              {isResetting ? "Resetting..." : "Reset Password"}
            </Button>
          </Col>
        </Row>
      </form>
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

export default EnterNewPassword;