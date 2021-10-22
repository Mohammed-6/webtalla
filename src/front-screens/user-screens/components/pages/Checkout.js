import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  Modal,
} from "reactstrap"
import Select from "react-select"
import { Link } from "react-router-dom"

import { usePaystackPayment } from "react-paystack"
import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb"

//Import Images
import img1 from "../../../../assets/images/product/img-1.png"
import img7 from "../../../../assets/images/product/img-7.png"

import axios from "axios"
const create = axios.create()
import {
  AvField,
  AvForm,
  AvRadio,
  AvRadioGroup,
} from "availity-reactstrap-validation"
const optionGroup = [
  {
    label: "Picnic",
    options: [
      { label: "Mustard", value: "Mustard" },
      { label: "Ketchup", value: "Ketchup" },
      { label: "Relish", value: "Relish" },
    ],
  },
  {
    label: "Camping",
    options: [
      { label: "Tent", value: "Tent" },
      { label: "Flashlight", value: "Flashlight" },
      { label: "Toilet Paper", value: "Toilet Paper" },
    ],
  },
]

import { Country, State, City } from "country-state-city"
import Index from "../../index"

export const PaystackHook = props => {
  const config = {
    reference: new Date().getTime().toString(),
    email: props.email,
    amount: props.amount + "00",
    publicKey: "pk_live_a077acc50d2171ad703933c8f8fed8affa5b15f4",
  }
  const initializePayment = usePaystackPayment(config)
  const onSuccess = reference => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
    const formData = new FormData()
    formData.append("customer_id", localStorage.getItem("token"))
    formData.append("product_id", "")
    formData.append("payment_details", JSON.stringify(reference))
    formData.append("order_status", reference.status)
    formData.append("trxref", reference.trxref)
    formData.append("amount", props.amount)
    formData.append("billing", JSON.stringify(props.billing))
    create
      .post(process.env.REACT_APP_BASEURL + "basic/insertOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        // setCartproducts(res.data)
        console.log(res.data)
        props.onsuccess()
      })
  }
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess)
        }}
        className="btn btn-success"
      >
        <i className="mdi mdi-truck-fast me-1" /> Proceed to Billing{" "}
      </button>
    </div>
  )
}

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      selectedGroup: null,
      country: [],
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      ordernotes: "",
      paymentmethod: "cheque",
      cartproducts: [],
      grandtotal: 0,
      vat: 0,
      useremail: "",
      config: {},
      modal_standard: false,
    }
    this.toggleTab = this.toggleTab.bind(this)
    this.handleSelectGroup = this.handleSelectGroup.bind(this)
    this.changeForm = this.changeForm.bind(this)
    this.gotoSecond = this.gotoSecond.bind(this)
    this.gotoThird = this.gotoThird.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.payCheque = this.payCheque.bind(this)
    this.tog_standard = this.tog_standard.bind(this)
  }
  componentDidMount() {
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "basic/getCartProducts?accessToken=" +
          localStorage.getItem("token")
      )
      .then(res => {
        if (res.data.records.length === 0) {
          this.props.history.push("/")
        }
        let tvat = 0
        tvat = (7.5 / 100) * res.data.count
        this.setState({
          cartproducts: res.data.records,
          grandtotal: res.data.count,
          vat: (7.5 / 100) * res.data.count,
        })
      })
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "login/verify_user_access?access_token=" +
          localStorage.getItem("token")
      )
      .then(res => {
        this.setState({
          usermail: res.data.email,
        })
      })
  }
  changeForm(e) {
    this.setState({ [e.target.name]: e.target.value })
    // console.log(this.state)
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  handleSelectGroup = selectedGroup => {
    this.setState({ selectedGroup })
  }
  changeCountry = e => {
    const tt = e.target.value

    this.setState({ country: tt })
  }
  gotoSecond() {
    this.toggleTab("2")
  }
  gotoThird() {
    this.toggleTab("3")
  }
  onSuccess = () => {
    props.history.push("/user-orders")
  }
  payCheque() {
    const formData = new FormData()
    formData.append("customer_id", localStorage.getItem("token"))
    formData.append("product_id", "")
    formData.append("payment_details", "pay via cheque")
    formData.append("order_status", "pending")
    formData.append("trxref", "xxxxxxxxxxx")
    formData.append(
      "amount",
      (7.5 / 100) * this.state.grandtotal + parseInt(this.state.grandtotal)
    )
    formData.append("billing", JSON.stringify(this.state))
    create
      .post(process.env.REACT_APP_BASEURL + "basic/insertOrder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        // setCartproducts(res.data)
        console.log(res.data)
        this.setState({ modal_standard: true })
      })
  }
  tog_standard() {
    this.setState(prevState => ({
      modal_standard: !prevState.modal_standard,
    }))
  }
  render() {
    return (
      <React.Fragment>
        <Index />
        <Modal isOpen={this.state.modal_standard} toggle={this.tog_standard}>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Order Confirm
            </h5>
            <button
              type="button"
              onClick={() => this.props.history.push("/user-orders")}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Please contact WebTalla Office Number or email to{" "}
              <a href="info@webtalla.com">info@webtalla.com</a>
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => this.props.history.push("/user-orders")}
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </Modal>
        <div className="">
          <MetaTags>
            <title>Checkout | WebTalla</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Cart" breadcrumbItem="Checkout" />

            <div className="checkout-tabs">
              <Row>
                <Col lg="2" sm="3">
                  <Nav className="flex-column" pills>
                    <NavItem>
                      <NavLink
                        onClick={() => this.toggleTab("1")}
                        className={classnames({
                          active: this.state.activeTab === "1",
                        })}
                      >
                        <i className="bx bx-list-ul d-block check-nav-icon mt-4 mb-2" />
                        <p className="font-weight-bold mb-4">Billing Info</p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => this.toggleTab("2")}
                        className={classnames({
                          active: this.state.activeTab === "2",
                        })}
                      >
                        <i className="bx bx-money d-block check-nav-icon mt-4 mb-2" />
                        <p className="font-weight-bold mb-4">Payment Info</p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "3",
                        })}
                        onClick={() => this.toggleTab("3")}
                      >
                        <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                        <p className="font-weight-bold mb-4">Confirmation</p>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col lg="10" sm="9">
                  <Card>
                    <CardBody>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <div>
                            <CardTitle className="h4">
                              Billing information
                            </CardTitle>
                            <p className="card-title-desc">
                              Fill all information below
                            </p>
                            <AvForm onValidSubmit={this.gotoSecond}>
                              <FormGroup className="mb-4" row>
                                <Label
                                  htmlFor="billing-name"
                                  md="2"
                                  className="col-form-label"
                                >
                                  Name
                                </Label>
                                <Col md="10">
                                  <AvField
                                    type="text"
                                    className="form-control"
                                    id="billing-name"
                                    placeholder="Enter your name"
                                    name="name"
                                    onChange={this.changeForm}
                                    required
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="mb-4" row>
                                <Label
                                  htmlFor="billing-email-address"
                                  md="2"
                                  className="col-form-label"
                                >
                                  Email Address
                                </Label>
                                <Col md="10">
                                  <AvField
                                    type="email"
                                    className="form-control"
                                    id="billing-email-address"
                                    placeholder="Enter your email"
                                    name="email"
                                    onChange={this.changeForm}
                                    required
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="mb-4" row>
                                <Label
                                  htmlFor="billing-phone"
                                  md="2"
                                  className="col-form-label"
                                >
                                  Phone
                                </Label>
                                <Col md={10}>
                                  <AvField
                                    type="text"
                                    className="form-control"
                                    id="billing-phone"
                                    placeholder="Enter your Phone no."
                                    name="phone"
                                    onChange={this.changeForm}
                                    required
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="mb-4" row>
                                <Label
                                  htmlFor="billing-address"
                                  md="2"
                                  className="col-form-label"
                                >
                                  Address
                                </Label>
                                <Col md="10">
                                  <AvField
                                    type="textarea"
                                    className="form-control"
                                    id="billing-address"
                                    rows="3"
                                    placeholder="Enter full address"
                                    name="address"
                                    onChange={this.changeForm}
                                    required
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="mb-4" row>
                                <Label md="2" className="col-form-label">
                                  Country
                                </Label>
                                <Col md="10">
                                  <AvField
                                    type="select"
                                    className="form-control select2"
                                    title="Country"
                                    name="country"
                                    onChange={this.changeForm}
                                  >
                                    <option value="0">Select Country</option>
                                    {Country.getAllCountries().map(cnt => {
                                      let sel = ""
                                      if (cnt.name === "Nigeria") {
                                        sel = "selected"
                                      }
                                      return (
                                        <option selected={sel} value={cnt.name}>
                                          {cnt.name}
                                        </option>
                                      )
                                    })}
                                  </AvField>
                                </Col>
                              </FormGroup>

                              <FormGroup className="mb-4" row>
                                <Label md="2" className="col-form-label">
                                  States
                                </Label>
                                <Col md="10">
                                  <AvField
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your state"
                                    name="state"
                                    onChange={this.changeForm}
                                    required
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="mb-0" row>
                                <Label
                                  htmlFor="example-textarea"
                                  md="2"
                                  className="col-form-label"
                                >
                                  Order Notes:
                                </Label>
                                <Col md="10">
                                  <textarea
                                    className="form-control"
                                    id="example-textarea"
                                    rows="3"
                                    placeholder="Write some note.."
                                    name="ordernotes"
                                    onChange={this.changeForm}
                                  />
                                </Col>
                              </FormGroup>
                              <div className="offset-md-6 col-md-6 mt-4">
                                <div className="text-end">
                                  <input
                                    type="submit"
                                    className="btn btn-success"
                                    value="Submit"
                                  />
                                </div>
                              </div>
                            </AvForm>
                          </div>
                        </TabPane>
                        <TabPane
                          tabId="2"
                          id="v-pills-payment"
                          role="tabpanel"
                          aria-labelledby="v-pills-payment-tab"
                        >
                          <AvForm onValidSubmit={this.gotoThird}>
                            <div>
                              <CardTitle className="h4">
                                Payment information
                              </CardTitle>
                              <p className="card-title-desc">
                                Fill all information below
                              </p>
                              <AvRadioGroup inline name="paymentm" required>
                                <div>
                                  <div className="form-check form-check-inline font-size-16">
                                    <AvRadio
                                      type="radio"
                                      value="card"
                                      required
                                      id="customRadioInline1"
                                      name="paymentmethod"
                                      className="form-check-input"
                                      onChange={this.changeForm}
                                    />
                                    <Label
                                      className="form-check-label font-size-13"
                                      htmlFor="customRadioInline1"
                                    >
                                      <i className="fab fa-cc-mastercard me-1 font-size-20 align-top" />{" "}
                                      Credit / Debit Card
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline font-size-16">
                                    <AvRadio
                                      type="radio"
                                      value="cheque"
                                      id="customRadioInline3"
                                      name="paymentmethod"
                                      className="form-check-input"
                                      onChange={this.changeForm}
                                      required
                                    />
                                    <Label
                                      className="form-check-label font-size-13"
                                      htmlFor="customRadioInline3"
                                    >
                                      <i className="far fa-money-bill-alt me-1 font-size-20 align-top" />{" "}
                                      Cheque Payment
                                    </Label>
                                  </div>
                                </div>
                              </AvRadioGroup>

                              <div className="offset-md-6 col-md-6 mt-4">
                                <div className="text-end">
                                  <input
                                    type="submit"
                                    className="btn btn-success"
                                    value="Submit"
                                  />
                                </div>
                              </div>
                            </div>
                          </AvForm>
                        </TabPane>
                        <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                          <Card className="shadow-none border mb-0">
                            <CardBody>
                              <CardTitle className="mb-4">
                                Order Summary
                              </CardTitle>

                              <div className="table-responsive">
                                <Table className="align-middle mb-0 table-nowrap">
                                  <thead className="table-light">
                                    <tr>
                                      <th>Product</th>
                                      <th>Product Desc</th>
                                      <th>Price</th>
                                      <th colspan="2">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.cartproducts.map(cart => {
                                      //   grandTotal += parseInt(cart.rates)
                                      return (
                                        <tr>
                                          <td>
                                            {JSON.parse(cart.attachments).map(
                                              (im, k) => {
                                                if (k == 0) {
                                                  return (
                                                    <img
                                                      src={
                                                        process.env
                                                          .REACT_APP_BASEURL +
                                                        "assets/images/product-images/" +
                                                        im.file_name
                                                      }
                                                      alt={cart.adname}
                                                      title={cart.adname}
                                                      class="avatar-md"
                                                    />
                                                  )
                                                }
                                              }
                                            )}
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
                                        </tr>
                                      )
                                    })}
                                    <tr>
                                      <td colSpan="3">
                                        <h6 className="m-0 text-end">
                                          Sub Total:
                                        </h6>
                                      </td>
                                      <td>₦ {this.state.grandtotal}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan="3">
                                        <h6 className="m-0 text-end">
                                          VAT(7.5%):
                                        </h6>
                                      </td>
                                      <td>₦ {this.state.vat}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan="3">
                                        <h6 className="m-0 text-end">Total:</h6>
                                      </td>
                                      <td>
                                        ₦{" "}
                                        {parseInt(this.state.grandtotal) +
                                          parseInt(this.state.vat)}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>

                                <div className="offset-md-6 col-md-6 mt-4">
                                  <div className="text-end">
                                    {this.state.paymentmethod === "cheque" ? (
                                      <button
                                        className="btn btn-success"
                                        onClick={this.payCheque}
                                      >
                                        Pay from Cheque
                                      </button>
                                    ) : (
                                      <PaystackHook
                                        config={this.state.config}
                                        amount={
                                          parseInt(this.state.grandtotal) +
                                          parseInt(this.state.vat)
                                        }
                                        billing={this.state}
                                        email={this.state.email}
                                        onsuccess={this.onSuccess}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                  <Row className="mt-4">
                    <Col sm="6">
                      <Link
                        to="/cart"
                        className="btn text-muted d-none d-sm-inline-block btn-link"
                      >
                        <i className="mdi mdi-arrow-left me-1" /> Back to
                        Shopping Cart{" "}
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Checkout
