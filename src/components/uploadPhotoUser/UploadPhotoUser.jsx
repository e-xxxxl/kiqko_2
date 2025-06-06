import React from 'react';
import CommonLayout from "../../layouts/Common";
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import shape from '../../assets/images/shape2.png';
import fev1 from '../../assets/images/fev1.jpg';
import photo2 from '../../assets/images/photo2.jpg';
import photo3 from '../../assets/images/photo3.jpg';
import photo4 from '../../assets/images/photo4.png';
import photo5 from '../../assets/images/photo5.png';
import photo6 from '../../assets/images/photo6.jpg';
import photo7 from '../../assets/images/photo7.jpg';
import { MdClear } from 'react-icons/md';

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


const UploadPhotoUser = () => {
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
                           <NavLink exact to="/profile" activeClassName="active"><img src={homea} alt="homea" />HOME</NavLink>
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
    <Col className="text-center" md={9}>
        <div className="profile-main-part-area-inner bg-all-pages">
            <Col md={12} className="all-title-top mb-4">
                <h4>Upload Photos</h4>
                <p className="all-top-title text-center mt-4 pt-2 mpt-0 font-segoeui">
                    To continue you need to add a photo.<br />
                    To be a verified member you need to add a minimum of four photos.
                </p>
            </Col>
            <Row>
                       <Col className="text-center" md={12}>
                           <div className="add-photo">
                               <input type="file" />
                           </div>

                           <div className="caption-field">
                               <div className="form-field-row caption-area">
                                   <Form.Group className="mb-2">
                                       <Form.Control className="form-custom upload-field-photo" type="text" placeholder="Add Caption (Max 99 characters)" />
                                   </Form.Group>
                               </div>

                               <div className="check-upload">
                                   <Form.Group className="mb-3 check-form check-long" controlId="formBasicCheckbox">
                                       <Form.Check type="checkbox" label="Make this my main picture" />
                                   </Form.Group>
                               </div>
                           </div>
                       </Col>
                   </Row>

                   <Row>
                       <Col className="photo-list-all margin-auto-all" md={12}>
                           <ul>
                               <li>
                                   <div className="add-photo">
                                       <input type="file" />
                                   </div>
                               </li>

                               <li>
                                   <div className="photo-list">
                                       <span className="close-photo"><MdClear /></span>
                                       <img src={fev1} alt="fev1" />
                                   </div>
                               </li>


                               <li>
                                   <div className="photo-list">
                                       <span className="close-photo"><MdClear /></span>
                                       <img src={photo2} alt="photo2" />
                                   </div>
                               </li>


                               <li>
                                   <div className="photo-list">
                                       <span className="close-photo"><MdClear /></span>
                                       <img src={photo3} alt="photo3" />
                                   </div>
                               </li>


                               <li>
                                   <div className="photo-list">
                                       <span className="close-photo"><MdClear /></span>
                                       <img src={photo4} alt="photo4" />
                                   </div>
                               </li>


                               <li>
                                   <div className="photo-list">
                                       <span className="close-photo"><MdClear /></span>
                                       <img src={photo5} alt="photo5" />
                                   </div>
                               </li>


                               <li>
                                   <div className="photo-list">
                                       <span className="close-photo"><MdClear /></span>
                                       <img src={photo6} alt="photo6" />
                                   </div>
                               </li>


                               <li>
                                   <div className="photo-list">
                                       <span className="close-photo"><MdClear /></span>
                                       <img src={photo7} alt="photo7" />
                                   </div>
                               </li>
                           </ul>
                       </Col>
                   </Row>

                   <Row>
                       <Col className="mt-12 text-center" md={12}>
                           <NavLink exact to="/">
                               <Button className="all-btn-round mt-5 text-center font-segoeui" variant="primary">Save</Button>
                           </NavLink>
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

export default UploadPhotoUser;