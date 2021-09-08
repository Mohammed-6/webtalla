import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import BG from "../../assets/front-assets/images/contact_us.png"
const Contact = props => {
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
      },
      err => console.log(err)
    )
  }, [])

  return (
    <>
      <Header />
      <div
        class="banner-area abt-banner-bg"
        style={{ backgroundImage: "url(" + BG + ")" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <div class="page-title-box d-block align-items-center justify-content-between">
                <h4 class="mb-1 font-size-18 text-center text-white">
                  Contact
                </h4>
                <div class="page-title-right">
                  <nav class="">
                    <ol class="breadcrumb m-0 justify-content-center">
                      <li class="breadcrumb-item">
                        <Link to="/" className="text-white">
                          Home
                        </Link>
                      </li>
                      <li class="active breadcrumb-item" aria-current="page">
                        <Link to="" className="text-white">
                          Contact
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-page">
        <h1 className="text-center pb-6">OUTDOOR MEDIA BUYERS</h1>
        <div className="container">
          <div className="row pb-6">
            <div className="col-md-4">
              <div className="contact-info text-center">
                <i className="bx bx-phone"></i>
                <h2>Phone</h2>
                <p>
                  070 - 39090157
                  <br /> 081 - 26284849
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info text-center">
                <i className="bx bxs-map"></i>
                <h2>Address</h2>
                <p>
                  D-Wing Ground Floor Reinsurance Building beside Bank of
                  Industry, Herbert Macaulay way, Central Business District FCT,
                  Abuja
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info text-center">
                <i className="bx bx-envelope"></i>
                <h2>Email</h2>
                <p>info@webtalla.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="card">
            <div className="card-body">
              <form>
                <h1>Request Form</h1>
                <h2>DISCUSS OPTIONS & PRICING</h2>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="cf_fname"
                      className="form-control con-form-control"
                      aria-required="true"
                      placeholder="Your First Name"
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="cf_fname"
                      className="form-control con-form-control"
                      aria-required="true"
                      placeholder="Your Last Name"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="cf_fname"
                      className="form-control con-form-control"
                      aria-required="true"
                      placeholder="Phone number"
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="cf_fname"
                      className="form-control con-form-control"
                      aria-required="true"
                      placeholder="Business Email"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Budget Range</label>
                    <select className="form-control">
                      <option value=""></option>
                      <option value="$10,000 - $25,000">
                        $10,000 - $25,000
                      </option>
                      <option value="$25,000 - $50,000">
                        $25,000 - $50,000
                      </option>
                      <option value="$50,000 - $75,000">
                        $50,000 - $75,000
                      </option>
                      <option value="$75,000 - $100,000">
                        $75,000 - $100,000
                      </option>
                      <option value="$100000 - $500,000">
                        $100000 - $500,000
                      </option>
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
                    </select>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="cf_fname"
                      className="form-control con-form-control"
                      aria-required="true"
                      placeholder="List Your Market(s) of Interest"
                    ></input>
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
                            class="form-check-input"
                            id="cnt1"
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
                            class="form-check-input"
                            id="cnt2"
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
                            class="form-check-input"
                            id="cnt3"
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
                            class="form-check-input"
                            id="cnt4"
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
                            class="form-check-input"
                            id="cnt5"
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
                            id="cnt1"
                          />
                          <label class="form-check-label" for="cnt1">
                            Branding
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="cnt2"
                          />
                          <label class="form-check-label" for="cnt2">
                            Website Visits
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="cnt3"
                          />
                          <label class="form-check-label" for="cnt3">
                            Other
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="cnt4"
                          />
                          <label class="form-check-label" for="cnt4">
                            Direct Response
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="cnt5"
                          />
                          <label class="form-check-label" for="cnt5">
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
                    <select className="form-control">
                      <option value="">Please Select</option>
                      <option value="new">New Campaign</option>
                      <option value="existing">Existing Campaign</option>
                    </select>
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="wpcf7-form-control wpcf7-submit submit-btn"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Contact
