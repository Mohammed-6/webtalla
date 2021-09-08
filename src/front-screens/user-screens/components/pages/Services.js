import React, { useState, useEffect } from "react"

import Faq from "react-faq-component"
import { Link } from "react-router-dom"

import axios from "axios"
const create = axios.create()

import Header from "../../../Header"
import Footer from "../../../Footer"
import Index from "../../index"

const Services = props => {
  const [axiosvertical, setAxiosvertical] = useState([])
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(position.coords)
      },
      err => console.log(err)
    )
    create
      .post(process.env.REACT_APP_BASEURL + "adslots/vertical_index")
      .then(res => {
        setAxiosvertical(res.data.data)
      })
  }, [])
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  const Services = props => {
    return (
      <div className="col-md-3 p-3">
        <div className="service-container">
          <Link to={`/services/${cleanUrl(props.data.vertical_name)}`}>
            <img
              src={
                process.env.REACT_APP_BASEURL +
                "assets/images/media-verticals/" +
                props.data.image
              }
            />
          </Link>
          <div className="text-center pt-2 services-title">
            <Link to={`/${cleanUrl(props.data.vertical_name)}`}>
              {props.data.vertical_name}
            </Link>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Index />
      <div className="container">
        <div className="pt-8">
          <div className="row">
            {axiosvertical.map(itm => (
              <Services data={itm} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Services
