import React, { useEffect, useRef, useState } from "react";
import CommonLayout from "../../layouts/Common";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
// import { NavLink } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import "./profile.css";
import shape from "../../assets/images/shape2.png";
import proficon from "../../assets/images/prof-icon.jpg";
import vaccineIcon from "../../assets/images/vaccineIcon.png";
import profile from "../../assets/images/profilep.jpg";
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
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
  import io from 'socket.io-client';
  import Picker from 'emoji-picker-react';
  import { Send, Paperclip, Smile, X, Image, FileText, Check, CheckCheck } from 'lucide-react';
  const socket = io('https://kiqko-backend.onrender.com');
const Chat = () => {
     const { userId } = useParams();
    const currentUserId = localStorage.getItem('userId');

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [typingStatus, setTypingStatus] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);
    const [attachment, setAttachment] = useState(null);
  const [user, setUser] = useState(null);
    const [profileDetails, setProfileDetails] = useState(null);
    const chatRef = useRef();
   

    useEffect(() => {
      if (!currentUserId) return;

      socket.emit('register', currentUserId);

      const handleReceiveMessage = (data) => {
    setMessages((prev) => {
      const index = prev.findIndex(
        (msg) =>
          msg.sender === data.sender &&
          msg.receiver === data.receiver &&
          msg.timestamp === data.timestamp
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...data, status: 'delivered' };
        return updated;
      }

      if (data.receiver === currentUserId) {
        socket.emit('message_delivered', data._id);
        data.status = 'delivered';

        // // 🔊 Play sound only if it's a new incoming message
        // audio.play().catch((err) => console.error("Audio play error:", err));
      }

      return [...prev, data];
    });
  };


      const handleDeliveredConfirm = (msgId) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === msgId ? { ...msg, status: 'delivered' } : msg
          )
        );
      };

      // Handle typing status from other user
      const handleTypingStatus = (typingUserId) => {
        setTypingStatus(typingUserId === userId);
      };

      // Handle last seen update
      const handleLastSeen = (userLastSeen) => {
        setLastSeen(userLastSeen);
      };

      socket.on('receive_message', handleReceiveMessage);
      socket.on('message_delivered_confirm', handleDeliveredConfirm);
      socket.on('typing', handleTypingStatus);
      socket.on('user_last_seen', handleLastSeen);

      return () => {
        socket.off('receive_message', handleReceiveMessage);
        socket.off('message_delivered_confirm', handleDeliveredConfirm);
        socket.off('typing', handleTypingStatus);
        socket.off('user_last_seen', handleLastSeen);
      };
    }, [currentUserId, userId]);

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          setMessages([]); // Clear previous chat messages

          const res = await fetch(`https://kiqko-backend.onrender.com/api/messages/${currentUserId}/${userId}`);
          const data = await res.json();
          const msgsWithStatus = data.map((msg) => ({
            ...msg,
            status: 'delivered',
          }));
          setMessages(msgsWithStatus);
        } catch (err) {
          console.error(err);
        }
      };

      if (userId && currentUserId) fetchMessages();
    }, [currentUserId, userId]);


  useEffect(() => {
    
      if (!userId) return;

      const fetchProfileDetails = async () => {
      

        try {
          const detailsRes = await fetch(
            `https://kiqko-backend.onrender.com/api/users/profilee/${userId}`
          );
          const detailsData = await detailsRes.json();
          console.log(detailsData);

          if (detailsRes.ok) {
            setProfileDetails(detailsData); // this will be the user's profile
            // setDe(detailsData);
          } else {
            console.error("Error fetching profile:", detailsData.message);
          }
        } catch (err) {
          console.error("Error:", err);
        }
      };

      const fetchData = async () => {
        try {
          // Fetch basic user data
          const userRes = await fetch(
            `https://kiqko-backend.onrender.com/api/users/profile/${userId}`
          );
          const userData = await userRes.json();
          console.log(userData);

          if (userRes.ok) {
            setUser(userData);

            //  // Fetch additional profile details
            //  const detailsRes = await fetch(`https://kiqko-backend.onrender.com/api/users/${userId}`);
            //  const detailsData = await detailsRes.json();

            //  if (detailsRes.ok) {
            //    setProfileDetails(detailsData);
            //  }
          } else {
            console.error(userData.message);
          }
        } catch (err) {
          console.error("Error fetching data:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
      fetchProfileDetails();
    }, []);
    

    useEffect(() => {
      chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    // Notify typing on input change with debounce
    useEffect(() => {
      if (!currentUserId || !userId) return;

      if (input) {
        socket.emit('typing', { from: currentUserId, to: userId });
      } else {
        socket.emit('typing', { from: currentUserId, to: userId, typing: false });
      }
    }, [input, currentUserId, userId]);



    const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };


    const handleSend = async () => {
    if (!input.trim() && !attachment) return;

    const timestamp = new Date().toISOString();

    let attachmentUrl = null;

    if (attachment) {
      try {
        const formData = new FormData();
        formData.append('file', dataURLtoFile(attachment.data, attachment.name));

        const res = await fetch('https://kiqko-backend.onrender.com/api/messages/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();
        attachmentUrl = result.url;
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    const messageData = {
      text: input,
      sender: currentUserId,
      receiver: userId,
      timestamp,
      status: 'sent',
      attachment: attachmentUrl || null,
    };

    setMessages((prev) => [
      ...prev,
      { ...messageData, _id: `temp-${timestamp}` },
    ]);

    socket.emit('send_message', messageData);
    setInput('');
    setAttachment(null);
    setShowEmojiPicker(false);
  };

    const onEmojiClick = (emojiData) => {
      setInput((prev) => prev + emojiData.emoji);
    };

    const renderTicks = (msg) => {
      if (msg.sender !== currentUserId) return null;
      if (msg.status === 'delivered') {
        return <span title="Delivered" style={{ color: 'blue', marginLeft: 6 }}>✔✔</span>;
      }
      if (msg.status === 'sent') {
        return <span title="Sent" style={{ color: 'gray', marginLeft: 6 }}>✔</span>;
      }
      return null;
    };

    // Handle file input change
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachment({
          name: file.name,
          type: file.type,
          data: reader.result,
        });
      };
      reader.readAsDataURL(file);
    };

    // Format last seen
    const formatLastSeen = (date) => {
      if (!date) return 'Offline';
      const d = new Date(date);
      return `Last seen: ${d.toLocaleString()}`;
    };


  return (
    <>
    
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


 <div className="d-flex flex-column h-100 mx-auto bg-white border rounded-3xl overflow-hidden" style={{ maxWidth: '42rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', borderColor: '#eee' }}>

    {/* HEADER */}
    <div className="d-flex align-items-center gap-3 p-3 border-bottom sticky-top z-10" style={{ 
      background: 'linear-gradient(to right, #9B72FE, #b89bff)', 
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="position-relative">
        <img
          src={profileDetails?.profilephoto}
          alt="profile"
          className="rounded-circle border border-2 border-white"
          style={{ width: '48px', height: '48px', objectFit: 'cover', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        />
        <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style={{ width: '16px', height: '16px' }}></div>
      </div>
      <div className="flex-grow-1">
        <h2 className="h5 mb-0 fw-semibold">{user?.username}</h2>
        <p className="small mb-0 fw-medium">
          {typingStatus ? (
            <span className="d-flex align-items-center gap-1 text-white">
              <span className="d-flex gap-1">
                <span className="d-inline-block bg-white rounded-circle" style={{ width: '4px', height: '4px', animation: 'bounce 1s infinite' }}></span>
                <span className="d-inline-block bg-white rounded-circle" style={{ width: '4px', height: '4px', animation: 'bounce 1s infinite 75ms' }}></span>
                <span className="d-inline-block bg-white rounded-circle" style={{ width: '4px', height: '4px', animation: 'bounce 1s infinite 150ms' }}></span>
              </span>
              Typing...
            </span>
          ) : formatLastSeen(lastSeen)}
        </p>
      </div>
      <button className="btn p-2 rounded-circle" style={{ background: 'rgba(255, 255, 255, 0)', border: 'none' }}>
        <div className="d-flex flex-column">
          <span className="d-inline-block bg-white rounded-circle mb-1" style={{ width: '4px', height: '4px' }}></span>
          <span className="d-inline-block bg-white rounded-circle mb-1" style={{ width: '4px', height: '4px' }}></span>
          <span className="d-inline-block bg-white rounded-circle" style={{ width: '4px', height: '4px' }}></span>
        </div>
      </button>
    </div>

    {/* MESSAGES */}
    <div
      ref={chatRef}
      className="flex-grow-1 overflow-auto p-4"
      style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d5c7ff\' fill-opacity=\'0.3\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
        background: 'linear-gradient(to bottom, #f7f4ff, white)'
      }}
    >
      {messages
        .filter(
          (msg) =>
            (msg.sender === currentUserId && msg.receiver === userId) ||
            (msg.sender === userId && msg.receiver === currentUserId)
        )
        .map((msg, index) => (
          <div
            key={msg._id}
            className={`d-flex ${msg.sender === currentUserId ? "justify-content-end" : "justify-content-start"} mb-3`}
            style={{ 
              animation: 'slideInUp 0.2s ease-out',
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <div
              className={`position-relative p-3 rounded-3xl shadow-sm ${msg.sender === currentUserId
                ? "text-white rounded-end-bottom"
                : "bg-white text-dark border rounded-start-bottom"}`}
              style={{
                maxWidth: '18rem',
                background: msg.sender === currentUserId ? 'linear-gradient(to bottom right, #9B72FE, #b89bff)' : '',
                borderColor: msg.sender === currentUserId ? '' : '#dee2e6',
                transition: 'box-shadow 0.3s',
                boxShadow: msg.sender === currentUserId ? '0 1px 3px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              {msg.text && <p className="mb-0">{msg.text}</p>}
              {/* Attachment */}
              {msg.attachment && (
                <div className="mt-2">
                  {typeof msg.attachment === 'string' &&
                  msg.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                    <img
                      src={msg.attachment}
                      alt="Attachment"
                      className="rounded img-fluid"
                      style={{ transition: 'transform 0.3s', maxWidth: '100%' }}
                    />
                  ) : (
                    <a
                      href={msg.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center gap-2 p-2 bg-light rounded text-decoration-none"
                    >
                      <FileText size={16} />
                      <span className="small text-truncate" style={{ maxWidth: '150px' }}>Download Attachment</span>
                    </a>
                  )}
                </div>
              )}

              <div
                className={`d-flex align-items-center gap-1 mt-2 small ${msg.sender === currentUserId ? "text-white-50" : "text-muted"}`}
              >
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {renderTicks(msg)}
              </div>
            </div>
          </div>
        ))}
    </div>

    {/* ATTACHMENT PREVIEW */}
    {attachment && (
      <div className="p-3 border-top bg-light" style={{ borderColor: '#ddd' }}>
        <div className="d-flex align-items-center justify-content-between bg-white rounded p-3 shadow-sm">
          <div className="d-flex align-items-center gap-3">
            {attachment.type.startsWith("image/") ? (
              <div className="position-relative">
                <img
                  src={attachment.data}
                  alt={attachment.name}
                  className="rounded img-thumbnail"
                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                />
                <Image
                  size={14}
                  className="position-absolute top-0 end-0 bg-primary text-white rounded-circle"
                  style={{ transform: 'translate(25%, -25%)', padding: '2px' }}
                />
              </div>
            ) : (
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <FileText size={20} className="text-secondary" />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="small fw-medium text-truncate mb-0" style={{ maxWidth: '18rem' }}>
                {attachment.name}
              </p>
              <p className="small text-muted mb-0">Ready to send</p>
            </div>
          </div>
          <button
            onClick={() => setAttachment(null)}
            className="btn p-2 text-danger rounded-circle"
            aria-label="Remove attachment"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    )}

    {/* INPUT AREA */}
    <div className="border-top p-3 bg-white position-relative" style={{ borderColor: '#f8f9fa' }}>
      {showEmojiPicker && (
        <div className="position-absolute bottom-100 start-0 bg-white rounded shadow-lg border p-3 mb-2" style={{ zIndex: 1050, borderColor: '#dee2e6' }}>
          <div className="d-flex flex-wrap gap-2" style={{ maxWidth: '16rem' }}>
            {['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🔥', '💯', '🤔', '😍', '🥰', '😎', '🤗'].map(
              (emoji) => (
                <button
                  key={emoji}
                  onClick={() => onEmojiClick({ emoji })}
                  className="btn p-2 rounded"
                  style={{ fontSize: '1.25rem' }}
                >
                  {emoji}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <div className="d-flex align-items-center gap-2">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`btn p-2 rounded-circle ${showEmojiPicker ? "bg-purple-100 text-primary" : "text-secondary"}`}
          type="button"
          aria-label="Toggle emoji picker"
          style={{ border: 'none' }}
        >
          <Smile size={20} />
        </button>

        <div className="flex-grow-1 position-relative">
          <input
            type="text"
            className="form-control rounded-pill border ps-3 pe-3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send them a lovely message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            style={{ height: '42px' }}
          />
        </div>

        <label
          htmlFor="file-upload"
          className="btn p-2 rounded-circle text-secondary"
          aria-label="Attach file"
          style={{ border: 'none' }}
        >
          <Paperclip size={20} />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,application/pdf,.doc,.docx"
          onChange={handleFileChange}
          className="visually-hidden"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() && !attachment}
          className={`btn p-2 rounded-circle ${input.trim() || attachment
              ? "bg-primary text-white"
              : "bg-secondary text-white opacity-50"}`}
          aria-label="Send message"
          style={{ 
            background: input.trim() || attachment ? 'linear-gradient(to right, #9B72FE, #b89bff)' : '',
            width: '42px',
            height: '42px'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
    <OnlineStatusUpdater userId={localStorage.getItem("userId")} />
  </div>

            </Row>
            </Container>
            </div>
        
        </div>
        </div>
        </CommonLayout>
    
    </>
  )
}

export default Chat