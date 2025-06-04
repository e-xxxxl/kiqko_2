import React, { useEffect, useState } from 'react';
import CommonLayout from "../../../layouts/Common";
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import { NavLink } from 'react-router-dom';
import shape from '../../../assets/images/shape2.png';
import fev1 from '../../../assets/images/fev1.jpg';
import photo2 from '../../../assets/images/photo2.jpg';
import photo3 from '../../../assets/images/photo3.jpg';
import photo4 from '../../../assets/images/photo4.png';
import photo5 from '../../../assets/images/photo5.png';
import photo6 from '../../../assets/images/photo6.jpg';
import photo7 from '../../../assets/images/photo7.jpg';
import myphoto from '../../../assets/images/myphoto.jpg';
import { MdClear } from 'react-icons/md';

import settingView from '../../../assets/images/myProfile.png';
import settingEdit from '../../../assets/images/editPofile.png';
import settingUpload from '../../../assets/images/updateLocation.png';
import settingReset from '../../../assets/images/resetPassword.png';
import settingHide from '../../../assets/images/hideProfile.png';
import settingDelete from '../../../assets/images/deleteAccount.png';
import settingLogout from '../../../assets/images/logout.png';
import manageMedia from '../../../assets/images/manageMedia.png';
import viewedMe from '../../../assets/images/viewedMe.png';
import myLikes from '../../../assets/images/myLikes.png';
import likesMe from '../../../assets/images/likesMe.png';
import homea from '../../../assets/images/homea.png';
import liveicon from '../../../assets/images/liveicon.png';
import yourm from '../../../assets/images/yourm.png';
import blockedUsers from '../../../assets/images/blockedUsers.png';
import serr from '../../../assets/images/serr.png';
import OnlineUsers from '../../profile/OnlineUsers/OnlineUsers';
const YourMatches = () => {
     const [similarUsers, setSimilarUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchSimilarUsers = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch(`https://kiqko-backend.onrender.com/api/users/similar-users/${userId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await response.json();
        console.log('Fetched users:', data);
        setSimilarUsers(data);
        
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarUsers();
  }, [userId]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-purple" style={{ width: '3rem', height: '3rem', borderWidth: '0.2rem', borderColor: '#9c27b0', borderRightColor: 'transparent' }}></div>
    </div>
  );

  if (error) {
    return <div className="text-center py-4 text-danger">Error: {error}</div>;
  }

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
      <div className="profile-main-part-area-inner bg-all-pages mar-top-responsive">
        <Col md={12} className="all-title-top mb-4 text-center">
          <h4>Your Matches</h4>
        </Col>
        <Col className="photo-list-all all-margin-connection all-user-pic width-cons" md={12}>
          <ul>
            {/* Your profile photo */}
           
            
            {/* Dynamically render similar users */}
            {similarUsers.map((user, index) => (
              <li key={user._id || index}>
                  <NavLink to={`/userprofile/${user._id}`}>
                <div className="photo-list">
                  <span className="close-photo"><MdClear /></span>
                  <img 
                    src={
                      user.profilephoto?.trim() || 
                      user.profile?.profilephoto?.trim() ||
                      'https://cdn-icons-png.flaticon.com/512/847/847969.png'
                    }
                    alt={user.username || `user-${index}`} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'default-profile-image.jpg'
                    }}
                  />
                </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </Col>
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

export default YourMatches;