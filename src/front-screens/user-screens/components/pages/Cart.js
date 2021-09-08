import React, { useState, useEffect } from "react"

import Faq from "react-faq-component"
import { Link, withRouter } from "react-router-dom"
import { usePaystackPayment } from "react-paystack"

import axios from "axios"
const create = axios.create()

import Header from "../../../Header"
import Footer from "../../../Footer"
import Index from "../../index"

const Cart = props => {
  const [axiosvertical, setAxiosvertical] = useState([])
  const [cartproducts, setCartproducts] = useState([])
  const [grandTotal0, setGrandTotal0] = useState(0)
  const [useremail, setUseremail] = useState()
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

    const items = JSON.parse(localStorage.getItem("cartItems"))
    const formData = new FormData()
    formData.append("list", JSON.stringify(items))
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "basic/getCartProducts?accessToken=" +
          localStorage.getItem("token"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(res => {
        setCartproducts(res.data.records)
        setGrandTotal0(res.data.count)
      })
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "login/verify_user_access?access_token=" +
          localStorage.getItem("token")
      )
      .then(res => {
        setUseremail(res.data.email)
      })
  }, [])
  const cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  let grandTotal = 0
  let discount = 0
  let tax = 0

  const getTax = total => {
    let taxx = total / tax
    // setGrandTotal0(taxx.toFixed(2))
    return taxx.toFixed(2)
  }
  const onSuccess = reference => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
    const items = JSON.parse(localStorage.getItem("cartItems"))
    const formData = new FormData()
    formData.append("customer_id", localStorage.getItem("token"))
    formData.append("product_id", JSON.stringify(items))
    formData.append("payment_details", JSON.stringify(reference))
    formData.append("order_status", reference.status)
    formData.append("trxref", reference.trxref)
    formData.append("amount", grandTotal0)
    create
      .post(process.env.REACT_APP_BASEURL + "basic/insertOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        // setCartproducts(res.data)
        console.log(res.data)
        localStorage.removeItem("cartItems")
        props.history.push("/user-orders")
      })
  }

  //   const readyPayment = () => {
  const config = {
    reference: new Date().getTime().toString(),
    email: useremail,
    amount: grandTotal0 + "00",
    publicKey: "pk_test_24f76be645fda0ba1160d65679fbc15c9a6f5cbc",
  }
  const initializePayment = usePaystackPayment(config)
  // console.log(config)
  //   }
  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed")
  }

  return (
    <>
      <Index />
      <div class="row">
        <div lx="8" class="col">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                {/* <PaystackHookExample /> */}
                <table class="table align-middle mb-0 table-nowrap table">
                  <thead class="thead-light">
                    <tr>
                      <th>Product</th>
                      <th>Product Desc</th>
                      <th>Price</th>
                      <th colspan="2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartproducts.map(cart => {
                      grandTotal += parseInt(cart.rates)
                      return (
                        <tr>
                          <td>
                            {JSON.parse(cart.attachments).map((im, k) => {
                              if (k == 0) {
                                return (
                                  <img
                                    src={
                                      process.env.REACT_APP_BASEURL +
                                      "assets/images/product-images/" +
                                      im.file_name
                                    }
                                    alt={cart.adname}
                                    title={cart.adname}
                                    class="avatar-md"
                                  />
                                )
                              }
                            })}
                          </td>
                          <td>
                            <h5 class="font-size-14 text-truncate">
                              <a class="text-dark" href="">
                                {cart.adname}
                              </a>
                            </h5>
                            <p class="mb-0">
                              {/* Color : <span class="fw-medium">Green</span> */}
                            </p>
                          </td>
                          <td>₦ {cart.rates}</td>
                          <td>₦ {cart.rates}</td>
                          <td>
                            <a class="action-icon text-danger">
                              {" "}
                              <i class="mdi mdi-trash-can font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div class="mt-4 row">
                <div class="col-sm-6">
                  <a class="btn btn-secondary" href="/">
                    <i class="mdi mdi-arrow-left me-1"></i> Continue Shopping{" "}
                  </a>
                </div>
                <div class="col-sm-6">
                  <div class="text-sm-end mt-2 mt-sm-0">
                    <a
                      href="#"
                      class="btn btn-success"
                      onClick={() => initializePayment(onSuccess, onClose)}
                    >
                      <i class="mdi mdi-cart-arrow-right me-1"></i> Checkout{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="mb-3 h4 card-title">Order Summary</div>
              <div class="table-responsive">
                <table class="table mb-0 table">
                  <tbody>
                    <tr>
                      <td>Grand Total :</td>
                      <td>₦ {grandTotal}</td>
                    </tr>
                    <tr>
                      <th>Total :</th>
                      <td>₦ {grandTotal}</td>
                    </tr>
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

export default withRouter(Cart)
