import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import Pimage from "../../assets/front-assets/images/partner-image.png"

import BG from "../../assets/front-assets/images/feedback.png"
const Feedback = props => {
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
                  Feedback
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
                          Feedback
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
      <div className="feedback-page">
        <div className="container">
          <h2 className="text-black">— Feedback/Complaint —</h2>
          <div className="card">
            <div className="card-body">
              <p>
                Dear Customer,
                <br />
                <span>
                  Your Feedbacks are valuable to us for improving & serving you
                  better every time you choose webtalla.com as your advertising
                  Partner. Positive or Negative your Review, Feedback &
                  complaints only help us to solve your problems & serve you
                  better in future. Please write below:
                </span>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mt-4"
                          placeholder="Name*"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mt-4"
                          placeholder="Eamil Address*"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control mt-4"
                          placeholder="Mobile Number*"
                        />
                      </div>
                      <div className="col-md-6">
                        <select class="form-control mt-4" name="feedback_type">
                          <option value="">Feedback Type</option>
                          <option value="Feedback/Suggestions">
                            Feedback/Suggestions
                          </option>
                          <option value="Problem/Complaint">
                            Problem/Complaint
                          </option>
                          <option value="Ad Booking Process">
                            Ad Booking Process
                          </option>
                          <option value="Website Error">Website Error</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <textarea
                          className="form-control mt-4"
                          placeholder="Put down your message here"
                        />
                      </div>
                      <div className="pt-6">
                        <input
                          type="button"
                          className="btn btn-primary mt-4"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Feedback
