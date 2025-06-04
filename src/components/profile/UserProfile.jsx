// import React, { useState, useEffect } from 'react';
// import { useParams, NavLink } from 'react-router-dom';
// import { MdNearMe, MdVerified, MdLocationOn, MdCalendarToday } from 'react-icons/md';
// import { FaHeart, FaComment, FaVideo, FaEllipsisH } from 'react-icons/fa';
// import { IoMdSend } from 'react-icons/io';
// import { BsGenderAmbiguous, BsPerson, BsPeople, BsHeartFill } from 'react-icons/bs';
// import { RiVipCrownLine } from 'react-icons/ri';
// import { GiBodyHeight, GiFamilyHouse } from 'react-icons/gi';
// import { HiOutlineEmojiHappy } from 'react-icons/hi';
// import { BiBlock, BiHide } from 'react-icons/bi';
// import { FiFlag } from 'react-icons/fi';

// import shape from '../../assets/images/shape2.png';
// import bgweball from '../../assets/images/bgweball.png';
// import profile from '../../assets/images/profilep.jpg';
// import verifiedBadge from '../../assets/images/verified-vac.png';
// import vaccineIcon from '../../assets/images/vaccineIcon.png';
// import { useHistory } from 'react-router-dom';
// import ImageGallary from '../imageGallary/ImageGallary';
// import SimilarUsersSection from './SimilarUsersSection/SimilarUsersSection';
// import axios from 'axios';
// import OnlineStatusUpdater from './OnlineUsers/OnlineStatusUpdater';

// const UserProfile = () => {
//        const currentUserId = localStorage.getItem('userId');
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [profileDetails, setProfileDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isShowHideFormSearch, setIsShowHideFormSearch] = useState(false);
//   const [isShowBlockUser, setIsBlockUser] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
        
//         const [userResponse, profileResponse] = await Promise.all([
//           fetch(`https://kiqko-backend.onrender.com/api/users/profile/${userId}`),
//           fetch(`https://kiqko-backend.onrender.com/api/users/profilee/${userId}`)
//         ]);

//         if (!userResponse.ok || !profileResponse.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const userData = await userResponse.json();
//         const profileData = await profileResponse.json();

//         setUser(userData);
//         setProfileDetails(profileData);

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [userId]);

//   const viewProfileImg = () => {
//     // Implement image viewer modal
//   };

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;
    
//     try {
//       // Implement send message API call
//       setMessage('');
//     } catch (err) {
//       console.error('Failed to send message:', err);
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="text-center py-8 text-red-500">
//       <p>Error loading profile: {error}</p>
//       <button 
//         onClick={() => window.location.reload()}
//         className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//       >
//         Try Again
//       </button>
//     </div>
//   );

//   if (!user) return <div className="text-center py-8">User not found</div>;



// const handleLike = async () => {
//   try {
//     const res = await axios.post('https://kiqko-backend.onrender.com/api/users/' + userId + '/like', {
//       userId: currentUserId,
//     });
//     alert(res.data.message);
//   } catch (err) {
//     console.error('Like error:', err.response?.data || err.message);
//     alert(err.response?.data?.message || 'Error');
//   }

//   console.log('currentUserId:', currentUserId);
//   console.log('targetUserId:', userId);
// };


//   return (
//     <>
    
//     <div className="container py-5">
//   <div className="card shadow overflow-hidden">
    
//     {/* Cover Photo */}
//     <div className="position-relative" style={{ height: "12rem", background: "linear-gradient(to right, #a855f7, #ec4899)" }}></div>

//     {/* Profile Picture */}
//     <div className="position-absolute top-100 start-50 translate-middle">
//       <div className="position-relative">
//         <img
//           src={profileDetails?.profilephoto || profile}
//           alt="profile"
//           className="rounded-circle border border-white shadow"
//           style={{ width: "8rem", height: "8rem", objectFit: "cover", cursor: "pointer" }}
//           onClick={viewProfileImg}
//         />
//         {user.isVerified && (
//           <div className="position-absolute bottom-0 end-0 bg-white p-1 rounded-circle shadow">
//             <MdVerified className="text-primary fs-5" />
//           </div>
//         )}
//       </div>
//     </div>

//     {/* Profile Info */}
//     <div className="text-center mt-5 pt-5 px-3">
//       <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
//         <h1 className="h4 fw-bold text-dark mb-0">{user.username}</h1>
//         {user.isVaccinated && (
//           <div className="position-relative">
//             <img src={vaccineIcon} alt="vaccinated" className="img-fluid" style={{ width: "20px", height: "20px" }} />
//             <div className="position-absolute start-50 translate-middle-x bg-white text-dark small p-2 rounded shadow d-none">
//               Vaccinated <BsHeartFill className="text-danger" />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="d-flex justify-content-center gap-4 text-muted mb-3">
//         <div className="d-flex align-items-center">
//           <MdLocationOn className="me-1" />
//           <span>
//             {profileDetails?.city && profileDetails?.country
//               ? `${profileDetails.city}, ${profileDetails.country}`
//               : 'Location not set'}
//           </span>
//         </div>
//         <div className="d-flex align-items-center">
//           <MdCalendarToday className="me-1" />
//           <span>
//             Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
//           </span>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
//         <button className="btn btn-outline-primary d-flex align-items-center gap-1">
//           <IoMdSend />
//           Message
//         </button>
//         <button onClick={handleLike} className="btn btn-outline-danger d-flex align-items-center gap-1">
//           <FaHeart />
//           Like
//         </button>
//         <NavLink to={`/chat/${userId}`} className="btn btn-outline-success d-flex align-items-center gap-1">
//           <FaComment />
//           Chat
//         </NavLink>
//         <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
//           <FaVideo />
//           Video
//         </button>

//         {/* Dropdown */}
//         <div className="dropdown">
//           <button
//             className="btn btn-outline-dark dropdown-toggle"
//             type="button"
//             data-bs-toggle="dropdown"
//           >
//             <FaEllipsisH />
//           </button>
//           <ul className="dropdown-menu">
//             <li>
//               <button
//                 className="dropdown-item d-flex align-items-center gap-2"
//                 onClick={() => setIsShowHideFormSearch(true)}
//               >
//                 <BiHide /> Hide from search
//               </button>
//             </li>
//             <li>
//               <button
//                 className="dropdown-item d-flex align-items-center gap-2"
//                 onClick={() => setIsBlockUser(true)}
//               >
//                 <BiBlock /> Block user
//               </button>
//             </li>
//             <li>
//               <NavLink
//                 to={`/report/${userId}`}
//                 className="dropdown-item d-flex align-items-center gap-2"
//               >
//                 <FiFlag /> Report
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Continue converting other sections like Bio Info, Headline, etc. */}
//     </div>
//   </div>

//   {/* Modals and Additional Sections */}
//   <SimilarUsersSection />
//   {isShowHideFormSearch && <HideFormSearchModal onClose={() => setIsShowHideFormSearch(false)} userId={userId} />}
//   {isShowBlockUser && <BlockUserModal onClose={() => setIsBlockUser(false)} userId={userId} />}
// </div>

    
//     </>
//   )
// }

// export default UserProfile


import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import CommonLayout from "../../layouts/Common";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
// import { NavLink } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';

import "./profile.css";
import shape from "../../assets/images/shape2.png";
import proficon from "../../assets/images/prof-icon.jpg";
import vaccineIcon from "../../assets/images/vaccineIcon.png";
import profile from "../../assets/images/pfp.png";
import profile2 from "../../assets/images/photo3.jpg";
import profile3 from "../../assets/images/photo7.jpg";
import profile4 from "../../assets/images/prs.png";
import profile5 from "../../assets/images/photo6.jpg";
import profile6 from "../../assets/images/photo5.png";
import profile7 from "../../assets/images/fev1.jpg";
import profile8 from "../../assets/images/photo4.png";
import location from "../../assets/images/location.jpg";
import icon1profile from "../../assets/images/icon1.png";
import icon2profile from "../../assets/images/icon2.png";
import icon3profile from "../../assets/images/icon3.png";
import icon4profile from "../../assets/images/vidoechatcon.png";
import Dropdown from "react-bootstrap/Dropdown";
// import videoicon from '../../assets/images/video-icon.png';
// import add1 from '../../assets/images/add1.png';
// import add2 from '../../assets/images/add2.png';
import sm1 from "../../assets/images/sm1.png";
import sm2 from "../../assets/images/sm2.png";
import sm3 from "../../assets/images/sm3.png";
import sm4 from "../../assets/images/sm4.png";
// import previcon from '../../assets/images/pre.png';
// import nexticon from '../../assets/images/next.png';
import { MdChevronLeft, MdChevronRight, MdNearMe } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdClear } from "react-icons/md";

import gender from "../../assets/images/gender.png";
import ages from "../../assets/images/ages.png";
import race from "../../assets/images/race.png";
import maritalstatus from "../../assets/images/maritalstatus.png";
import bodytype from "../../assets/images/bodytype.png";
import havekids from "../../assets/images/havekids.png";
import wantkids from "../../assets/images/wantkids.png";
import herefor from "../../assets/images/herefor.png";
import relocate from "../../assets/images/relocate.png";
import calendar from "../../assets/images/calendar.png";
import threedots from "../../assets/images/3dots.png";
import hideicona from "../../assets/images/hideicona.png";
import blockusericon from "../../assets/images/blockusericon.png";
import reporticon from "../../assets/images/reporticon.png";
import likevac from "../../assets/images/likevac.png";
import verifiedvac from "../../assets/images/verified-vac.png";
import adda from "../../assets/images/addnew.png";
import profilicon1 from "../../assets/images/rewind.png";
import profilicon2 from "../../assets/images/x.png";
import profilicon3 from "../../assets/images/right1.png";
import profilicon4 from "../../assets/images/next1.png";
import ImageGallary from "../imageGallary/ImageGallary";
import { useModal } from "react-hooks-use-modal";
import HideFormSearch from "./HideFormSearch";
import BlockUserPro from "./BlockUserPro";
import Accordion from "react-bootstrap/Accordion";
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
import bodytype2 from "../../assets/images/body-type.png";
import kids2 from "../../assets/images/kids.png";
import wantkids2 from "../../assets/images/want-kids.png";
import herefor2 from "../../assets/images/here-for.png";
import profilevid from "../../assets/images/profilevid.png";
import serr from "../../assets/images/serr.png";

import utils from "../utils";
import { Link } from "react-router-dom/cjs/react-router-dom";
import SimilarUsersSection from "./SimilarUsersSection/SimilarUsersSection";
import OnlineUsers from "./OnlineUsers/OnlineUsers";
import OnlineStatusUpdater from "./OnlineUsers/OnlineStatusUpdater";
import axios from "axios";
import moment from 'moment';
import Swal from 'sweetalert2';

const UserProfile = () => {
  const currentUserId = localStorage.getItem('userId');
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [user1, setUser1] = useState({});
  const [profileDetails, setProfileDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [isShowHideFormSearch, setIsShowHideFormSearch] = useState(false);
  // const [isShowBlockUser, setIsBlockUser] = useState(false);
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
 const [userLocation, setUserLocation] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

   const [userVideos, setUserVideos] = useState([]);
   const [blockStatus, setBlockStatus] = useState(false);
   const [isShowBlockUser, setIsShowBlockUser] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

console.log('User ID from URL:', userId);


  useEffect(() => {
  const fetchUserMedia = async () => {
    if (!userId) {
      setError('User not authenticated');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://kiqko-backend.onrender.com/api/users/${userId}/media`
      );

      console.log('API media Response:', response.data); // Debug log

      // Expecting an array directly from the backend
      if (Array.isArray(response.data)) {
        const normalizedMedia = response.data.map((item) => ({
          _id: item._id || item.id,
          url: item.url,
        }));
        setMedia(normalizedMedia);
      } else {
        setMedia([]); // Fallback for unexpected response
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch media:', err);
      setError('Failed to load media. Please refresh the page.');
      setMedia([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUserMedia();
}, [userId]);



  
  
      
    useEffect(() => {
      setIsLoading(true);
        const fetchUser = async () => {
          try {
            
            const response = await axios.get(`https://kiqko-backend.onrender.com/api/users/user/${userId}`);
            console.log('API Response:', response.data); // Log raw API response
            console.log('userId used:', userId); // Log userId
            console.log('Formatted createdAt:', moment(response.data.createdAt).format('MMMM D, YYYY')); // Log formatted date
            setUser1(response.data);
          } catch (error) {
            console.error('Error fetching user:', error);
            setError('Failed to load user data');
          }finally {
        setIsLoading(false);
      }
        };

        if (userId) {
          fetchUser();
        } else {
          setError('No user ID found');
        }
      }, [userId]);

      const formatLastOnline = (lastActive) => {
        if (!lastActive) return 'Last online unknown';
        const now = moment();
        const lastActiveDate = moment(lastActive);
        const duration = moment.duration(now.diff(lastActiveDate));

        const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours() % 24);

        if (days > 0) {
          return `Last online ${days} Day${days > 1 ? 's' : ''} ${hours} Hour${hours > 1 ? 's' : ''}`;
        } else if (hours > 0) {
          return `Last online ${hours} Hour${hours > 1 ? 's' : ''}`;
        } else {
          return 'Last online just now';
        }
      };

  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`https://kiqko-backend.onrender.com/api/users/${userId}/getVideos`);
        console.log("Fetched videos:", res.data.videos); // Log the video data
        setUserVideos(res.data.videos);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };
    fetchVideos();
  }, [userId]);


useEffect(() => {
  const recordProfileView = async () => {
    if (!currentUserId || !userId || currentUserId === userId) {
      console.log("Skipping profile view: invalid IDs or self-view", { currentUserId, userId });
      return;
    }

    try {
      const response = await axios.post(
        `https://kiqko-backend.onrender.com/api/users/profile-view`,
        {
          viewerId: currentUserId,
          viewedUserId: userId,
        }
      );
      console.log(`Profile view recorded for user ${userId} by viewer ${currentUserId}`, response.data);
    } catch (err) {
      console.error("Failed to record profile view:", err.response?.data || err.message);
    }
  };

  recordProfileView();
}, [currentUserId, userId]);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
       
        const res = await fetch(
          `https://kiqko-backend.onrender.com/api/users/location/${userId}`
        );
        const data = await res.json();
        setUserLocation(data); // data will be { city, state, country }
      } catch (err) {
        console.error("Failed to fetch location:", err);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        const [userResponse, profileResponse] = await Promise.all([
          fetch(`https://kiqko-backend.onrender.com/api/users/profile/${userId}`),
          fetch(`https://kiqko-backend.onrender.com/api/users/profilee/${userId}`)
        ]);

        if (!userResponse.ok || !profileResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        const profileData = await profileResponse.json();

        setUser(userData);
        setProfileDetails(profileData);

        // Mock media data - replace with actual API call
        // setMedia([
        //   { _id: '1', url: profile },
        //   { _id: '2', url: profile },
        //   { _id: '3', url: profile },
        //   { _id: '4', url: profile }
        // ]);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const [Modal, open, close] = useModal("root", {
  preventScroll: true,
  closeOnOverlayClick: true,
});



 const openModal = (index) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goToPrev = () =>
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));

  const goToNext = () =>
    setCurrentPhotoIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));

 
    const [imgObj, setImgObj] = useState({});
      const [imgIndex, setImgIndex] = useState(0);
      const [isDisabled, setIsDisabled] = useState(false);
      const profileImgList = [
        { imgUrl: profile, caption: "BeBold 2022 BeBless" },
        // { imgUrl: img3, caption: 'Profile Picture -02' }
      ];

  const viewProfileImg = () => {
    setIsModalOpen(true);
    setCurrentPhotoIndex(0);
  };

 
  const ImgViewer = () => (
    <Modal>
      <div className="popup-modal-viewer">
        <div className="user-modal-top">
          <span>
            {" "}
            <img src={imgObj.imgUrl} alt="Images..." />{" "}
          </span>
          <div className="user-modal-top-details">
            <h5>Sola</h5>
            <p>Long Beach, CA-60</p>
          </div>
          <button className="btn btn_closega" onClick={close}>
            <MdOutlineClose className="arrow-sign" />
          </button>
        </div>
        <div className="main-view-image">
          <img src={imgObj.imgUrl} alt="Images..." />
        </div>
        <div className="user-caption">{imgObj.caption}</div>
        {/* <div style={{ marginBottom: '10px' }} className='customizableDiv'>This is a customizable div
   </div>
   */}
        <div className="caption_title">
          <div className="send-message-user2">
            <p>
              <Form.Control
                className="form-control"
                type="text"
                placeholder="Send her a message"
              />
              <button className="btn">Send Message</button>
            </p>
          </div>
        </div>
        <button
          className="btn btn-next-pre left-posp"
          onClick={previous}
          disabled={isDisabled}
        >
          <MdOutlineArrowBackIosNew />
        </button>
        <button
          className="btn btn-next-pre right-posp"
          onClick={next}
          disabled={isDisabled}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </Modal>

    
  );

   function previous() {
    utils.prevImg(profileImgList, setImgObj, setImgIndex, imgIndex);
  }
  function next() {
    utils.nextImg(profileImgList, setImgObj, setImgIndex, imgIndex);
  }

  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      // Implement send message API call
      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post('https://kiqko-backend.onrender.com/api/users/' + userId + '/like', {
        userId: currentUserId,
      });
     
      Swal.fire({
              icon: 'like',
              title: 'Liked Successfully',
              text: res.data.message || 'You liked this profile!',
              confirmButtonText: 'OK'
            });
      
    } catch (err) {
      console.error('Like error:', err.response?.data || err.message);
      
      Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.response?.data?.message || 'Failed to like this profile.',
              confirmButtonText: 'OK'
            });
    }
  };

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-purple" style={{ width: '3rem', height: '3rem', borderWidth: '0.2rem', borderColor: '#9c27b0', borderRightColor: 'transparent' }}></div>
    </div>
);

  if (error) return (
    <div className="text-center py-8 text-red-500">
      <p>Error loading profile: {error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Try Again
      </button>
    </div>
  );

  





  return (
    <CommonLayout>
      <ImgViewer />
      <section className="all-top-shape">
        <img src={shape} alt="shape" />
      </section>
      <div className="all-container">
        <div className="pr pb-5 mb-5">
          <div className="page-wrapper-all">
            <Container>
              <Row className="m0-all">
                <Col md={3}>
                  <div className="left-panel-allpages mar-top-left">
                    <OnlineUsers />
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
                <Col className="text-center" md={9}>
                  <div className="profile-main-part-area-inner mt-profile">
                    <div className="profile-details-area">
                      <div className="date-profile-top">
                        <p className="member-p">{user1?.createdAt ? `Member since ${moment(user1.createdAt).format('MMMM D, YYYY')}` : ''}</p>
                        <div className="last-online">
                          {" "}
                          <img src={calendar} alt="calendar" />
                           {formatLastOnline(user1.lastActive)}
                        </div>
                      </div>
                      <div className="profile-pic-user">
                        <div className="profile-pic-avater">
                          {" "}
                          <img
                            onClick={viewProfileImg}
                            src={profileDetails?.profilephoto ||
                      'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                          />
                        </div>
                        <div className="profile-next-prev">
                          <span className="span-icon">
                            <img src={profilicon1} alt="profilicon1" />
                          </span>
                          <span>
                            <img src={profilicon2} alt="profilicon2" />
                          </span>
                          <span>
                            <img src={profilicon3} alt="profilicon3" />
                          </span>
                          <span className="span-icon">
                            <img src={profilicon4} alt="profilicon4" />
                          </span>
                        </div>
                      </div>

                      <div className="profile-user-details text-start">
                        <h1>
                          {user?.username}
                          {user?.isImgVerified && (
                            <span className="icon-profile">
                              <img src={proficon} alt="proficon" />
                              <span className="span-tooltip-profile">
                                Verified!{" "}
                                <img src={verifiedvac} alt="verifiedvac" />
                              </span>
                            </span>
                          )}
     {(profileDetails?.vaccinationStatus === 'vaccinated' ||
  profileDetails?.vaccinationStatus === 'vaccinated_and_boosted') && (
  <span className="span-vac-icon">
    <NavLink exact to="">
      <img src={vaccineIcon} alt="vaccineIcon" />
      <span className="span-tooltip-profile left-30">
        Yes, I'm Vaccinated <img src={likevac} alt="likevac" />
      </span>
    </NavLink>
  </span>
)}

                        </h1>

                        <p className="address-p">
                                                 {userLocation?.city && userLocation?.country ? (
                                                   <span className="location-icon">
                                                     <img src={location} alt="location" />{" "}
                                                     {userLocation.city}, {userLocation.country}
                                                   </span>
                                                 ) : (
                                                   <span>No location set</span>
                                                 )}

                          <Accordion
                            className="acc-wrapper-custom"
                            defaultActiveKey={["0"]}
                            alwaysOpen
                          >
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                <img src={threedots} alt="threedots" />
                                <label>
                                  {" "}
                                  <MdClear />
                                </label>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="acc-item-inner">
                                  <Dropdown.Item
                                    onClick={() =>
                                      setIsShowHideFormSearch(true)
                                    }
                                  >
                                    <img src={hideicona} alt="hideicona" />
                                    Hide from search
                                  </Dropdown.Item>
                                  {isShowHideFormSearch && (
                                    <HideFormSearch
                                      isShowHideFormSearch={
                                        isShowHideFormSearch
                                      }
                                      handleHideFormSearch={
                                        setIsShowHideFormSearch
                                      }
                                    />
                                  )}
                            <Dropdown.Item onClick={() => setIsShowBlockUser(true)}>
  <img src={blockusericon} alt="block icon" />
  {blockStatus ? 'Unblock user' : 'Block user'}
</Dropdown.Item>

{isShowBlockUser && (
  <BlockUserPro
    isShowBlockUser={isShowBlockUser}
    handleBlockUser={setIsShowBlockUser}
    onBlockStatusChange={setBlockStatus} // Callback to update parent state
  />
)}
                                  <Dropdown.Item>
                                    <NavLink exact to={`/report/${userId}`}>
                                      <img src={reporticon} alt="reporticon" />{" "}
                                      Report
                                    </NavLink>
                                  </Dropdown.Item>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </p>
                        <div className="profile-user-details-inner">
                          {profileDetails ? (
                            <>
                              <h2>
                                {profileDetails.gender === "Woman"
                                  ? "Woman seeking Man"
                                  : profileDetails.gender === "Man"
                                  ? "Man seeking Woman"
                                  : "Not specified"}

                                {profileDetails.age &&
                                  ` age(${profileDetails.age}) +`}
                              </h2>
                              <h3>
                                <span className="pro-icon-all">
                                  {profileDetails.age &&
                                    `${profileDetails.age}, `}
                                  {profileDetails.maritalStatus &&
                                    `${profileDetails.maritalStatus}, `}
                                  {profileDetails.ethnicity &&
                                    `${profileDetails.ethnicity}, `}
                                  {profileDetails.height &&
                                    profileDetails.height}
                                </span>
                              </h3>
                              <h3>
                                <span className="pro-icon-all">
                                  <img src={bodytype2} alt="body type" />
                                </span>
                                {profileDetails.bodyType || "Not specified"}
                              </h3>
                              <h3>
                                <span className="pro-icon-all">
                                  <img src={kids2} alt="kids status" />
                                </span>
                                {profileDetails.hasKids || "Not specified"}
                              </h3>
                              <h3>
                                <span className="pro-icon-all">
                                  <img src={wantkids2} alt="wants kids" />
                                </span>
                                {profileDetails.wantsKids || "Not specified"}
                              </h3>
                              <h3>
                                <span className="pro-icon-all">
                                  <img src={herefor2} alt="relationship goal" />
                                </span>
                                {profileDetails.hereFor || "Not specified"}
                              </h3>
                            </>
                          ) : (
                            <NavLink
                              to="/edit-profile"
                              className="btn btn-primary"
                            >
                              Add Your Information
                            </NavLink>
                          )}
                        </div>
                      </div>
                      <div className="all-user-btn">
                        <button className="btn mes-btn" onClick={handleSendMessage}>
                          <img src={icon1profile} alt="icon1profile" />
                          <span>Send Message</span>{" "}
                        </button>
                        <button className="btn like-btn" onClick={handleLike}>
                          {" "}
                          <img src={icon2profile} alt="icon2profile" />{" "}
                          <span>Like</span>{" "}
                        </button>
                        <NavLink exact to={`/chat/${userId}`}>
                          <button className="btn block-btn">
                            {" "}
                            <img src={icon3profile} alt="icon3profile" />{" "}
                            <span>Chat</span>{" "}
                          </button>{" "}
                        </NavLink>
                        <button className="btn online-btn">
                          {" "}
                          <img src={icon4profile} alt="icon4profile" />{" "}
                          <span>Video Call</span>{" "}
                        </button>
                      </div>
                    </div>
                    <Row className="flex-direction-custom">
                      <Col
                        md={12}
                        className="text-start ps-5 profile-all-info mt-4"
                      >
                        <div className="text-start position-relative">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h2 className="h5 mb-0">Headline:</h2>
                            
                          </div>
                          <p className="text-muted">
                            {profileDetails?.headline || "Not specified"}
                          </p>
                        </div>

                        <div className="text-left">
                          <h2 className="mb-2">
                            Best compliment you've ever received:
                          </h2>
                          <p className="text-gray-700">
                            {profileDetails?.compliment || "Not specified"}
                          </p>
                        </div>

                        <div className="text-left">
                          <h2 className="text-xl font-semibold mb-2">
                            What are your dealbreakers?
                          </h2>
                          <div className="space-y-2">
                            {profileDetails?.dealbreakers?.length > 0 ? (
                              profileDetails.dealbreakers.map(
                                (dealbreaker, index) => (
                                  <p key={index} className="text-gray-700">
                                    <span className="font-medium">
                                      We're not a match if...
                                    </span>{" "}
                                    {dealbreaker}
                                  </p>
                                )
                              )
                            ) : (
                              <p className="text-gray-700">Not specified</p>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col md={12} className="mt-4">
                        <ul className="search-user-list search-user-list2 mt-0 mb-all">
                          <li className="full-width">
                            <Row>
                              <Col md={4} className="add-bannerall">
                                <img src={adda} alt="adda" />
                              </Col>
                              <Col md={4} className="add-bannerall">
                                <img src={adda} alt="addb" />
                              </Col>
                              <Col md={4} className="add-bannerall">
                                <img src={adda} alt="addc" />
                              </Col>
                            </Row>
                          </li>
                        </ul>
                      </Col>
                      <Col md={12} className="ps-4 pe-0">
                        <div className="middile-part-profile">
                          <div className="profile-detaild-middle pt-0">
                                           {/* Photos Section */}
                                 {/* Photos Section */}
                       <div className="mt-5">
                         <h3 className="text-start h3-all-title">
                           My Photos
                           <span className="details-count ps-2">{media.length}</span>
                         </h3>
                 
                         <div className="row g-3 mt-3">
                           {media.map((item, index) => (
                             <div
                               key={item._id}
                               className="col-6 col-md-4 col-lg-3 position-relative"
                               style={{ cursor: "pointer" }}
                               onClick={() => openModal(index)}
                             >
                               <div className="position-relative overflow-hidden border rounded">
                                 {/* Hover Overlay */}
                                 <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center opacity-0 hover-opacity-100 transition">
                                   <button
                                     onClick={(e) => {
                                       e.stopPropagation();
                                      
                                     }}
                                     className="btn btn-light btn-sm rounded-circle"
                                     disabled={isLoading}
                                     aria-label="Delete photo"
                                   >
                                     <MdClear className="text-danger" />
                                   </button>
                                 </div>
                 
                                 {/* Image */}
                                 <img
  src={item.url}
  alt={`media-${item._id}`}
  className="img-fluid w-100 object-fit-cover"
  style={{ 
    aspectRatio: "1 / 1", 
    objectFit: "cover",
    backgroundColor: '#f0f0f0' // fallback color
  }}
  onError={(e) => {
    console.error("Error loading image:", item.url, e);
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/300";
  }}
  onLoad={() => console.log("Image loaded successfully:", item.url)}
/>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                 
                       {isModalOpen && (
  <div
    className="modal fade show d-block"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.97)",
      zIndex: 1050,
      overflow: "hidden",
    }}
    onClick={closeModal}
    role="dialog"
    aria-modal="true"
  >
    {/* Close Button (Top Right) */}
    <button
      onClick={closeModal}
      className="btn-close btn-close-white position-absolute"
      style={{
        top: "24px",
        right: "24px",
        zIndex: 1060,
        fontSize: "1.5rem",
        opacity: 0.9,
      }}
      aria-label="Close modal"
    />

    {/* Previous Button (Left) */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        goToPrev();
      }}
      className="btn btn-dark position-absolute d-flex align-items-center justify-content-center"
      style={{
        top: "50%",
        left: "24px",
        transform: "translateY(-50%)",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        zIndex: 1060,
        opacity: 0.8,
      }}
      aria-label="Previous photo"
    >
      <MdChevronLeft size={28} />
    </button>

    {/* Image Container (Centered, Responsive) */}
    <div
      className="d-flex align-items-center justify-content-center w-100 h-100 p-4"
      style={{ maxWidth: "90vw", margin: "0 auto" }}
    >
      <img
        src={media[currentPhotoIndex]?.url}
        alt={`Photo ${currentPhotoIndex + 1} of ${media.length}`}
        className="img-fluid"
        style={{
          maxHeight: "85vh",
          maxWidth: "100%",
          objectFit: "contain",
          cursor: "zoom-out",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/1200?text=Image+Not+Available";
        }}
        onClick={closeModal}
      />
    </div>

    {/* Next Button (Right) */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        goToNext();
      }}
      className="btn btn-dark position-absolute d-flex align-items-center justify-content-center"
      style={{
        top: "50%",
        right: "24px",
        transform: "translateY(-50%)",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        zIndex: 1060,
        opacity: 0.8,
      }}
      aria-label="Next photo"
    >
      <MdChevronRight size={28} />
    </button>

    {/* Photo Counter (Bottom Center) */}
    <div
      className="text-white position-absolute d-flex align-items-center justify-content-center"
      style={{
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "4px 16px",
        borderRadius: "20px",
        fontSize: "0.95rem",
        zIndex: 1060,
      }}
    >
      {currentPhotoIndex + 1} / {media.length}
    </div>
  </div>
)}

                            {/* Video Section */}
                            <div className="mt-5">
  <h3 className="text-start h3-all-title">
    Videos
    <span className="details-count ps-2">{userVideos?.length ?? 0}</span>
  </h3>
  <div className="row mt-3">
    {(userVideos ?? []).map((video) => (
      <div key={video.publicId} className="col-12 col-md-6 col-lg-4 mb-3">
        <div className="border rounded overflow-hidden position-relative">
          <video
            controls
            className="w-100"
            style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
            preload="metadata"
            playsInline
            poster={`${video.url.replace(/\.mov$/, '.jpg')}`} // Add poster from Cloudinary
          >
            {/* Primary source - try with Cloudinary transformation */}
            <source 
              src={`${video.url.replace(/\.mov$/, '.mp4')}`} 
              type="video/mp4" 
            />
            {/* Fallback to original MOV with correct MIME type */}
            <source 
              src={video.url} 
              type="video/quicktime" 
            />
            Your browser does not support HTML5 video.
          </video>
          <button
            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
            onClick={() => handleDeleteVideo(video.publicId)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

                            {/* About Me */}
                            <div className="mt-3">
                              <h3 className="text-start h3-all-title mb-3">
                                About Me
                              </h3>
                              <p className="text-start p-details-profile">
                                {profileDetails?.about ||
                                  "Not specified. "}
                              </p>
                            </div>

                            <h3 className="text-start h3-all-title mb-3 mt-2">
                              I'm looking for…
                            </h3>
                            <Row>
                              <Col md={8}>
                                <ul className="ul-looking-for">
                                  <li>
                                    <img src={gender} alt="gender" />
                                    <span>{profileDetails.gender === "Woman"
                                  ? "Man"
                                  : profileDetails.gender === "Man"
                                  ? "Woman"
                                  : "Not specified"}</span>
                                  </li>
                                  {/* <li>
                                    <img src={ages} alt="ages" />
                                    <span>{profileDetails.age}</span>
                                  </li> */}
                                  <li>
                                    <img src={race} alt="race" />
                                    <span>
                                      White, Asian, Black, Middle Eastern
                                    </span>
                                  </li>
                                  <li>
                                    <img
                                      src={maritalstatus}
                                      alt="maritalstatus"
                                    />
                                    <span>Any</span>
                                  </li>
                                  <li>
                                    <img src={bodytype} alt="bodytype" />
                                    <span>Any</span>
                                  </li>
                                </ul>
                              </Col>
                              <Col md={4}>
                                <ul className="ul-looking-for">
                                  <li>
                                    <img src={havekids} alt="havekids" />
                                    <span>No</span>
                                  </li>
                                  <li>
                                    <img src={wantkids} alt="wantkids" />
                                    <span>No</span>
                                  </li>
                                  <li>
                                    <img src={herefor} alt="herefor" />
                                    <span>Long-term</span>
                                  </li>
                                  <li>
                                    <img src={relocate} alt="relocate" />
                                    <span>No</span>
                                  </li>
                                </ul>
                              </Col>
                            </Row>
                            <h3 className="text-start h3-all-title mt-3 mb-3">
                              Say Hello to {user?.username}
                            </h3>
                            <div className="search-user-profile">
                              <Form>
                                <Form.Group className="mb-2">
                                  <Form.Control
                                    className="form-custom"
                                    type="text"
                                    placeholder="Type your message here"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                  />
                                  <span className="send-span" onClick={handleSendMessage}>
                                    <MdNearMe className="arrow-sign" />
                                  </span>
                                </Form.Group>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <div className="similar-user">
                <SimilarUsersSection />
              </div>
              <OnlineStatusUpdater userId={localStorage.getItem("userId")} />
            </Container>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default UserProfile;