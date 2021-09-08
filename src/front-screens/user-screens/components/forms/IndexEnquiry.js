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

  //forgetpassword
  const changeForgetPasswordEmail = e => {
    setForgetpasswordemail(e.target.value)
  }

  const submitForgetpass = e => {
    // const formData = new FormData()
    // formData.append("email", forgetpasswordemail)
    // create
    //   .post(process.env.REACT_APP_BASEURL + "/login/forgetpass", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then(res => {
    //     if (res.data !== 0) {
    //       props.credModalHide()
    //       alert("Please check your mail to change password")
    //     } else {
    //       alert("Email address does not exists")
    //     }
    //     console.log(res)
    //   })
  }
  const showError = err => {
    console.log(err)
  }
  return (
    <>
      <div className="contact-form">
        <AvForm
          onValidSubmit={submitForgetpass}
          onInvalidSubmit={e => showError(e)}
        >
          <h2>DISCUSS OPTIONS & PRICING</h2>
          <div className="row">
            <div className="col-md-6">
              <AvField
                type="text"
                name="1"
                className="form-control con-form-control"
                required
                placeholder="Your First Name"
              />
            </div>
            <div className="col-md-6">
              <AvField
                type="text"
                name="2"
                className="form-control con-form-control"
                required
                placeholder="Your Last Name"
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
              />
            </div>
            <div className="col-md-6">
              <AvField
                type="text"
                name="4"
                className="form-control con-form-control"
                required
                placeholder="Business Email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Budget Range</label>
              <AvField required name="budgetRange" className="form-control">
                <option value=""></option>
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
                      class="form-check-input"
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
                      class="form-check-input"
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
                      class="form-check-input"
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
                      id="cnt5"
                      class="form-check-input"
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
                      id="cnt6"
                      name="media_interest"
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
                      class="form-check-input"
                      id="cnt7"
                      name="media_interest"
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
                      id="cnt8"
                      name="media_interest"
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
                      name="media_interest"
                      id="cnt9"
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
                      class="form-check-input"
                      id="cnt10"
                      name="media_interest"
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
                      id="cnt11"
                      name="media_interest"
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
                      id="cnnt1"
                      name="campaign_goals"
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
                      id="cnnt2"
                      name="campaign_goals"
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
                      class="form-check-input"
                      id="cnnt3"
                      name="campaign_goals"
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
                      class="form-check-input"
                      id="cnnt4"
                      name="campaign_goals"
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
                      class="form-check-input"
                      id="cnnt5"
                      name="campaign_goals"
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
              <label>Campaign</label>
              <AvInput required name="campaign" className="form-control">
                <option value="">Please Select</option>
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
