import CommonLayout from "../../layouts/Common";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import shape from "../../assets/images/shape2.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { MdOutlineArrowForward } from "react-icons/md";
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
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import OnlineUsers from "../profile/OnlineUsers/OnlineUsers";
const SearchFilters = (props) => {
     const [loading, setLoading] = useState(false);
  const history = useHistory();

    const [searchFilters, setSearchFilters] = useState({
  distance: {
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
  seeking: "",
  ageRange: {
    min: 18,
    max: 80,
  },
  ethnicity: [],
  maritalStatus: [],
  height: {
    min: "",
    max: "",
  },
  bodyType: [],
  haveKids: "",
  wantKids: [],
  hereFor: [],
  relocate: "",
});



// Handle text and select inputs
const handleInputChange = (category, field, value) => {
  setSearchFilters((prev) => ({
    ...prev,
    [category]: {
      ...prev[category],
      [field]: value,
    },
  }));
};

// Handle radio button inputs
const handleRadioChange = (field, value) => {
  setSearchFilters((prev) => ({
    ...prev,
    [field]: value,
  }));
};

// Handle checkbox inputs (for arrays)
const handleCheckboxChange = (field, value) => {
  setSearchFilters((prev) => {
    const currentValues = prev[field];
    if (currentValues.includes(value)) {
      return {
        ...prev,
        [field]: currentValues.filter((item) => item !== value),
      };
    } else {
      return {
        ...prev,
        [field]: [...currentValues, value],
      };
    }
  });
};


// Save and Search function to send data to backend
 const saveAndSearch = async () => {
  setLoading(true);
  const userId = localStorage.getItem("userId");

  if (!userId) {
    
    Swal.fire({
              icon: 'error',
              title: 'User Not Logged In',
              text: 'Please log in to save search filters.',
              confirmButtonText: 'OK'
            });
      
    history.push("/login"); // Redirect to login page
    setLoading(false);
    return;
  }

  // Prepare the payload
  const payload = {
    userId,
    ...searchFilters,
  };

  try {
    console.log("Saving search filters:", payload);

    // Send POST request to the backend
    const response = await axios.post(
      "https://kiqko-backend.onrender.com/api/users/search-filters",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      
      Swal.fire({
              icon: 'success',
              title: 'Search Filters Saved',
              text: 'Your search filters have been saved successfully.',
              confirmButtonText: 'OK'
            });
      
      history.push("/search-results"); // Navigate to search results
    }
  } catch (error) {
    console.error("Error saving search filters:", error);
    const errorMessage = error.response?.data?.message || "An error occurred while saving search filters. Please try again later.";
    
    Swal.fire({
              icon: 'error',
              title: 'Error',
              text: errorMessage,
              confirmButtonText: 'OK'
            });
    
  } finally {
    setLoading(false);
  }
};
  return (
    <CommonLayout>
      <section className="all-top-shape">
        <img src={shape} alt="shape" />
      </section>
      <div className="all-container">
        <div className="pb-5 mb-5">
          <div className="page-wrapper-all">
            <Container className="width-full-responsive">
              <Row className="responise-flex-column-reverse m0-all">
                <Col md={3}>
                  <div className="left-panel-allpages mar-top-left">
                     <OnlineUsers/>

                    <div className="user-type-left">
                      <ul className="list-user-type left-nav">
                        <li>
                          <NavLink exact to="/profile" activeClassName="active">
                            <img src={homea} alt="homea" />
                            HOME
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
                <Col md={9}>
                  <div className="profile-main-part-area-inner bg-all-pages margin-top-sear-filter pl-r-pr-r width-extra">
                    <Col md={12} className="all-title-top mb-4 text-center">
                      <h4>Search Filters</h4>
                      {/* <h4 className="search-filter-h4">Search Filters</h4> */}
                    </Col>

                    <div className="page-wrapper-all">
                      <div className="pageWrapper-inner mt-5">
                        <Row className="m-0-responsive">
                          <h4 className="sarch-sub-deading">Distance Search</h4>
                          <Col md={6}>
                            <Form.Group className="mb-2">
                              <Form.Control
                                className="form-custom"
                                type="text"
                                placeholder="City / Town"
                                value={searchFilters.distance.city}
                                onChange={(e) =>
                                  handleInputChange(
                                    "distance",
                                    "city",
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-2">
                              <Form.Control
                                className="form-custom"
                                type="text"
                                placeholder="State / Province"
                                value={searchFilters.distance.state}
                                onChange={(e) =>
                                  handleInputChange(
                                    "distance",
                                    "state",
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Select
                              className="form-custom"
                              required
                              size="lg"
                              value={searchFilters.distance.country}
                              onChange={(e) =>
                                handleInputChange(
                                  "distance",
                                  "country",
                                  e.target.value
                                )
                              }
                            >
                              <option>Country</option>
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Afghanistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Antigua and Barbuda">
                                Antigua and Barbuda
                              </option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Australia">Australia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bosnia & Herzegovina">
                                Bosnia & Herzegovina
                              </option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cabo Verde">Cabo Verde</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Central African Republic (CAR)">
                                Central African Republic (CAR)
                              </option>
                              <option value="Chad">Chad</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Democratic Republic of Congo">
                                Democratic Republic of Congo
                              </option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Cote d'Ivoire">
                                Cote d'Ivoire
                              </option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czech Republic">
                                Czech Republic
                              </option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">
                                Dominican Republic
                              </option>
                              <option value="East Timor">East Timor</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">El Salvador</option>
                              <option value="Equatorial Guinea">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Eswatini (formerly Swaziland)">
                                Eswatini (formerly Swaziland)
                              </option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Falkland Islands">
                                Falkland Islands
                              </option>
                              <option value="Faroe Islands">
                                Faroe Islands
                              </option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="French Guiana">
                                French Guiana
                              </option>
                              <option value="Frech Polynesia">
                                Frech Polynesia
                              </option>
                              <option value="French Southern & Antarctic Lands">
                                French Southern & Antarctic Lands
                              </option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Germany">Germany</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Gibraltar">Gibraltar</option>
                              <option value="Glorioso Islands">
                                Glorioso Islands
                              </option>
                              <option value="Greece">Greece</option>
                              <option value="Greenland">Greenland</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guadeloupe">Guadeloupe</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guernsey Island">
                                Guernsey Island
                              </option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guinea-Bissau">
                                Guinea-Bissau
                              </option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Heard Island & McDonald Islands">
                                Heard Island & McDonald Islands
                              </option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong Kong">Hong Kong</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Isle of Man">Isle of Man</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Jan Mayen">Jan Mayen</option>
                              <option value="Japan">Japan</option>
                              <option value="Jersey">Jersey</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Juan de Nova Island">
                                Juan de Nova Island
                              </option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="Kosovo">Kosovo</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">
                                Liechtenstein
                              </option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macau">Macau</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">
                                Marshall Islands
                              </option>
                              <option value="Martinique">Martinique</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mayotte">Mayotte</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Micronesia">Micronesia</option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montenegro">Montenegro</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar</option>
                              <option value="Namibia">Namibia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherlands">Netherlands</option>
                              <option value="Netherlands Antilles">
                                Netherlands Antilles
                              </option>
                              <option value="New Caledonia">
                                New Caledonia
                              </option>
                              <option value="New Zealand">New Zealand</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Niue">Niue</option>
                              <option value="No Man's Land">
                                No Man's Land
                              </option>
                              <option value="Norfolk Island">
                                Norfolk Island
                              </option>
                              <option value="North Macedonia (formerly Macedonia)">
                                North Macedonia (formerly Macedonia)
                              </option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau">Palau</option>
                              <option value="Panama">Panama</option>
                              <option value="Palestine">Palestine</option>
                              <option value="Papua New Guinea">
                                Papua New Guinea
                              </option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Pitcain Islands">
                                Pitcain Islands
                              </option>
                              <option value="Philippines">Philippines</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Reunion">Reunion</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Saint Lucia">Saint Lucia</option>
                              <option value="Saint Pierre & Miquelon">
                                Saint Pierre & Miquelon
                              </option>
                              <option value="Saint Vincent and the Grenadines">
                                Saint Vincent and the Grenadines
                              </option>
                              <option value="Samoa">Samoa</option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome and Principe">
                                Sao Tome and Principe
                              </option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Serbia">Serbia</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Sloveni">Sloveni</option>
                              <option value="Solomon Islands">
                                Solomon Islands
                              </option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">South Africa</option>
                              <option value="South Georgia & the South Sandwich Islands">
                                South Georgia & the South Sandwich Islands
                              </option>
                              <option value="South Korea">South Korea</option>
                              <option value="South Sudan">South Sudan</option>
                              <option value="Spain">Spain</option>
                              <option value="Spratly Islands">
                                Spratly Islands
                              </option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Svalbard">Svalbard</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Taiwan">Taiwan</option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Timor-Leste">Timor-Leste</option>
                              <option value="Togo">Togo</option>
                              <option value="Tokelau">Tokelau</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad and Tobago">
                                Trinidad and Tobago
                              </option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Turks & Caicos Islands">
                                Turks & Caicos Islands
                              </option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Emirates">
                                United Arab Emirates
                              </option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="Uruguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Vatican City">Vatican City</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Walls and Futuna">
                                Walls and Futuna
                              </option>
                              <option value="West Bank">West Bank</option>
                              <option value="Western Sahara">
                                Western Sahara
                              </option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </Form.Select>
                          </Col>

                          <Col md={6} className="mar-top-8">
                            <Form.Group className="mb-2">
                              <Form.Control
                                className="form-custom"
                                type="text"
                                placeholder="Zip / Postal Code"
                                value={searchFilters.distance.zipCode}
                                onChange={(e) =>
                                  handleInputChange(
                                    "distance",
                                    "zipCode",
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>

                          {/* <Col md={6} className="text-center btn-modal-round mt-3">
                        <NavLink exact to="/">
                            <Button className="full-width btn-all-landing margin-all-modal-btn btn" variant="link">
                        Save<MdOutlineArrowForward className="arrow-sign" />
                        </Button>
                        </NavLink>
                    </Col> */}

                          <Col
                            md={6}
                            className="text-center btn-modal-round mt-3 mt-1-res offset-md-3"
                          >
                           
                              {/* <Button
                                className="full-width btn-all-landing margin-all-modal-btn btn"
                                variant="link"
                                onClick={saveAndSearch}
                                disabled={loading}
                              >
                                {loading ? "Saving..." : "Save & Search"}
                                <MdOutlineArrowForward className="arrow-sign" />
                              </Button> */}
                           
                          </Col>
                          <hr className="hr-color mt-2"></hr>
                        </Row>

                        <Row>
                          <h4 className="sarch-sub-deading mb-3 mt-3">
                            Advanced Search
                          </h4>
                          <Col md={12} className="pr-0-responsive">
                            <label className="labelForm">I'm Seeking a</label>
                            {/* activebtn class need to use for active button */}
                            <Button
                              className={`formBtn all-select-btnr ${
                                searchFilters.seeking === "woman"
                                  ? "activebtn"
                                  : ""
                              }`}
                              variant="primary"
                              onClick={() =>
                                handleRadioChange("seeking", "woman")
                              }
                            >
                              <input
                                type="radio"
                                checked={searchFilters.seeking === "woman"}
                                readOnly
                              />
                              <label>Woman</label>
                            </Button>

                            <Button
                              className={`formBtn all-select-btnr ${
                                searchFilters.seeking === "man"
                                  ? "activebtn"
                                  : ""
                              }`}
                              variant="primary"
                              onClick={() =>
                                handleRadioChange("seeking", "man")
                              }
                            >
                              <input
                                type="radio"
                                checked={searchFilters.seeking === "man"}
                                readOnly
                              />
                              <label>Man</label>
                            </Button>
                          </Col>
                        </Row>

                        <Row className="row-custom-width row">
                          <label className="labelForm mt-4">
                            Between the ages of{" "}
                          </label>
                          <Col className="pe-0" md={4}>
                            <Form.Select
                              className="form-custom-inner brder-form"
                              size="lg"
                              value={searchFilters.ageRange.min}
                              onChange={(e) =>
                                handleInputChange(
                                  "ageRange",
                                  "min",
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              {Array.from({ length: 62 }, (_, i) => i + 18).map(
                                (age) => (
                                  <option key={age} value={age}>
                                    {age}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                          <Col className="ps-1 pe-0 text-center" md={1}>
                            <span className="to-span">
                              <strong>to</strong>
                            </span>
                          </Col>
                          <Col className="ps-1 ps-0 pl-13px" md={4}>
                            <Form.Select
                              className="form-custom-inner brder-form"
                              size="lg"
                              value={searchFilters.ageRange.max}
                              onChange={(e) =>
                                handleInputChange(
                                  "ageRange",
                                  "max",
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              {Array.from({ length: 62 }, (_, i) => i + 18).map(
                                (age) => (
                                  <option key={age} value={age}>
                                    {age}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                        <Row className="me-0">
                          <Col className="mt-4 pe-0 pt-3" md={12}>
                            <label className="labelForm">Race</label>
                            {[
                              "White/Caucasian",
                              "Asian",
                              "Black/African Decent",
                              "East Indian",
                              "Latino/Hispanic",
                              "Middle Eastern",
                              "Mixed Race",
                              "Native American",
                              "Pacific Islander",
                              "Any",
                            ].map((race) => (
                              <Button
                                key={race}
                                className={`formBtn all-select-btn ${
                                  searchFilters.ethnicity.includes(race)
                                    ? "activebtn"
                                    : ""
                                }`}
                                variant="primary"
                                onClick={() =>
                                  handleCheckboxChange("ethnicity", race)
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={searchFilters.ethnicity.includes(
                                    race
                                  )}
                                  readOnly
                                />
                                <label>{race}</label>
                              </Button>
                            ))}
                          </Col>
                        </Row>

                        <Row>
                          <Col className="mt-4 pt-3" md={12}>
                            <label className="labelForm">Marital Status</label>
                            {[
                              "Single",
                              "Divorced",
                              "Separated",
                              "Widowed",
                              "Attached",
                              "Any",
                            ].map((status) => (
                              <Button
                                key={status}
                                className={`formBtn all-select-btn ${
                                  searchFilters.maritalStatus.includes(status)
                                    ? "activebtn"
                                    : ""
                                }`}
                                variant="primary"
                                onClick={() =>
                                  handleCheckboxChange("maritalStatus", status)
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={searchFilters.maritalStatus.includes(
                                    status
                                  )}
                                  readOnly
                                />
                                <label>{status}</label>
                              </Button>
                            ))}
                          </Col>
                        </Row>

                        <Row className="row-custom-width row">
                          <label className="labelForm mt-4">Height</label>
                          <Col className="pe-0" md={5}>
                            <Form.Select
                              className="form-custom-inner brder-form font-small"
                              size="lg"
                              value={searchFilters.height.min}
                              onChange={(e) =>
                                handleInputChange(
                                  "height",
                                  "min",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Min Height</option>
                              {[
                                "150cm - (4'11\")",
                                "152cm - (5'0\")",
                                "155cm - (5'1\")",
                                "157cm - (5'2\")",
                                "160cm - (5'3\")",
                                "163cm - (5'4\")",
                                "165cm - (5'5\")",
                                "168cm - (5'6\")",
                                "170cm - (5'7\")",
                                "173cm - (5'8\")",
                                "175cm - (5'9\")",
                                "178cm - (5'10\")",
                                "180cm - (5'11\")",
                                "183cm - (6'0\")",
                                "185cm - (6'1\")",
                                "188cm - (6'2\")",
                                "191cm - (6'3\")",
                                "193cm - (6'4\")",
                                "195cm - (6'5\")",
                                "198cm - (6'6\")",
                                "201cm - (6'7\")",
                                "203cm - (6'8\")",
                                "205cm - (6'9\")",
                                "208cm - (6'10\")",
                                "210cm - (6'11\")",
                                "213cm - (7'0\")",
                              ].map((height) => (
                                <option key={height} value={height}>
                                  {height}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col className="ps-1 ps-0 pl-13px mar-top-8" md={5}>
                            <Form.Select
                              className="form-custom-inner brder-form font-small"
                              size="lg"
                              value={searchFilters.height.max}
                              onChange={(e) =>
                                handleInputChange(
                                  "height",
                                  "max",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Max Height</option>
                              {[
                                "150cm - (4'11\")",
                                "152cm - (5'0\")",
                                "155cm - (5'1\")",
                                "157cm - (5'2\")",
                                "160cm - (5'3\")",
                                "163cm - (5'4\")",
                                "165cm - (5'5\")",
                                "168cm - (5'6\")",
                                "170cm - (5'7\")",
                                "173cm - (5'8\")",
                                "175cm - (5'9\")",
                                "178cm - (5'10\")",
                                "180cm - (5'11\")",
                                "183cm - (6'0\")",
                                "185cm - (6'1\")",
                                "188cm - (6'2\")",
                                "191cm - (6'3\")",
                                "193cm - (6'4\")",
                                "195cm - (6'5\")",
                                "198cm - (6'6\")",
                                "201cm - (6'7\")",
                                "203cm - (6'8\")",
                                "205cm - (6'9\")",
                                "208cm - (6'10\")",
                                "210cm - (6'11\")",
                                "213cm - (7'0\")",
                              ].map((height) => (
                                <option key={height} value={height}>
                                  {height}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="mt-4 pt-3 body-type-btn" md={12}>
                            <label className="labelForm">Body Type</label>
                            {[
                              "Slim / Slender",
                              "Athletic / Fit",
                              "Average",
                              "Curvy",
                              "Muscular",
                              "A few extra pounds",
                              "Big and Beautiful",
                              "Heavy",
                              "Any",
                            ].map((type) => (
                              <Button
                                key={type}
                                className={`formBtn all-select-btn ${
                                  searchFilters.bodyType.includes(type)
                                    ? "activebtn"
                                    : ""
                                }`}
                                variant="primary"
                                onClick={() =>
                                  handleCheckboxChange("bodyType", type)
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={searchFilters.bodyType.includes(
                                    type
                                  )}
                                  readOnly
                                />
                                <label>{type}</label>
                              </Button>
                            ))}
                          </Col>
                        </Row>

                        <Row>
                          <Col className="mt-4 pt-3 kid-btn" md={12}>
                            <label className="labelForm">Have Kids</label>
                            {["Yes", "No", "Any"].map((option) => (
                              <Button
                                key={option}
                                className={`formBtn all-select-btnr ${
                                  searchFilters.haveKids === option
                                    ? "activebtn"
                                    : ""
                                }`}
                                variant="primary"
                                onClick={() =>
                                  handleRadioChange("haveKids", option)
                                }
                              >
                                <input
                                  type="radio"
                                  checked={searchFilters.haveKids === option}
                                  readOnly
                                />
                                <label>{option}</label>
                              </Button>
                            ))}
                          </Col>
                        </Row>

                        <Row>
                          <Col className="mt-4 pt-3 kid-btn" md={12}>
                            <label className="labelForm">Want Kids</label>
                            {["Yes", "No", "Maybe", "Any"].map((option) => (
                              <Button
                                key={option}
                                className={`formBtn all-select-btn ${
                                  searchFilters.wantKids.includes(option)
                                    ? "activebtn"
                                    : ""
                                }`}
                                variant="primary"
                                onClick={() =>
                                  handleCheckboxChange("wantKids", option)
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={searchFilters.wantKids.includes(
                                    option
                                  )}
                                  readOnly
                                />
                                <label>{option}</label>
                              </Button>
                            ))}
                          </Col>
                        </Row>

                        <Row className="m-0-responsive here-for">
                          <Col className="mt-4 pt-3 kid-btn" md={12}>
                            <label className="labelForm">Here For</label>
                            {[
                              "Long-term",
                              "Short-term",
                              "Dating",
                              "Friendship",
                              "Hangout Buddy",
                              "Any",
                            ].map((option) => (
                              <Button
                                key={option}
                                className={`formBtn all-select-btn ${
                                  searchFilters.hereFor.includes(option)
                                    ? "activebtn"
                                    : ""
                                }`}
                                variant="primary"
                                onClick={() =>
                                  handleCheckboxChange("hereFor", option)
                                }
                              >
                                <input
                                  type="checkbox"
                                  checked={searchFilters.hereFor.includes(
                                    option
                                  )}
                                  readOnly
                                />
                                <label>{option}</label>
                              </Button>
                            ))}
                          </Col>
                        </Row>

                        <Row>
                          <Col className="mt-4 pt-3 kid-btn" md={12}>
                            <label className="labelForm">Relocate</label>
                            {["Yes", "No", "Any"].map((option) => (
                              <Button
                                key={option}
                                className={`formBtn all-select-btnr ${
                                  searchFilters.relocate === option
                                    ? "activebtn"
                                    : ""
                                }`}
                                variant="primary"
                                onClick={() =>
                                  handleRadioChange("relocate", option)
                                }
                              >
                                <input
                                  type="radio"
                                  checked={searchFilters.relocate === option}
                                  readOnly
                                />
                                <label>{option}</label>
                              </Button>
                            ))}
                          </Col>
                        </Row>
                      </div>
                      <Row>
                        <Col
                          className="mt-12 mt-5 mar-top-8 offset-md-3"
                          md={6}
                        >
                         
                           <Button
                                className="all-btn-round mt-4 text-start"
                              variant="primary"
                                onClick={saveAndSearch}
                                disabled={loading}
                              >
                                {loading ? "Searching...." : "Save & Search"}
                                <MdOutlineArrowForward className="arrow-sign" />
                              </Button>
                         
                        </Col>
                      </Row>
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

export default SearchFilters;
