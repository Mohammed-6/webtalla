import React, { useState, useEffect } from "react"
import Faq from "react-faq-component"
import { geolocated } from "react-geolocated"
import axios from "axios"
const create = axios.create()
import { Link, withRouter } from "react-router-dom"

import Banner1 from "../assets/front-assets/images/slider-1.png"
import Banner2 from "../assets/front-assets/images/slider-2.png"
import Service from "../assets/front-assets/images/service-04.jpg"
import BynImage from "../assets/front-assets/images/byn-image.png"
import BannerIcon from "../assets/front-assets/images/banner-icon.png"

import Service1 from "../assets/front-assets/images/abuja.jpg"
import Service2 from "../assets/front-assets/images/lagos.jpg"
import Service3 from "../assets/front-assets/images/kano.jpg"
import Service4 from "../assets/front-assets/images/ibadan.jpg"
import Service5 from "../assets/front-assets/images/port-harcourt.jpg"
import Service6 from "../assets/front-assets/images/benin.jpg"
import Service7 from "../assets/front-assets/images/maiduguri.jpg"
import Service8 from "../assets/front-assets/images/jos.jpg"

import { Progress } from "reactstrap"

import Header from "./Header"
import Footer from "./Footer"
import IndexEnquiry from "./user-screens/components/forms/IndexEnquiry"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
}
const responsiveBanner = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
}
const HomePage = props => {
  const [axiosvertical, setAxiosvertical] = useState([])
  const Services = props => {
    const cleanUrl = url => {
      return url.replace(/\s+/g, "-").toLowerCase()
    }
    return (
      <div className="col-md-3 p-3">
        <div className="service-container">
          <Link
            to={
              localStorage.getItem("isLogin") !== null
                ? `/services/${cleanUrl(props.data.vertical_name)}`
                : ""
            }
          >
            <img
              src={
                process.env.REACT_APP_BASEURL +
                "assets/images/media-verticals/" +
                props.data.image
              }
            />
          </Link>
          <div className="text-center pt-2 services-title">
            <Link
              to={
                localStorage.getItem("isLogin") !== null
                  ? `/services/${cleanUrl(props.data.vertical_name)}`
                  : ""
              }
            >
              {props.data.vertical_name}
            </Link>
          </div>
        </div>
      </div>
    )
  }
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
      },
      err => console.log(err)
    )

    create
      .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
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
        title: "What does Web Talla do?",
        content: `Web Talla is an Advertising buying platform that provides a wide range of advertising options to choose from based on your advertising plans and budget.`,
      },
      {
        title: "What services do you provide?",
        content: `Web Tallas’ services range from traditional advertising options of television, radio, newspapers, and other publications to digitally-enabled outdoor advertising, ads on digital mediums, social media, influencer marketing, and many more.`,
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
        content: `Web Tallas’ provides detailed big data analytics of the ad performance; if they have been hired to do so. The cost of data analytics is over and above the ad placement charges.`,
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
  return (
    <>
      <Header />
      <div className="home-banner">
        <Carousel
          responsive={responsiveBanner}
          autoplay={true}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={6000}
        >
          <div>
            <img src={Banner1} />
          </div>
          <div>
            <img src={Banner2} />
          </div>
        </Carousel>
      </div>
      <div className="parent">
        <div className="intro-overlay">
          <div className="row">
            <div className="col-md-6">
              <div className="intro-title">
                <span className="first-intro">
                  WE KEEP YOU IN PUBLIC’S SIGHT & MIND
                </span>
                <br />
                <span className="second-intro">ATTENTION</span>
              </div>
            </div>
            <div className="col-md-6">
              <p className="abt-intro">
                We are one-stop-shop with affordable solutions for all your
                advertising needs.
              </p>
              <div className="row">
                <div className="col-md-4">
                  <span className="counter">130+</span>
                </div>
                <div className="col-md-4">
                  <span className="counter">50K</span>
                </div>
                <div className="col-md-4">
                  <span className="counter">4+</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <span className="counter-caption">Screens Available</span>
                </div>
                <div className="col-md-4">
                  <span className="counter-caption">Audience Reached</span>
                </div>
                <div className="col-md-4">
                  <span className="counter-caption">Country Covered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="our-services">
        <div className="text-center">
          <div className="os-subtitle"></div>
          <h2 className="os-title">OUR SERVICES </h2>
        </div>
        <div className="container">
          <div className="mt-5">
            <div className="row">
              {axiosvertical.map(itm => (
                <Services data={itm} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 mt-3">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="expert-section">
              <div className="expert-caption">
                HELPING BRANDS REACH THEIR GOALS WITH OUR EXPERTISE
              </div>
            </div>
          </div>
          <div className="col-md-6 p-0">
            <div className="expert-assist">
              <div className="expert-assist-caption">
                Serving clients for over 10 years through affordable and
                powerful advertising campaigns with quick turnaround.
                <div className="pt-5">
                  <h4 className="text-white">Campaign Accuracy</h4>
                  <Progress
                    style={{ backgroundColor: "#fc0841" }}
                    className="mt-2"
                    value={90}
                  ></Progress>
                </div>
                <div className="pt-5">
                  <h4 className="text-white">Execution Speed</h4>
                  <Progress
                    style={{ backgroundColor: "#fc0841" }}
                    className="mt-2"
                    value={75}
                  ></Progress>
                </div>
                <div className="pt-5">
                  <h4 className="text-white">Effective Performance</h4>
                  <Progress
                    style={{ backgroundColor: "#fc0841" }}
                    className="mt-2"
                    value={80}
                  ></Progress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-0 mt-5">
        <div className="row">
          <div className="text-center">
            <h2>WHO WE ARE</h2>
            <p className="pt-2" style={{ color: "black" }}>
              Web Talla is a Nigeria-based one-stop-shop tech-enabled
              omnichannel advertising online marketplace.
              <br />
              We specialize in innovative programmatic advertising solutions for
              publishing advertising campaigns tailored to our clients' needs.
              <br />
              Our team with a 10+ years of experience delivers campaigns for
              maximum brand exposure, reach and absolute client satisfaction.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 mt-3">
        <div className="row text-center">
          <div className="col-md-4 osd-1">
            <b className="pt-2">Excellence</b>
            <p className="pt-2">
              Always ready to go that extra mile to deliver superior quality,
              versatile solutions.
            </p>
          </div>
          <div className="col-md-4 osd-2">
            <b className="pt-2">Perseverance</b>
            <p className="pt-2">
              Never say “No” and persevere to make the impossible possible.
            </p>
          </div>
          <div className="col-md-4 osd-3">
            <b className="pt-2">Partnership</b>
            <p className="pt-2">
              Follow the client’s vision as our own and build long-term
              relationships.
            </p>
          </div>
        </div>
      </div>
      <div className="dyn-section pt-5">
        <div className="dyn-title text-center">DID YOUR KNOW?</div>
        <h4 className="pb-3 text-center">
          Outdoor Advertising (OOH) is the Second most effective advertising
          medium in Nigeria..
        </h4>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="dyn-banner-image text-center">
                <img src={BynImage} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 p-0">
                  <div className="dyn-points dyn-pnt-one">
                    <div className="dyn-image">
                      <i className="fas fa-globe-africa"></i>
                    </div>
                    <div className="dyn-count pt-2">18+</div>
                    <div className="dyn-para pt-2">
                      <p>Advertising Platform Coverage</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="dyn-points dyn-pnt-two">
                    <div className="dyn-image">
                      <i className="far fa-flag"></i>
                    </div>
                    <div className="dyn-count pt-2">58+</div>
                    <div className="dyn-para pt-2">
                      <p>Ads placed in leading media</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="dyn-points dyn-pnt-three">
                    <div className="dyn-image">
                      <i className="fas fa-tags"></i>
                    </div>
                    <div className="dyn-count pt-2">312+</div>
                    <div className="dyn-para pt-2">
                      <p>Advertising Offers</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="dyn-points dyn-pnt-four">
                    <div className="dyn-image">
                      <i className="fas fa-user-check"></i>
                    </div>
                    <div className="dyn-count pt-2">268+</div>
                    <div className="dyn-para pt-2">
                      <p>Happy and Satisfied Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="our-market">
          <div className="om-title text-center mb-5">OUR MARKETS</div>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            draggable={true}
          >
            <div>
              <div className="om-container">
                <img src={Service1} />
                <span>Abuja</span>
              </div>
            </div>
            <div>
              <div className="om-container">
                <img src={Service2} />
                <span>Lagos</span>
              </div>
            </div>
            <div>
              <div className="om-container">
                <img src={Service3} />
                <span>Kano</span>
              </div>
            </div>
            <div>
              <div className="om-container">
                <img src={Service4} />
                <span>Ibadan</span>
              </div>
            </div>
            <div>
              <div className="om-container">
                <img src={Service5} />
                <span>Port Harcourt</span>
              </div>
            </div>
            <div>
              <div className="om-container">
                <img src={Service6} />
                <span>Benin</span>
              </div>
            </div>
            <div>
              <div className="om-container">
                <img src={Service7} />
                <span>Maiduguri</span>
              </div>
            </div>
            <div>
              <div className="om-container">
                <img src={Service8} />
                <span>Jos</span>
              </div>
            </div>
          </Carousel>
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
      <Footer />
    </>
  )
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(HomePage)
