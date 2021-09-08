import React, { useState, useEffect } from "react"

import Faq from "react-faq-component"
import { Link } from "react-router-dom"

import axios from "axios"
const create = axios.create()

import Footer from "../../../Footer"
import Index from "../../index"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
const responsive = {
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
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

import classnames from "classnames"
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  CardText,
  CardTitle,
} from "reactstrap"
const ProductDesc = props => {
  const [customActiveTab, setCustomActiveTab] = useState("1")
  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab)
    }
  }
  return (
    <>
      <Nav tabs className="nav-tabs-custom nav-justified">
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "1",
            })}
            onClick={() => {
              toggleCustom("1")
            }}
          >
            <span className="d-block d-sm-none">
              <i className="fas fa-home"></i>
            </span>
            <span className="d-none d-sm-block">RATE</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "2",
            })}
            onClick={() => {
              toggleCustom("2")
            }}
          >
            <span className="d-block d-sm-none">
              <i className="far fa-user"></i>
            </span>
            <span className="d-none d-sm-block">INFO</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "3",
            })}
            onClick={() => {
              toggleCustom("3")
            }}
          >
            <span className="d-block d-sm-none">
              <i className="far fa-envelope"></i>
            </span>
            <span className="d-none d-sm-block">STEP</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={customActiveTab} className="p-3 text-muted">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">
                <Row>
                  <div className="text-cetner">{props.details.duration}</div>
                </Row>
                <Row>
                  <div className="col-md-6 rate-border">
                    <Row>
                      <span className="text-center">CARD RATE</span>
                    </Row>
                    <Row>
                      <span className="text-center">
                        ₦ {props.details.before_rates}
                      </span>
                    </Row>
                  </div>
                  <div className="col-md-6">
                    <Row>
                      <span className="text-center">OFFER RATE</span>
                    </Row>
                    <Row>
                      <span className="text-center">
                        ₦ {props.details.rates}
                      </span>
                    </Row>
                  </div>
                </Row>
              </CardText>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">INFO</CardText>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">STEP</CardText>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  )
}
const ListServices = props => {
  const [products, setProducts] = useState([])
  const [tempcart, setTempcart] = useState([])
  const [details, setdetails] = useState([])
  const [data, setdata] = useState([])
  const [about, setabout] = useState([])
  const [faq, setfaq] = useState([])
  const [grid, setGrid] = useState(true)
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(position.coords)
      },
      err => console.log(err)
    )
    // console.log(props)
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "basic/cat_products?list=" +
          props.match.params.subcategory
      )
      .then(res => {
        console.log(res.data)
        setProducts(res.data.products)
        setdetails(res.data.details)
        const lr = JSON.parse(res.data.details.data)
        const ddata = JSON.parse(lr.data)
        const dddesc = JSON.parse(lr.data_description)
        setdata([{ dd: ddata, ddsc: dddesc }])

        const ar = JSON.parse(res.data.details.about)
        // console.log(fr)
        const adata = JSON.parse(ar.faq)
        const addesc = JSON.parse(ar.faq_description)
        setabout([{ dd: adata, ddsc: addesc }])

        const fr = JSON.parse(res.data.details.faq)
        // console.log(fr)
        const fdata = JSON.parse(fr.faq)
        const fddesc = JSON.parse(fr.faq_description)
        setabout([{ dd: fdata, ddsc: fddesc }])
        setfaq([{ dd: fdata, ddsc: fddesc }])
      })
  }, [])
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  const addToPlan = id => {
    localStorage.setItem("cartItems", true)
    const token = localStorage.getItem("token")

    create
      .post(
        process.env.REACT_APP_BASEURL +
          "basic/addtocart?pid=" +
          id +
          "&accessToken=" +
          token
      )
      .then(res => {
        console.log(res.data)
      })
  }
  const changeGrid = () => {
    setGrid(!grid)
  }
  const changeSearch = e => {
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "basic/search_products?list=" +
          props.match.params.category +
          "&search=" +
          e.target.value
      )
      .then(res => {
        console.log(res.data.data)
        setProducts(res.data)
      })
  }
  const getActive1 = () => {
    if (grid) {
      return "active"
    }
  }
  const getActive2 = () => {
    if (!grid) {
      return "active"
    }
  }
  const [customActiveTab, setCustomActiveTab] = useState("1")
  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab)
    }
  }
  return (
    <>
      <Index />
      <div className="container-fuild product-list">
        {/* <Breadcrumbs title="Ecommerce" breadcrumbItem="" /> */}
        <div className="pt-8">
          <div className="row">
            <div className="col-md-3">
              <div className="prod-cat-img position-relative">
                <img
                  src={
                    process.env.REACT_APP_BASEURL +
                    "assets/images/provider-images/" +
                    details.image
                  }
                  alt=""
                  className="img-fluid mx-auto d-block"
                />
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12">
                  <h4>
                    {details.companyname}
                    {", "}
                    {details.city}
                    {", "}
                    {details.state}
                  </h4>
                </div>
                <div className="col-md-12">
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <Nav tabs className="nav-tabs-custom nav-justified">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "1",
                              })}
                              onClick={() => {
                                toggleCustom("1")
                              }}
                            >
                              <span className="d-block d-sm-none">
                                <i className="fas fa-home"></i>
                              </span>
                              <span className="d-none d-sm-block">
                                Media Option & Pricing
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleCustom("2")
                              }}
                            >
                              <span className="d-block d-sm-none">
                                <i className="far fa-user"></i>
                              </span>
                              <span className="d-none d-sm-block">Data</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "3",
                              })}
                              onClick={() => {
                                toggleCustom("3")
                              }}
                            >
                              <span className="d-block d-sm-none">
                                <i className="far fa-envelope"></i>
                              </span>
                              <span className="d-none d-sm-block">FAQs</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>
                    </div>

                    <TabContent
                      activeTab={customActiveTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="1">
                        <Row>
                          {products.map((product, key) => (
                            <Col xl="4" sm="6" key={"_col_" + key}>
                              <Card>
                                <CardBody className="p-0">
                                  <div className="product-img position-relative">
                                    <Carousel responsive={responsive}>
                                      {JSON.parse(product.attachments).map(
                                        im => (
                                          <div>
                                            <img
                                              src={
                                                process.env.REACT_APP_BASEURL +
                                                "assets/images/product-images/" +
                                                im.file_name
                                              }
                                              alt=""
                                              className="img-fluid mx-auto d-block"
                                            />
                                          </div>
                                        )
                                      )}
                                    </Carousel>
                                  </div>

                                  <div className="mt-4 text-center">
                                    <h5 className="mb-3 text-truncate">
                                      <Link className="text-dark">
                                        {product.adname}{" "}
                                      </Link>
                                    </h5>
                                    <div className="my-0">
                                      <ProductDesc details={product} />
                                    </div>
                                    <Row>
                                      <div className="col-md-12">
                                        <button
                                          className="btn btn-block w-100 btn-primary btn-add-to-plan"
                                          onClick={() =>
                                            addToPlan(product.as_id)
                                          }
                                        >
                                          ADD TO PLAN
                                        </button>
                                      </div>
                                    </Row>
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          {data.map(ddd => {
                            return (
                              <>
                                {ddd.dd.map(dt => {
                                  return (
                                    <div className="data-div">
                                      <div className="data-div-child">
                                        <p>{dt.data}</p>
                                        <b className="mt-1">
                                          {ddd.ddsc.map(dt1 => {
                                            return (
                                              <>
                                                {dt1.key === dt.key
                                                  ? dt1.description
                                                  : ""}
                                              </>
                                            )
                                          })}
                                        </b>
                                      </div>
                                    </div>
                                  )
                                })}
                              </>
                            )
                          })}
                        </Row>
                        {about.map(ddd => {
                          return (
                            <>
                              {ddd.dd.map(dt => {
                                return (
                                  <>
                                    <Row className="mt-3">
                                      <div className="col-sm-12">
                                        <h4>{dt.data}</h4>
                                      </div>
                                    </Row>
                                    <Row className="mt-2">
                                      <div className="col-sm-12">
                                        {ddd.ddsc.map(dt1 => {
                                          return (
                                            <p>
                                              {dt1.key === dt.key
                                                ? dt1.description
                                                : ""}
                                            </p>
                                          )
                                        })}
                                      </div>
                                    </Row>
                                  </>
                                )
                              })}
                            </>
                          )
                        })}
                      </TabPane>
                      <TabPane tabId="3">
                        {faq.map(ddd => {
                          return (
                            <>
                              {ddd.dd.map(dt => {
                                return (
                                  <>
                                    <Row className="mt-2">
                                      <div className="col-sm-1">
                                        <b>Question:</b>
                                      </div>
                                      <div className="col-sm-11">
                                        <b>{dt.data}</b>
                                      </div>
                                    </Row>
                                    <Row className="mt-2">
                                      <div className="col-sm-1">
                                        <b>Answer:</b>
                                      </div>
                                      <div className="col-sm-11">
                                        {ddd.ddsc.map(dt1 => {
                                          return (
                                            <>
                                              {dt1.key === dt.key
                                                ? dt1.description
                                                : ""}
                                            </>
                                          )
                                        })}
                                      </div>
                                    </Row>
                                    <hr />
                                  </>
                                )
                              })}
                            </>
                          )
                        })}
                      </TabPane>
                    </TabContent>
                  </>
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

export default ListServices
