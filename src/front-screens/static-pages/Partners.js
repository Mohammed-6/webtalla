import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import Pimage from "../../assets/front-assets/images/partners.jpg"
import { AvField, AvForm } from "availity-reactstrap-validation"

import BG from "../../assets/front-assets/images/agency_partner.png"

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

const Partners = props => {
  // forget password
  const [aname, setaname] = useState("")
  const [name, setname] = useState("")
  const [website, setwebsite] = useState("")
  const [phone, setphone] = useState("")
  const [alert, setAlert] = useState(false)

  const changeAname = e => {
    setaname(e.target.value)
  }
  const changeName = e => {
    setname(e.target.value)
  }
  const changeWebsite = e => {
    setwebsite(e.target.value)
  }
  const changePhone = e => {
    setphone(e.target.value)
  }

  const submitContact = e => {
    const formData = new FormData()
    formData.append("aname", aname)
    formData.append("name", name)
    formData.append("website", website)
    formData.append("phone", phone)

    create
      .post(process.env.REACT_APP_BASEURL + "/basic/partnersubmit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        setAlert(!alert)
        console.log(res)
      })
  }
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
      },
      err => console.log(err)
    )
  }, [])
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)
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
                  Partners
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
                          Partners
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
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="mt-5">
                <h2 style={{ color: "#444" }} className="pb-2">
                  <b>Grow your business by becoming a partner.</b>
                </h2>
                <p align="justify">
                  <ul className="jss108">
                    <li>
                      <p align="justify">
                        <h3>
                          Partner with WebTalla to achieve business growth.
                        </h3>
                      </p>
                    </li>
                    <li>
                      <p align="justify">
                        <h3>
                          Enter the growing advertising and marketing space of
                          Africa.
                        </h3>
                      </p>
                    </li>
                    <li>
                      <p align="justify">
                        <h3>
                          Enhance technology-enabled advertisement offerings to
                          service clients.
                        </h3>
                      </p>
                    </li>
                    <li>
                      <p align="justify">
                        <h3>Revenue-sharing arrangement.</h3>
                      </p>
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mt-5">
                <h2 style={{ color: "#444" }} className="pb-2">
                  <b>Partner Benefits</b>
                </h2>
                <p align="justify">
                  <ul className="jss108">
                    <li>
                      <p align="justify">
                        <h3>
                          Expand your business without any upfront investment.
                        </h3>
                      </p>
                    </li>
                    <li>
                      <p align="justify">
                        <h3>
                          Enjoy the perks of PPP – Partner Preferential Pricing.
                        </h3>
                      </p>
                    </li>
                    <li>
                      <p align="justify">
                        <h3>
                          Bridging the gap between the opportunities and
                          available resource options to cater to the
                          opportunities.
                        </h3>
                      </p>
                    </li>
                    <li>
                      <p align="justify">
                        <h3>24x7 sales support.</h3>
                      </p>
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="text-center">
              <a href="#" onClick={executeScroll} className="jss109">
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="jss2 jssb3 mt-1" ref={myRef}>
        <div className="row">
          <div className="offset-md-4 col-md-4">
            <div className="text-center">
              <h2 style={{ marginTop: "100px" }}>Contact Details</h2>
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
              <AvForm onValidSubmit={submitContact}>
                <div className="pt-6">
                  <AvField
                    type="text"
                    className="form-control mt-4"
                    placeholder="Agency Name*"
                    required
                    name="aname"
                    onChange={changeAname}
                  />
                </div>
                <div className="pt-6">
                  <AvField
                    type="text"
                    className="form-control mt-4"
                    placeholder="Your Name*"
                    required
                    name="name"
                    onChange={changeName}
                  />
                </div>
                <div className="pt-6">
                  <AvField
                    type="text"
                    className="form-control mt-4"
                    placeholder="yourname@website.com*"
                    required
                    name="website"
                    onChange={changeWebsite}
                  />
                </div>
                <div className="pt-6">
                  <AvField
                    type="text"
                    className="form-control mt-4"
                    placeholder="Phone Number*"
                    required
                    onChange={changePhone}
                    name="phone"
                  />
                </div>
                <div className="pt-6">
                  <input
                    type="submit"
                    className="btn btn-primary mt-4"
                    value="Submit"
                  />
                </div>
              </AvForm>
            </div>
          </div>
        </div>
      </div>
      <div className="jss2 jssb4">
        <div className="text-center">
          <h2 style={{ marginTop: "20px" }}>Partner Benefits</h2>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <i class="fa fas fa-chart-line mb-3"></i>
                  <h4>More Business opportunity</h4>
                  <p>Expand your business without any upfront investment.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <span class="mb-3 pb-nig" style={{ fontSize: "40px" }}>
                    ₦
                  </span>
                  <h4>Preferential Rates</h4>
                  <p>Enjoy the perks of PPP – Partner Preferential Pricing</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <i class="fa fas fa-tasks mb-3"></i>
                  <h4>Leave the hard work to us</h4>
                  <p>
                    Bridging the gap between the opportunities and available
                    resource options to cater to the opportunities
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="pt-6">
                <div className="col-pb">
                  <i class="fas fa-life-ring mb-3"></i>
                  <h4>Dedicated website with your branding</h4>
                  <p>24x7 sales support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Partners
