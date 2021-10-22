import React, { useState, useEffect } from "react"

import axios from "axios"
const create = axios.create()

// availity-reactstrap-validation
import {
  AvField,
  AvForm,
  AvCheckboxGroup,
  AvCheckbox,
} from "availity-reactstrap-validation"
import AvInput from "availity-reactstrap-validation/lib/AvInput"
const IndexEnquiry = props => {
  // forget password
  const [forgetpasswordemail, setForgetpasswordemail] = useState("")
  const [details, setdetails] = useState([])
  const [alert, setAlert] = useState(false)

  //forgetpassword
  const changeForgetPasswordEmail = e => {
    setForgetpasswordemail(e.target.value)
  }

  const submitContact = e => {
    const formData = new FormData()
    formData.append("details", JSON.stringify(details))

    create
      .post(process.env.REACT_APP_BASEURL + "/basic/contactsubmit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        setAlert(!alert)
        console.log(res)
      })
  }
  const showError = err => {
    console.log(err)
  }
  const changeDetails = (type, e, key) => {
    const checkexists = details.some(chk => chk.key === key)
    if (checkexists) {
      console.log("exists")
      const index = details.findIndex(c => c.key === key)
      const newArray = details.slice()
      newArray.splice(index, 1)
      setdetails(newArray)
      let col
      col = {
        key: key,
        type: type,
        details: e.target.value,
      }
      setdetails(details => details.concat(col))
      console.log(details)
    } else {
      console.log("not exists!")
      let col
      col = {
        key: key,
        type: type,
        details: e.target.value,
      }
      setdetails(details => details.concat(col))
      console.log(details)
    }
  }
  return (
    <>
      <div className="contact-form">
        <AvForm
          onValidSubmit={submitContact}
          onInvalidSubmit={e => showError(e)}
        >
          <h2>DISCUSS OPTIONS & PRICING</h2>
          {alert ? (
            <div
              class="text-center mb-2 mt-2 alert alert-success fade show"
              role="alert"
            >
              Your Details has submitted successfully.
            </div>
          ) : (
            ""
          )}
          <div className="row">
            <div className="col-md-6">
              <AvField
                type="text"
                name="1"
                className="form-control con-form-control"
                required
                placeholder="Your First Name"
                onChange={e => {
                  changeDetails("First Name", e, 1)
                }}
              />
            </div>
            <div className="col-md-6">
              <AvField
                type="text"
                name="2"
                className="form-control con-form-control"
                required
                placeholder="Your Last Name"
                onChange={e => {
                  changeDetails("Last Name", e, 2)
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <AvField
                type="text"
                name="3"
                className="form-control con-form-control"
                required
                placeholder="Phone number"
                onChange={e => {
                  changeDetails("Phone Number", e, 3)
                }}
              />
            </div>
            <div className="col-md-6">
              <AvField
                type="text"
                name="4"
                className="form-control con-form-control"
                required
                placeholder="Business Email"
                onChange={e => {
                  changeDetails("Business Email", e, 4)
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <AvField
                type="select"
                required
                name="budgetRange"
                className="form-control"
                onChange={e => {
                  changeDetails("Budget Range", e, 5)
                }}
              >
                <option value="">Budget Range</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000 - $75,000">$50,000 - $75,000</option>
                <option value="$75,000 - $100,000">$75,000 - $100,000</option>
                <option value="$100000 - $500,000">$100000 - $500,000</option>
                <option value="$500,000 - $1,000,000">
                  $500,000 - $1,000,000
                </option>
                <option value="$1,000,000 - $2,500,000">
                  $1,000,000 - $2,500,000
                </option>
                <option value="$2,500,000 - $10,000,000">
                  $2,500,000 - $10,000,000
                </option>
                <option value="$10,000,000+">$10,000,000+</option>
                <option value="Budget TBD">Budget TBD</option>
              </AvField>
            </div>
            <div className="col-md-6">
              <AvField
                type="text"
                name="5"
                className="form-control con-form-control"
                required
                placeholder="List Your Market(s) of Interest"
                onChange={e => {
                  changeDetails("Market Interest", e, 6)
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>Select Media Type(s) of Interest</label>
              <div className="row">
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      name="media_interest"
                      id="cnt1"
                      class="form-check-input"
                      value="Airports"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 19)
                      }}
                    />
                    <label class="form-check-label" for="cnt1">
                      Airports
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      name="media_interest"
                      id="cnt2"
                      value="Digital Outdoor"
                      class="form-check-input"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 20)
                      }}
                    />
                    <label class="form-check-label" for="cnt2">
                      Digital Outdoor
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      name="media_interest"
                      id="cnt3"
                      value="Subway"
                      class="form-check-input"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 21)
                      }}
                    />
                    <label class="form-check-label" for="cnt3">
                      Subway
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      name="media_interest"
                      id="cnt4"
                      value="Billboards"
                      class="form-check-input"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 22)
                      }}
                    />
                    <label class="form-check-label" for="cnt4">
                      Billboards
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      name="media_interest"
                      value="Malls"
                      id="cnt5"
                      class="form-check-input"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 23)
                      }}
                    />
                    <label class="form-check-label" for="cnt5">
                      Malls
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="Taxi Tops"
                      id="cnt6"
                      name="media_interest"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 24)
                      }}
                    />
                    <label class="form-check-label" for="cnt6">
                      Taxi Tops
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      value="Buses"
                      class="form-check-input"
                      id="cnt7"
                      name="media_interest"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 25)
                      }}
                    />
                    <label class="form-check-label" for="cnt7">
                      Buses
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="Mobile Trucks"
                      id="cnt8"
                      name="media_interest"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 26)
                      }}
                    />
                    <label class="form-check-label" for="cnt8">
                      Mobile Trucks
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="Taxi Interiors"
                      name="media_interest"
                      id="cnt9"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 27)
                      }}
                    />
                    <label class="form-check-label" for="cnt9">
                      Taxi Interiors
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      value="Bus Shelters"
                      class="form-check-input"
                      id="cnt10"
                      name="media_interest"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 28)
                      }}
                    />
                    <label class="form-check-label" for="cnt10">
                      Bus Shelters
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="Rail & Train"
                      id="cnt11"
                      name="media_interest"
                      onChange={e => {
                        changeDetails("Media Type Interest", e, 29)
                      }}
                    />
                    <label class="form-check-label" for="cnt11">
                      Rail & Train
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>What are your Campaign Goals?</label>
              <div className="row">
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="Branding"
                      id="cnnt1"
                      name="campaign_goals"
                      onChange={e => {
                        changeDetails("Branding", e, 30)
                      }}
                    />
                    <label class="form-check-label" for="cnnt1">
                      Branding
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value="Website Visits"
                      id="cnnt2"
                      name="campaign_goals"
                      onChange={e => {
                        changeDetails("Branding", e, 31)
                      }}
                    />
                    <label class="form-check-label" for="cnnt2">
                      Website Visits
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      value="Other"
                      class="form-check-input"
                      id="cnnt3"
                      name="campaign_goals"
                      onChange={e => {
                        changeDetails("Branding", e, 32)
                      }}
                    />
                    <label class="form-check-label" for="cnnt3">
                      Other
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      value="Direct Response"
                      class="form-check-input"
                      id="cnnt4"
                      name="campaign_goals"
                      onChange={e => {
                        changeDetails("Branding", e, 33)
                      }}
                    />
                    <label class="form-check-label" for="cnnt4">
                      Direct Response
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      value="All of the Above"
                      class="form-check-input"
                      id="cnnt5"
                      name="campaign_goals"
                      required
                      onChange={e => {
                        changeDetails("Branding", e, 34)
                      }}
                    />
                    <label class="form-check-label" for="cnnt5">
                      All of the Above
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label></label>
              <AvInput
                type="select"
                required
                name="campaign"
                className="form-control"
                onChange={e => {
                  changeDetails("Campaign", e, 35)
                }}
              >
                <option value="">Campaign</option>
                <option value="new">New Campaign</option>
                <option value="existing">Existing Campaign</option>
              </AvInput>
            </div>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Submit"
              className="wpcf7-form-control wpcf7-submit submit-btn"
            />
          </div>
        </AvForm>
      </div>
    </>
  )
}

export default IndexEnquiry
