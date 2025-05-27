import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { MdOutlineArrowForward } from "react-icons/md";
import shape from '../../../assets/images/shape2.png';
import bgweball from '../../../assets/images/bgweball.png';
import apps from '../../../assets/images/apps.png';
import appg from '../../../assets/images/appg.png';
import downloadApp from '../../../assets/images/downloadApp.png';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import './UploadPhoto.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const UploadPhoto = (props) => {
      const [file, setFile] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const userId = localStorage.getItem('userId');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Create preview for UI
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPhotoData(base64String);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a photo to upload');
      return;
    }

    setIsLoading(true);

    try {
      if (userId) {
        // If user is logged in, upload to server
        const formData = new FormData();
        formData.append('profilePhoto', file);
        
        const response = await fetch(
          `https://kiqko-backend.onrender.com/api/users/upload-photo/${userId}`,
          {
            method: 'POST',
            body: formData,
          }
        );
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Upload failed');
        }

        // Save URL to localStorage for immediate access
        localStorage.setItem('profilePhoto', data.photoUrl);
        history.push('/manage-media');
      } else {
        // If user is not logged in, save to localStorage as base64
        localStorage.setItem('profilePhoto', photoData);
        history.push('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
    return (
  <section>
      <section className="all-top-shape all-shape-inner">
        <img src={shape} alt="shape" />
      </section>
      <div className="all-container margin-bottom-step">
        <div className="all-container-inner setting-area position-top-all">
          <div className="all-seting-area">
            <Col md={12}>
              <div className="profile-main-part-area-inner mb-0 bg-all-pages mt-0 pb-0">
                <Col md={12} className="all-title-top mb-4 text-center">
                  <h4>Upload Profile Photo</h4>
                  <p className="sub-p">
                    To continue you need to add a profile photo.<br />
                  </p>
                </Col>

                <div className="page-wrapper-all">
                  <Row>
                    <Col className="text-center" md={12}>
                      <div className="add-photo-upload mb-3">
                        <input 
                          type="file" 
                          required 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          disabled={isLoading}
                        />
                      </div>

                      {photoData && (
                        <div className="image-preview mt-3">
                          <img
                            src={photoData}
                            alt="Preview"
                            style={{ maxWidth: '200px', borderRadius: '8px', border: '1px solid #ccc' }}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <Col className="mt-12" md={12}>
                      <Button 
                        className="all-btn-round mt-4" 
                        variant="primary" 
                        onClick={handleSubmit}
                        disabled={!photoData || isLoading}
                      >
                        {isLoading ? 'Uploading...' : 'Continue'}
                        {!isLoading && <MdOutlineArrowForward className="arrow-sign arrowba" />}
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <hr className="hr-color mt-4"></hr>
                    <p className="text-center app-p mb-0">
                      <span><img src={downloadApp} alt="downloadApp" /></span>Download our app for:
                    </p>
                    <div className="col-md-12 text-center">
                      <Button className="btn-app-link"><img src={apps} alt="apps" /></Button>
                      <Button className="btn-app-link"><img src={appg} alt="appg" /></Button>
                    </div>
                  </Row>
                </div>
              </div>
            </Col>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
        <div className="shape-footer-all footershape-basics">
          <img src={bgweball} alt="bgweball" />
        </div>
      </div>
    </section>

       
    );
};

export default UploadPhoto;