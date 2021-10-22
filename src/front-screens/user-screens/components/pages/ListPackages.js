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
  Collapse,
} from "reactstrap"
const ListPackages = props => {
  const [products, setProducts] = useState([])
  const [tempcart, setTempcart] = useState([])
  const [filters, setFilters] = useState([])
  const [putfilters, setputfilters] = useState([])
  const [grid, setGrid] = useState(true)
  const [col1, setCol1] = useState(false)
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(position.coords)
      },
      err => console.log(err)
    )
    const ll = props.match.path
    const dd = ll.split("/")
    // console.log(dd)
    create
      .post(process.env.REACT_APP_BASEURL + "basic/cat_getsub?list=" + dd[2])
      .then(res => {
        console.log(res.data.response)
        setProducts(res.data.response)
        setFilters(res.data.filters)
      })
  }, [])
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  const addToPlan = id => {
    const items = JSON.parse(localStorage.getItem("cartItems")) // updated
    if (items !== null) {
      setTempcart([...tempcart, items])
    }

    if (tempcart.length > 0) {
      setTempcart(tempcart.filter(i => i.pid !== id))
    }
    localStorage.removeItem("cartItems")

    const dd = { pid: id }

    // a.push(items)
    setTempcart(tempcart => tempcart.concat(dd))
    // if (a !== null) {
    localStorage.setItem("cartItems", JSON.stringify(tempcart))
    // }
    // console.log(tempcart)
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
        // setProducts(res.data)
      })
  }
  const getFilters = (e, itm, key) => {
    // console.log(itm)
    if (e.target.checked) {
      let col
      col = {
        key: key,
        mvid: itm.mvid,
        filter_key: itm.filter_key,
        filter_name: itm.filter_name,
        filter_value: itm.filter_value,
      }
      setputfilters(putfilters => putfilters.concat(col))
      console.log(putfilters)

      const formData = new FormData()
      formData.append("filters", JSON.stringify([...putfilters, col]))
      create
        .post(
          process.env.REACT_APP_BASEURL + "basic/filter_products",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(res => {
          console.log(res.data)
          if (res.data.length > 0) {
            setProducts([])
            setProducts(res.data)
          }
        })
    } else {
      const index = putfilters.findIndex(c => c.key === key)
      const newArray = putfilters.slice()
      newArray.splice(index, 1)
      setputfilters(newArray)

      const formData = new FormData()
      formData.append("filters", JSON.stringify(newArray))
      create
        .post(
          process.env.REACT_APP_BASEURL + "basic/filter_products",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(res => {
          console.log(res.data)
          if (res.data.length > 0) {
            setProducts([])
            setProducts(res.data)
          }
        })
    }
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
  const t_col1 = () => {
    setCol1(!col1)
  }
  return (
    <>
      <Index />
      <div className="container-fuild product-list">
        {/* <Breadcrumbs title="Ecommerce" breadcrumbItem="" /> */}
        <div className="pt-8">
          <div className="row">
            <div className="col-md-3">
              <h4>Filters</h4>
              {filters.map(flt => {
                const dd = flt.filters
                return (
                  <div className="accordion mt-3" id="accordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button fw-medium"
                          type="button"
                          onClick={t_col1}
                          style={{ cursor: "pointer" }}
                        >
                          {flt.filter_name}
                        </button>
                      </h2>
                      <Collapse isOpen={col1} className="accordion-collapse">
                        <div className="accordion-body">
                          {dd.map((dt, k) => (
                            <div class="form-check form-check-primary mb-3">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id={flt.filter_name + k}
                                onClick={e => getFilters(e, dt, k)}
                              />
                              <label
                                class="form-check-label"
                                for={flt.filter_name + k}
                              >
                                {dt.filter_value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Collapse>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="col-md-9">
              <div className="mb-3 row">
                <div className="col-sm-6 col-xl-4">
                  <div className="mt-2">
                    <h5></h5>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-8">
                  <form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                    <div className="search-box me-2">
                      <div className="position-relative">
                        <input
                          placeholder="Search..."
                          type="text"
                          className="form-control border-0 form-control"
                          onKeyUp={changeSearch}
                        />
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                    <ul className="product-view-nav nav nav-pills">
                      <li className="nav-item">
                        <a
                          className={"nav-link " + getActive1()}
                          onClick={changeGrid}
                        >
                          <i className="bx bx-grid-alt"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={"nav-link " + getActive2()}
                          onClick={changeGrid}
                        >
                          <i className="bx bx-list-ul"></i>
                        </a>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
              <div className="row">
                {grid ? (
                  products.map((product, key) => {
                    const dd = JSON.parse(product.details)
                    let mediaoptionlabel = ""
                    let mediaoption = ""
                    let mediacountlabel = ""
                    let mediacount = ""
                    let beforeamount = ""
                    let afteramount = ""
                    let duration = ""
                    dd.map(mo => {
                      if (mo.type === "mediaoptionlabel") {
                        mediaoptionlabel = mo.details
                      } else if (mo.type === "mediaoption") {
                        mediaoption = mo.details
                      } else if (mo.type === "mediacountlabel") {
                        mediacountlabel = mo.details
                      } else if (mo.type === "mediacount") {
                        mediacount = mo.details
                      } else if (mo.type === "beforeamount") {
                        beforeamount = mo.details
                      } else if (mo.type === "afteramount") {
                        afteramount = mo.details
                      } else if (mo.type === "duration") {
                        duration = mo.details
                      }
                    })
                    return (
                      <>
                        <Col xl="4" sm="6" key={"_col_" + key}>
                          <Card>
                            <CardBody className="p-0 cat-card">
                              <div className="cat-img position-relative">
                                <img
                                  src={
                                    process.env.REACT_APP_BASEURL +
                                    "assets/images/provider-images/" +
                                    product.image
                                  }
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>

                              <div className="mt-4 text-center">
                                <h5 className="mb-3 text-truncate">
                                  <Link
                                    to={
                                      `/services/` +
                                      props.match.params.category +
                                      "/" +
                                      cleanUrl(product.companyname)
                                    }
                                  >
                                    {product.companyname}
                                    {", "}
                                    {product.city}
                                    {", "}
                                    {product.state}
                                  </Link>
                                </h5>
                                <div className="m-2">
                                  <Row>
                                    <div className="col-md-6 rate-border">
                                      <Row className="m-2">
                                        <span className="text-center">
                                          {mediaoptionlabel}
                                        </span>
                                      </Row>
                                      <Row>
                                        <span className="text-center">
                                          <b>{mediaoption}</b>
                                        </span>
                                      </Row>
                                    </div>
                                    <div className="col-md-6">
                                      <Row className="m-2">
                                        <span className="text-center">
                                          {mediacountlabel}
                                        </span>
                                      </Row>
                                      <Row>
                                        <span className="text-center">
                                          <b>{mediacount}</b>
                                        </span>
                                      </Row>
                                    </div>
                                    <div className="text-center mt-2">
                                      <del>
                                        <small>₦{beforeamount}</small>
                                      </del>
                                      &nbsp;&nbsp;&nbsp;
                                      <span className="pl-3">
                                        ₦{afteramount}
                                      </span>
                                    </div>
                                    <div className="text-center mt-2">
                                      {duration}
                                    </div>
                                  </Row>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </>
                    )
                  })
                ) : (
                  <table class="table align-middle mb-0 table-nowrap table">
                    <thead class="thead-light">
                      {products.map((cart, k) => {
                        if (k == 0) {
                          const dd = JSON.parse(cart.details)
                          let mediaoptionlabel = ""
                          let mediacountlabel = ""
                          dd.map(mo => {
                            if (mo.type === "mediaoptionlabel") {
                              mediaoptionlabel = mo.details
                            } else if (mo.type === "mediacountlabel") {
                              mediacountlabel = mo.details
                            }
                          })
                          return (
                            <tr>
                              <th>Image</th>
                              <th>Name</th>
                              <th>{mediaoptionlabel}</th>
                              <th>{mediacountlabel}</th>
                              <th colspan="2">Rate</th>
                            </tr>
                          )
                        }
                      })}
                    </thead>
                    <tbody>
                      {products.map(cart => {
                        const dd = JSON.parse(cart.details)
                        let mediaoptionlabel = ""
                        let mediaoption = ""
                        let mediacountlabel = ""
                        let mediacount = ""
                        let beforeamount = ""
                        let afteramount = ""
                        let duration = ""
                        dd.map(mo => {
                          if (mo.type === "mediaoptionlabel") {
                            mediaoptionlabel = mo.details
                          } else if (mo.type === "mediaoption") {
                            mediaoption = mo.details
                          } else if (mo.type === "mediacountlabel") {
                            mediacountlabel = mo.details
                          } else if (mo.type === "mediacount") {
                            mediacount = mo.details
                          } else if (mo.type === "beforeamount") {
                            beforeamount = mo.details
                          } else if (mo.type === "afteramount") {
                            afteramount = mo.details
                          } else if (mo.type === "duration") {
                            duration = mo.details
                          }
                        })
                        return (
                          <tr>
                            <td>
                              <img
                                src={
                                  process.env.REACT_APP_BASEURL +
                                  "assets/images/provider-images/" +
                                  cart.image
                                }
                                alt={cart.companyname}
                                title={cart.companyname}
                                class="avatar-md"
                              />
                            </td>
                            <td>
                              <h5 class="font-size-14 text-truncate">
                                <Link
                                  to={
                                    `/services/` +
                                    props.match.params.category +
                                    "/" +
                                    cleanUrl(cart.companyname)
                                  }
                                >
                                  {cart.companyname}
                                  {", "}
                                  {cart.city}
                                  {", "}
                                  {cart.state}
                                </Link>
                              </h5>
                              <p class="mb-0">
                                {/* Color : <span class="fw-medium">Green</span> */}
                              </p>
                            </td>
                            <td>{mediaoption}</td>
                            <td>{mediacount}</td>
                            <td>
                              <del>
                                <small>₦ {beforeamount}</small>
                              </del>
                              <br />
                              <span>₦ {afteramount}</span>
                              <br />
                              <span>{duration}</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ListPackages
