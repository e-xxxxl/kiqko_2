import React, { useEffect, useRef, useState } from "react";
import CommonLayout from "../../layouts/Common";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
// import { NavLink } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import "./chat.css";
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
  import { Send, Paperclip, Smile, X, Image, FileText, Check, CheckCheck, MoreHorizontal, Inbox } from 'lucide-react';
import { Tab, Tabs } from "react-bootstrap";
import Sent from "../mailbox/Sent";
import Saved from "../mailbox/Saved";
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages";
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
  const [isLoading, setIsLoading] = useState(true);
  const chatRef = useRef();
 

  // Fetch user and profile details
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Fetch basic user data
        const userRes = await fetch(`https://kiqko-backend.onrender.com/api/users/profile/${userId}`);
        const userData = await userRes.json();
        if (!userRes.ok) throw new Error(userData.message);
        setUser(userData);

        // Fetch additional profile details
        const detailsRes = await fetch(`https://kiqko-backend.onrender.com/api/users/profilee/${userId}`);
        const detailsData = await detailsRes.json();
        if (!detailsRes.ok) throw new Error(detailsData.message);
        setProfileDetails(detailsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Fetch messages
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

  // Socket.io event handling
  useEffect(() => {
    if (!currentUserId || !socket.connected) return;

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

    const handleTypingStatus = (typingUserId) => {
      setTypingStatus(typingUserId === userId);
    };

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
  }, [currentUserId, userId, socket.connected]);

  // Scroll to bottom of chat
  useEffect(() => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      const lastMessage = chatContainer.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  // Notify typing status
  useEffect(() => {
    if (!currentUserId || !userId) return;

    if (input) {
      socket.emit('typing', { from: currentUserId, to: userId });
    } else {
      socket.emit('typing', { from: currentUserId, to: userId, typing: false });
    }
  }, [input, currentUserId, userId]);

  // Convert data URL to file
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

  // Handle sending messages
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
        if (!res.ok) throw new Error(result.message);
        attachmentUrl = result.url;
      } catch (err) {
        console.error('Upload failed:', err);
        return; // Prevent sending message if upload fails
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

  // Handle emoji selection
  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Render message ticks
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

  
  // // Placeholder components for Sent and Saved tabs
  // const Sent = () => <div>Sent Messages (Under Construction)</div>;
  // const Saved = () => <div>Saved Messages (Under Construction)</div>;


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
    <div className="profile-main-part-area-inner bg-all-pages plr-16 mrb-mail">
      <Col md={12} className="all-title-top mb-4 text-center">
        <h4 className="text-gradient-primary fw-semibold">Mailbox</h4>
      </Col>
      <div className="page-wrapper-all">
        <Row className="m-0">
          <Col md={12}>
            <div className="tab-coustom-list">
              <Tabs defaultActiveKey="Messages" id="uncontrolled-tab-example" className="mb-2">
                <Tab eventKey="Messages" title="Chat">
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                      <div className="spinner-grow text-primary" role="status" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="d-flex flex-column h-100 mx-auto bg-white border rounded-4 overflow-hidden"
                      style={{
                        maxWidth: '100%',
                        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                        borderColor: 'rgba(0,0,0,0.05)',
                        minHeight: '70vh',
                        maxHeight: '80vh'
                      }}
                    >
                      {/* HEADER */}
                      <div
                        className="d-flex align-items-center gap-3 p-3 border-bottom sticky-top z-10"
                        style={{
                          background: 'linear-gradient(135deg, #8A63FF 0%, #B18AFF 100%)',
                          color: 'white',
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="position-relative">
                          <img
                            src={profileDetails?.profilephoto || 'default-profile.png'}
                            alt="profile"
                            className="rounded-circle border border-3 border-white shadow-sm"
                            style={{
                              width: '42px',
                              height: '42px',
                              objectFit: 'cover',
                            }}
                          />
                          <div
                            className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white pulse-animation"
                            style={{
                              width: '12px',
                              height: '12px',
                            }}
                          ></div>
                        </div>
                        <div className="flex-grow-1">
                          <h2 className="h6 mb-0 fw-semibold">{user?.username || 'Unknown User'}</h2>
                          <p className="small mb-0 fw-medium opacity-90">
                            {typingStatus ? (
                              <span className="d-flex align-items-center gap-1 text-white">
                                <span className="typing-indicator">
                                  <span className="dot"></span>
                                  <span className="dot"></span>
                                  <span className="dot"></span>
                                </span>
                                Typing...
                              </span>
                            ) : (
                              formatLastSeen(lastSeen)
                            )}
                          </p>
                        </div>
                        <button
                          className="btn p-2 rounded-circle hover-scale"
                          style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: 'none',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>

                      {/* MESSAGES */}
                      <div
                        ref={chatRef}
                        className="flex-grow-1 overflow-auto p-3 custom-scrollbar"
                        style={{
                          background: '#f9f9ff',
                          minHeight: 'calc(70vh - 120px)'
                        }}
                      >
                        {messages.length === 0 ? (
                          <div className="text-center text-muted mt-5 d-flex flex-column align-items-center justify-content-center h-100">
                            <Inbox size={48} className="opacity-50 mb-3" />
                            <span className="fw-medium">No messages yet</span>
                            <small className="text-muted">Start the conversation!</small>
                          </div>
                        ) : (
                          messages.map((msg) => (
                            <div
                              key={msg._id}
                              className={`d-flex ${msg.sender === currentUserId ? 'justify-content-end' : 'justify-content-start'} mb-3`}
                            >
                              <div
                                className={`position-relative p-3 ${msg.sender === currentUserId ? 'text-white chat-bubble-sent' : 'bg-white text-dark chat-bubble-received'}`}
                                style={{
                                  maxWidth: '85%',
                                  wordBreak: 'break-word',
                                }}
                              >
                                {msg.text && <p className="mb-0">{msg.text}</p>}
                                {msg.attachment && (
                                  <div className="mt-2 overflow-hidden rounded-3">
                                    <img
                                      src={msg.attachment}
                                      alt="attachment"
                                      className="img-fluid rounded"
                                      style={{ maxHeight: '220px', maxWidth: '100%' }}
                                    />
                                  </div>
                                )}
                                <div
                                  className={`d-flex align-items-center gap-1 mt-2 small ${msg.sender === currentUserId ? 'text-white-70' : 'text-muted'}`}
                                >
                                  <span>
                                    {new Date(msg.timestamp).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                  {renderTicks(msg)}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="chat-input-container">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="emoji-picker-wrapper">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              width="100%"
              height="350px"
              style={{
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '8px',
              }}
            />
          </div>
        )}

        {/* Attachment Preview */}
        {attachment && (
          <div className="attachment-container">
            <img
              src={attachment.data}
              alt="Attachment preview"
              className="attachment-preview"
            />
            <button
              onClick={() => setAttachment(null)}
              className="btn btn-sm btn-danger remove-attachment-btn"
              aria-label="Remove attachment"
            >
              Remove
            </button>
          </div>
        )}

        {/* Input and Action Buttons */}
        <div className="input-group">
          <div className="action-buttons">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="action-btn"
              aria-label="Toggle emoji picker"
              title="Add emoji"
            >
              <Smile size={22} />
            </button>
            <label
              htmlFor="file-upload"
              className="action-btn"
              aria-label="Upload file"
              title="Attach file"
            >
              <Paperclip size={22} />
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
                aria-hidden="true"
              />
            </label>
          </div>
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            aria-label="Message input"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() && !attachment}
            className="send-btn"
            aria-label="Send message"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="Sent" title="Messages">
                  <Messages/>
                </Tab>
                <Tab eventKey="Saved" title="Saved">
                  <Saved />
                </Tab>
                <Tab eventKey="Deleted" title="Deleted">
                  <Saved />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </div>

    <style jsx>{`
      .chat-bubble-sent {
        background: linear-gradient(135deg, #8A63FF 0%, #B18AFF 100%);
        border-radius: 18px 4px 18px 18px;
        box-shadow: 0 2px 8px rgba(138, 99, 255, 0.2);
      }
      
      .chat-bubble-received {
        background: white;
        border-radius: 4px 18px 18px 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        border: 1px solid rgba(0,0,0,0.03);
      }
      
      .pulse-animation {
        animation: pulse 1.5s infinite ease-in-out;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      .typing-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
      .typing-indicator .dot {
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        opacity: 0.7;
      }
      
      .typing-indicator .dot:nth-child(1) {
        animation: bounce 1.4s infinite ease-in-out;
      }
      
      .typing-indicator .dot:nth-child(2) {
        animation: bounce 1.4s infinite ease-in-out 0.2s;
      }
      
      .typing-indicator .dot:nth-child(3) {
        animation: bounce 1.4s infinite ease-in-out 0.4s;
      }
      
      @keyframes bounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
      }
      
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.03);
        border-radius: 10px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(138, 99, 255, 0.3);
        border-radius: 10px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(138, 99, 255, 0.5);
      }
      
      .hover-scale:hover {
        transform: scale(1.1);
      }
      
      .focus-ring:focus {
        box-shadow: 0 0 0 0.25rem rgba(138, 99, 255, 0.15) !important;
        border-color: rgba(138, 99, 255, 0.3) !important;
        outline: none;
      }
      
      .text-gradient-primary {
        background: linear-gradient(135deg, #8A63FF 0%, #B18AFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      @media (max-width: 768px) {
        .chat-bubble-sent,
        .chat-bubble-received {
          max-width: 90% !important;
        }
        
        .profile-main-part-area-inner {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
      }
    `}</style>
  </Col>
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