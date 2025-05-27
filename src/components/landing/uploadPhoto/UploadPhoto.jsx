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
    const [photoData, setPhotoData] = useState(null);
  const history = useHistory();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPhotoData(base64String);
      localStorage.setItem('profilePhoto', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleContinue = () => {
    if (photoData) {
      history.push('/login');
    } else {
      alert("Please upload a profile photo before continuing.");
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
                        <input type="file" required accept="image/*" onChange={handleFileChange} />
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
                      <Button className="all-btn-round mt-4" variant="primary" onClick={handleContinue}>
                        Continue<MdOutlineArrowForward className="arrow-sign arrowba" />
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