import React, { useState, useEffect } from "react"

import Faq from "react-faq-component"
import { Link } from "react-router-dom"

import Header from "../Header"
import Footer from "../Footer"

import Client1 from "../../assets/front-assets/clients/BROADMEDIA.png"
import Client2 from "../../assets/front-assets/clients/CREDO-LMS.png"
import Client3 from "../../assets/front-assets/clients/FINOLANE.png"
import Client4 from "../../assets/front-assets/clients/GRINDMS.png"
import Client5 from "../../assets/front-assets/clients/PODDINA.png"
import Client6 from "../../assets/front-assets/clients/PREZANSMYN.png"
import Client7 from "../../assets/front-assets/clients/SASARAN.png"
import Client8 from "../../assets/front-assets/clients/SCOPUS.png"
import Client9 from "../../assets/front-assets/clients/SKOOLMYN.png"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import Service1 from "../../assets/front-assets/images/service1.png"
import BG from "../../assets/front-assets/images/service.png"
import axios from "axios"
const create = axios.create()

import IndexEnquiry from "../user-screens/components/forms/IndexEnquiry"
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
}

const responsiveClient = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
}
const Services = props => {
  const [axiosvertical, setAxiosvertical] = useState([])
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
      },
      err => console.log(err)
    )

    create
      .post(process.env.REACT_APP_BASEURL + "basic/vertical_index")
      .then(res => {
        console.log(res.data.data)
        setAxiosvertical(res.data.data)
      })
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    nav: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  const faqData = {
    rows: [
      {
        title: "What does WebTalla do?",
        content: `WebTalla is an Advertising buying platform that provides a wide range of advertising options to choose from based on your advertising plans and budget.`,
      },
      {
        title: "What services do you provide?",
        content: `WebTallas’ services range from traditional advertising options of television, radio, newspapers, and other publications to digitally-enabled outdoor advertising, ads on digital mediums, social media, influencer marketing, and many more.`,
      },
      {
        title: "How to avail of your services?",
        content: `Its extremely simple. Click and purchase.
        <ul>
        <li>Browse to the ‘Our Services’ section on our website.</li>
        <li>Scroll through the tech-edge advertising options mentioned under each advertising medium. </li>
        <li>Make your selection</li>
        <li>Make the payment and the advertising option is booked.</li>
        </ul>`,
      },
      {
        title: "What is the proof of the ad performance?",
        content: `WebTallas’ provides detailed big data analytics of the ad performance; if they have been hired to do so. The cost of data analytics is over and above the ad placement charges.`,
      },
      {
        title: "Will I be able to view the history of my previous purchases?",
        content: `Yes. All the details will be available in the account that you create on the portal.`,
      },
      {
        title: "Will I require help to make a purchase at the platform?",
        content: `Absolutely not. The platform is very intuitive, and everything is placed in a self-serviceable manner. But just in case if you still need any help, we are always there to assist you.`,
      },
    ],
  }

  const styles = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",
  }

  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
  }
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
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
                  Services
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
                          Services
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
      <div className="container">
        <div className="pt-8">
          <div className="row mb-4">
            <div className="text-center">
              <div className="os-subtitle"></div>
              <h2 className="mb-4">OUR SERVICES </h2>
            </div>
            {axiosvertical.map((itm, index) => (
              <>
                {index < 12 && localStorage.getItem("token") === null ? (
                  <div class="col-md-6 col-lg-4">
                    <div class="single-what-we-service-item margin-bottom-30">
                      <Link
                        to={
                          localStorage.getItem("isLogin") !== null
                            ? `/services/${cleanUrl(itm.vertical_name)}`
                            : ""
                        }
                      >
                        <div class="single-what-img">
                          <img
                            width="360"
                            height="465"
                            src={
                              process.env.REACT_APP_BASEURL +
                              "assets/images/media-verticals/" +
                              itm.image
                            }
                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                            alt=""
                            loading="lazy"
                          />{" "}
                        </div>
                        <div class="content-wrapper">
                          <div class="icon">
                            <img
                              height="70"
                              src={
                                process.env.REACT_APP_BASEURL +
                                "assets/images/media-verticals/" +
                                itm.icon
                              }
                              class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div class="content">
                            <h4 class="title">{itm.vertical_name} </h4>
                            <p>{itm.description.substring(0, 50)} </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div class="col-md-6 col-lg-4">
                    <div class="single-what-we-service-item margin-bottom-30">
                      <Link
                        to={
                          localStorage.getItem("isLogin") !== null
                            ? `/services/${cleanUrl(itm.vertical_name)}`
                            : ""
                        }
                      >
                        <div class="single-what-img">
                          <img
                            width="360"
                            height="465"
                            src={
                              process.env.REACT_APP_BASEURL +
                              "assets/images/media-verticals/" +
                              itm.image
                            }
                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                            alt=""
                            loading="lazy"
                          />{" "}
                        </div>
                        <div class="content-wrapper">
                          <div class="icon">
                            <img
                              height="70"
                              src={
                                process.env.REACT_APP_BASEURL +
                                "assets/images/media-verticals/" +
                                itm.icon
                              }
                              class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div class="content">
                            <h4 class="title">{itm.vertical_name} </h4>
                            <p>{itm.description.substring(0, 50)} </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="services-why-choose-us">
        <div className="services-why-choose-us-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="pb-5 text-center">
              <h3 class="wcu-subtitle">oUR sPECIFICATION</h3>
              <h2 class="wcu-heading--title">
                Why CHOOSE US
                <span>
                  <span>?</span>
                </span>
              </h2>
              <div className="offset-md-3 col-md-6">
                <p className="text-white">
                  When you choose us, you get the benefit of 10+ years of
                  experience in advertising and marketing. We get your brand the
                  exposure that it deserves in the most cost-effective way.
                </p>
              </div>
            </div>
            <div className="col-md-4 pr-3">
              <div className="col-wcu">
                <i class="bx bx-layer mb-3"></i>
                <h4>Creative Solutions</h4>
                <p align="justify">
                  We do a lot more than just advertising, we consult and provide
                  creative solutions that helps take your brand to the next
                  level.
                </p>
              </div>
            </div>
            <div className="col-md-4 pr-3">
              <div className="col-wcu">
                <i class="bx bx-star mb-3"></i>
                <h4>Expertise</h4>
                <p align="justify">
                  We absolutely love what we do. We bring decades of experience
                  to the table with our team of experts who have worked across
                  industries and geographies.
                </p>
              </div>
            </div>
            <div className="col-md-4 pr-3">
              <div className="col-wcu">
                <i class="bx bx-building mb-3"></i>
                <h4>Omni Channel Approach</h4>
                <p align="justify">
                  We specialize in multichannel approach enabling seamless
                  integrated advertising opportunities.
                </p>
              </div>
            </div>
            <div className="col-md-4 pr-3 pt-4">
              <div className="col-wcu">
                <i class="bx bx-bulb mb-3"></i>
                <h4>Innovative</h4>
                <p align="justify">
                  We assess and implement the emerging trends in our planning to
                  get you the best results in your budget
                </p>
              </div>
            </div>
            <div className="col-md-4 pr-3 pt-4">
              <div className="col-wcu">
                <i class="bx bx-flag mb-3"></i>
                <h4>Result Oriented</h4>
                <p align="justify">
                  We are focused on delivering 100% results with campaign
                  accuracy and effective implementation. We plan for success.
                </p>
              </div>
            </div>
            <div className="col-md-4 pr-3 pt-4">
              <div className="col-wcu">
                <i class="bx bx-support mb-3"></i>
                <h4>Support</h4>
                <p align="justify">
                  We are available at every step of the process to support and
                  meet our customer’s expectation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ser-testimonial mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="tmnl-quote">
                <i class="bx bxs-quote-left"></i>
              </div>
            </div>
            <div className="col-md-4">
              <div className="tmnl-text">CLINETS TESTIMONIAL</div>
            </div>
          </div>
        </div>
      </div>
      <div className="tmnl-item pt-5">
        <div className="container">
          <div className="row">
            <Carousel responsive={responsive}>
              <div>
                <div className="">
                  <p>
                    Experience I found myself working in a true partnership that
                    results in an extra incredible of us expertise. work in any
                    domestic market{" "}
                  </p>
                  <p className="">
                    <div class="author-details">
                      <div class="thumb">
                        <img
                          src="http://themeplugs.com/wp/outmedia/wp-content/uploads/2020/11/client-a.jpg"
                          alt="Author"
                        />
                      </div>
                      <div class="author-meta">
                        <h4 class="title">David Mask</h4>
                        <span class="designation">Actor, Union</span>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
              <div>
                <div className="">
                  <p>
                    Experience I found myself working in a true partnership that
                    results in an extra incredible of us expertise. work in any
                    domestic market{" "}
                  </p>
                  <p className="">
                    <div class="author-details">
                      <div class="thumb">
                        <img
                          src="http://themeplugs.com/wp/outmedia/wp-content/uploads/2020/11/client-a.jpg"
                          alt="Author"
                        />
                      </div>
                      <div class="author-meta">
                        <h4 class="title">David Mask</h4>
                        <span class="designation">Actor, Union</span>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
              <div>
                <div className="">
                  <p>
                    Experience I found myself working in a true partnership that
                    results in an extra incredible of us expertise. work in any
                    domestic market{" "}
                  </p>
                  <p className="">
                    <div class="author-details">
                      <div class="thumb">
                        <img
                          src="http://themeplugs.com/wp/outmedia/wp-content/uploads/2020/11/client-a.jpg"
                          alt="Author"
                        />
                      </div>
                      <div class="author-meta">
                        <h4 class="title">David Mask</h4>
                        <span class="designation">Actor, Union</span>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="faqs pb-5">
                    <span className="faq-heading">FAQS</span>
                    <h2 className="pt-2 pb-5">MOST ASKED QUESTIONS</h2>
                    <Faq data={faqData} styles={styles} config={config} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-section">
                <IndexEnquiry />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="client-logo">
        <div class="container">
          <div class="row">
            <Carousel
              responsive={responsiveClient}
              autoPlay={true}
              infinite={true}
            >
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client1} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client2} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client3} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client4} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client5} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client6} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client7} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client8} alt="client-logo1" class="" />
                </div>
              </div>
              <div className="client-logo-slide" style={{ width: "198px" }}>
                <div class="content-image">
                  <img src={Client9} alt="client-logo1" class="" />
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Services
