import React, { useState, useEffect } from "react"

import Faq from "react-faq-component"
import { Link } from "react-router-dom"
import { Modal } from "reactstrap"

import axios from "axios"
const create = axios.create()

import Header from "../../../Header"
import Footer from "../../../Footer"
import Index from "../../index"

const Cart = props => {
  const [modal_standard, setModalStandard] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordd, setOrdd] = useState([])
  const [orderunique, setOrderunique] = useState()
  useEffect(() => {
    // console.log(props.coords)
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(position.coords)
      },
      err => console.log(err)
    )

    create
      .get(
        process.env.REACT_APP_BASEURL +
          "basic/getUserOrders?access_token=" +
          localStorage.getItem("token")
      )
      .then(res => {
        console.log(res.data)
        setOrders(res.data)
      })
  }, [])
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  const getProductDetails = uniq => {
    setOrderunique(uniq)
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "basic/getOrderDetails?access_token=" +
          localStorage.getItem("token") +
          "&unique=" +
          uniq
      )
      .then(res => {
        console.log(res.data)
        setOrdd(res.data)
        setModalStandard(true)
      })
  }
  const tog_standard = () => {
    setModalStandard(!modal_standard)
  }
  let amt = 0
  return (
    <>
      <Index />
      <Modal isOpen={modal_standard} toggle={tog_standard}>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Order Details
          </h5>
          <button
            type="button"
            onClick={() => setModalStandard(false)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="mb-2">
            Order id: <span class="text-primary">#{orderunique}</span>
          </p>
          <div class="table-responsive">
            <table class="table align-middle table-nowrap table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {ordd.map(ord => {
                  const dd = JSON.parse(ord.product_details)
                  amt += parseInt(dd.rates)
                  return (
                    <tr>
                      <th scope="row">
                        <div>
                          {JSON.parse(dd.attachments).map((im, k) => {
                            if (k == 0) {
                              return (
                                <img
                                  src={
                                    process.env.REACT_APP_BASEURL +
                                    "assets/images/product-images/" +
                                    im.file_name
                                  }
                                  alt={dd.adname}
                                  title={dd.adname}
                                  class="avatar-sm"
                                />
                              )
                            }
                          })}
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 class="text-truncate font-size-14">
                            {dd.adname}
                          </h5>
                        </div>
                      </td>
                      <td>₦ {dd.rates}</td>
                    </tr>
                  )
                })}
                {ordd.map((ord, kl) => {
                  const dd = JSON.parse(ord.amount)
                  if (kl == 0) {
                    const ll = (7.5 / 100) * amt
                    return (
                      <>
                        <tr>
                          <td colspan="2">
                            <h6 class="m-0 text-end">Sub Total:</h6>
                          </td>
                          <td>₦ {dd}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <h6 class="m-0 text-end">VAT(7.5%):</h6>
                          </td>
                          <td>₦ {ll.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                            <h6 class="m-0 text-end">Total:</h6>
                          </td>
                          <td>₦ {dd}</td>
                        </tr>
                      </>
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => setModalStandard(false)}
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </Modal>
      <div class="container">
        <div class="card">
          <div class="card-body">
            <div class="mb-2 row">
              <div class="col-sm-4">
                <div class="search-box me-2 mb-2 d-inline-block">
                  <div class="position-relative">
                    <label for="search-bar-0" class="search-label">
                      <span id="search-bar-0-label" class="sr-only">
                        Search this table
                      </span>
                      <input
                        id="search-bar-0"
                        type="text"
                        aria-labelledby="search-bar-0-label"
                        class="form-control "
                        placeholder="Search"
                        value=""
                      />
                    </label>
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <div class="react-bootstrap-table">
                <table class="table table align-middle table-nowrap table-check">
                  <thead class="table-light">
                    <tr>
                      <th
                        tabindex="0"
                        aria-label="Order ID sort desc"
                        class="sortable"
                      >
                        Order ID<span class="caret-4-desc"></span>
                      </th>
                      <th
                        tabindex="0"
                        aria-label="Date sortable"
                        class="sortable"
                      >
                        Date<span class="order-4"></span>
                      </th>
                      <th
                        tabindex="0"
                        aria-label="Total sortable"
                        class="sortable"
                      >
                        Total<span class="order-4"></span>
                      </th>
                      <th
                        tabindex="0"
                        aria-label="Payment Status sortable"
                        class="sortable"
                      >
                        Payment Status<span class="order-4"></span>
                      </th>
                      <th
                        tabindex="0"
                        aria-label="View Details sortable"
                        class="sortable"
                      >
                        View Details<span class="order-4"></span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(ord => (
                      <tr>
                        <td>
                          <a class="text-body fw-bold" href="/ecommerce-orders">
                            #{ord.unique_id}
                          </a>
                        </td>
                        <td>{ord.created_at}</td>
                        <td>₦{ord.amount}</td>
                        <td>
                          <span class="font-size-12 badge-soft-success badge badge-success badge-pill">
                            {ord.order_status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn-sm btn-rounded btn btn-primary"
                            onClick={() => getProductDetails(ord.unique_id)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
