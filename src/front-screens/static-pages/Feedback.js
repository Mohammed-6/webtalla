import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { Country, State, City } from "country-state-city"
import { AvField, AvForm } from "availity-reactstrap-validation"
import Header from "../Header"
import Footer from "../Footer"

import Pimage from "../../assets/front-assets/images/partner-image.png"

import axios from "axios"
const create = axios.create()

import BG from "../../assets/front-assets/images/feedback.png"
const Feedback = props => {
  const [country, setCountry] = useState("Nigeria")
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState("")
  const [ftype, setftype] = useState("")
  const [message, setmessage] = useState("")
  const [alert, setalert] = useState(false)

  const changeCountry = e => {
    const tt = e.target.value
    const splt = tt.split(",")

    setCountry(tt)
    setmobile(splt[1])
  }
  const changeName = e => {
    setname(e.target.value)
  }
  const changeEmail = e => {
    setemail(e.target.value)
  }
  const changeMobile = e => {
    setmobile(e.target.value)
  }
  const changeFtype = e => {
    setftype(e.target.value)
  }
  const changeMessage = e => {
    setmessage(e.target.value)
  }
  useEffect(() => {}, [])
  const submitFeedback = () => {
    const tt = country
    const splt = tt.split(",")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("mobile", mobile)
    formData.append("ftype", ftype)
    formData.append("message", message)
    formData.append("country", splt[0])

    create
      .post(process.env.REACT_APP_BASEURL + "/basic/sendfeedback", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        console.log(res.data)
        setalert(true)
        setname("")
        setemail("")
        setmobile("")
        setftype("")
        setmessage("")
        setCountry("")
      })
  }
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
              <p align="justify">
                Dear Customer,
                <br />
                <span>
                  Your Feedbacks are valuable to us for improving & serving you
                  better every time you choose WebTalla.com as your advertising
                  Partner. Positive or Negative your Review, Feedback &
                  complaints only help us to solve your problems & serve you
                  better in future. Please write below:
                </span>
                <AvForm onValidSubmit={submitFeedback}>
                  <div className="row">
                    <div className="col-md-6">
                      {alert ? (
                        <div
                          class="text-center mb-4 alert alert-success fade show mt-4"
                          role="alert"
                        >
                          Your feedback has been submitted successfully.
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="row">
                        <div className="col-md-6">
                          <AvField
                            type="text"
                            name="name"
                            className="form-control mt-4"
                            placeholder="Name*"
                            required
                            onChange={changeName}
                            value={name}
                          />
                        </div>
                        <div className="col-md-6">
                          <AvField
                            type="text"
                            name="email"
                            className="form-control mt-4"
                            placeholder="Email Address*"
                            required
                            onChange={changeEmail}
                            value={email}
                          />
                        </div>
                        <div className="col-md-6">
                          <AvField
                            type="select"
                            name="country"
                            className="form-control mt-4"
                            required
                            id="title"
                            value={country}
                            onChange={changeCountry}
                          >
                            <option value="">Country*</option>
                            {Country.getAllCountries().map(cnt => {
                              return (
                                <option value={cnt.name + "," + cnt.phonecode}>
                                  {cnt.name}
                                </option>
                              )
                            })}
                          </AvField>
                        </div>
                        <div className="col-md-6">
                          <AvField
                            type="text"
                            required
                            name="phone"
                            className="form-control mt-4"
                            placeholder="Mobile Number*"
                            onChange={changeMobile}
                            value={mobile}
                          />
                        </div>
                        <div className="col-md-6 mt-3">
                          <AvField
                            type="select"
                            class="form-control mt-4"
                            required
                            name="feedback_type"
                            onChange={changeFtype}
                            value={ftype}
                          >
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
                          </AvField>
                        </div>
                        <div className="col-md-12">
                          <textarea
                            className="form-control mt-4"
                            placeholder="Put down your message here"
                            onChange={changeMessage}
                            value={message}
                          />
                        </div>
                        <div className="pt-6">
                          <input
                            type="submit"
                            className="btn btn-primary mt-4"
                            value="Submit"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AvForm>
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
