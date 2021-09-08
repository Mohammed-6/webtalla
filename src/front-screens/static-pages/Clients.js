import React, { useState, useEffect } from "react"
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

import BG from "../../assets/front-assets/images/clients.png"

const Clients = props => {
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords)
      },
      err => console.log(err)
    )
  }, [])
  const Clients = props => {
    return (
      <>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="text-center p-2">
                <div className="clt-image">
                  <img src={props.image} alt="" />
                </div>
                <div className="client-title mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
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
                  Clients
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
                          Clients
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
      <div className="clients-page">
        <div className="container">
          <div className="row">
            <Clients image={Client1} />
            <Clients image={Client2} />
            <Clients image={Client3} />
            <Clients image={Client4} />
            <Clients image={Client5} />
            <Clients image={Client6} />
            <Clients image={Client7} />
            <Clients image={Client8} />
            <Clients image={Client9} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Clients
