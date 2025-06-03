import React, { useEffect, useState } from 'react';
import CommonLayout from "../../layouts/Common";
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import shape from '../../assets/images/shape2.png';
import './searchResultsTwo.css';
import { NavLink } from 'react-router-dom';
import fev1 from '../../assets/images/fev1.jpg';
import photo2 from '../../assets/images/photo2.jpg';
import photo3 from '../../assets/images/photo3.jpg';
import photo6 from '../../assets/images/photo6.jpg';
import photo7 from '../../assets/images/photo7.jpg';
import adda from '../../assets/images/addnew.png';
import Pagination from 'react-bootstrap/Pagination'
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
import OnlineUsers from '../profile/OnlineUsers/OnlineUsers';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ProgressBar } from 'react-bootstrap';

const SearchResultsTwo = () => {
   const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const userId = localStorage.getItem('userId');

      if (!userId) {
        alert('Please log in to view matches.');
        history.push('/login');
        return;
      }

      try {
        const response = await axios.get(
          `https://kiqko-backend.onrender.com/api/users/search-matches/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setMatches(response.data.matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
        alert('Error fetching matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [history]);

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
                      <OnlineUsers
                      />
                      
                      
                   </div>
                   
                   
                   <div className="user-type-left">
                       <ul className="list-user-type left-nav">
                           <li>
                           <NavLink exact to="/profile" activeClassName="active"><img src={homea} alt="homea" />HOME</NavLink>
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

                    <div className="add-banner-left add-nbanner-left2">
                    <img src={adda} alt="adda"/>
                    </div>

                    <div className="add-banner-left add-nbanner-left2 mt-5">
                    <img src={adda} alt="addb"/>
                    </div>
                    
                </div>
            </Col>
          <Col md={9}>
      <div className="profile-main-part-area-inner bg-all-pages mar-top-responsive">
        <Col md={12} className="all-title-top mb-4 text-center">
          <h4>Search Results</h4>
        </Col>

        {loading ? (
          <div>Loading matches...</div>
        ) : matches.length === 0 ? (
          <div>No matches found with at least two criteria in common.</div>
        ) : (
          <Row>
            <Col md={12} className="mt-4">
              <ul className="search-user-list search-user-list2 mt-0">
                {matches.map((match) => (
                  <li key={match._id}>
                    <img
                      className="user-search-profile"
                      src={match.profile?.profilephoto || '/default-profile.jpg'}
                      alt="profile"
                    />
                    <div className="user-search-details">
                      <div className="user-details-row">
                        <h5>
                          <NavLink to={`/profile/${match._id}`}>
                            {match.username}
                          </NavLink>
                        </h5>
                        <span>{match.profile?.age}</span>
                      </div>
                      <div className="user-details-row">
                        <h6>
                          {match.location?.city
                            ? `${match.location.city}, ${match.location.state || ''}`
                            : 'Location not specified'}
                        </h6>
                        <ProgressBar
                          now={match.matchPercentage}
                          label={`${match.matchPercentage}% Match`}
                          variant="success"
                          className="mt-2"
                          style={{ width: '200px' }}
                        />
                        {/* <Button variant="success" className="ml-2">
                          Connect
                        </Button> */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={12} className="pagination-list text-center">
            <Pagination>
              <Pagination.Prev className="pagi-list-next-pre" />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>
              <Pagination.Item>{6}</Pagination.Item>
              <Pagination.Next className="pagi-list-next-pre" />
            </Pagination>
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

export default SearchResultsTwo;