import React, { Component } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from "reactstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

//import action
import { getChartsData } from "../../store/actions"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import classNames from "classnames"
import Bar from "./barchart"

import axios from "axios"
const create = axios.create()
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [],
      email: [
        { title: "Week", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Year", linkto: "#", isActive: true },
      ],
      modal: false,
      subscribemodal: false,
      chartSeries: [],
      periodType: "yearly",
      mdata: [],
      orders: [],
      ordd: [],
      orderunique: "",
    }

    this.togglemodal.bind(this)
    this.togglesubscribemodal.bind(this)
    this.getProductDetails.bind(this)
  }

  componentDidMount() {
    const { onGetChartsData } = this.props
    setTimeout(() => this.setState({ subscribemodal: false }), 2000)
    onGetChartsData("yearly")

    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminDashboard?access_token=" +
          localStorage.getItem("adminToken")
      )
      .then(res => {
        console.log(res.data)
        localStorage.setItem("admin_profile", res.data.profile)
        this.setState({
          mdata: res.data,
          reports: [
            {
              title: "Orders",
              iconClass: "bx-copy-alt",
              description: res.data.orders,
            },
            {
              title: "Revenue",
              iconClass: "bx-archive-in",
              description: "₦" + res.data.revenue,
            },
            {
              title: "Average Price",
              iconClass: "bx-purchase-tag-alt",
              description: "₦" + res.data.average,
            },
          ],
        })
      })
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "admin/getUserOrders?access_token=" +
          localStorage.getItem("adminToken")
      )
      .then(res => {
        console.log(res.data)
        this.setState({ orders: res.data })
      })
  }

  togglemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  togglesubscribemodal = () => {
    this.setState(prevState => ({
      subscribemodal: !prevState.subscribemodal,
    }))
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.state, chartSeries: this.props.chartsData })
    }
  }
  getProductDetails = uniq => {
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "admin/getDashboardOrderDetails?access_token=" +
          localStorage.getItem("adminToken") +
          "&unique=" +
          uniq
      )
      .then(res => {
        console.log(res.data)
        this.setState({ modal: true, ordd: res.data, orderunique: uniq })
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Dashboard | WebTalla</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={this.props.t("Dashboards")}
              breadcrumbItem={this.props.t("Dashboard")}
            />
            <Row>
              <Col xl="4">
                {this.state.mdata.length !== 0 ? (
                  <>
                    <WelcomeComp mdata={this.state.mdata} />
                    <MonthlyEarning mdata={this.state.mdata} />
                  </>
                ) : (
                  ""
                )}
              </Col>
              <Col xl="8">
                <Row>
                  {/* Reports Render */}
                  {this.state.reports.map((report, key) => (
                    <Col md="4" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <p className="text-muted fw-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </div>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Card>
                  <CardBody>
                    <div className="d-sm-flex flex-wrap">
                      <CardTitle className="card-title mb-4 h4">
                        Monthly Earning
                      </CardTitle>
                    </div>
                    <div className="clearfix" />
                    {this.state.mdata.length !== 0 ? (
                      <>
                        <Bar mdata={this.state.mdata} />
                      </>
                    ) : null}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="mb-4 h4 card-title">Latest Transaction</div>
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
                        {this.state.orders.map(ord => (
                          <tr>
                            <td>
                              <a
                                class="text-body fw-bold"
                                href="/ecommerce-orders"
                              >
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
                                onClick={() =>
                                  this.getProductDetails(ord.unique_id)
                                }
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <Modal
          isOpen={this.state.subscribemodal}
          role="dialog"
          autoFocus={true}
          data-toggle="modal"
          centered
          toggle={this.togglesubscribemodal}
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <button
                type="button"
                className="btn-close"
                onClick={() => this.setState({ subscribemodal: false })}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-4">
                <div className="avatar-md mx-auto mb-4">
                  <div className="avatar-title bg-light  rounded-circle text-primary h1">
                    <i className="mdi mdi-email-open"></i>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <h4 className="text-primary">Subscribe !</h4>
                    <p className="text-muted font-size-14 mb-4">
                      Subscribe our newletter and get notification to stay
                      update.
                    </p>

                    <div className="input-group  rounded bg-light">
                      <Input
                        type="email"
                        className="form-control bg-transparent border-0"
                        placeholder="Enter Email address"
                      />
                      <Button color="primary" type="button" id="button-addon2">
                        <i className="bx bxs-paper-plane"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.modal}
          role="dialog"
          autoFocus={true}
          centered={true}
          className="exampleModal"
          tabindex="-1"
          toggle={this.togglemodal}
        >
          <div className="modal-content">
            <ModalHeader toggle={this.togglemodal}>Order Details</ModalHeader>
            <ModalBody>
              <p class="mb-2">
                Product id:{" "}
                <span class="text-primary">#{this.state.orderunique}</span>
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
                    {this.state.ordd.map(ord => {
                      const dd = JSON.parse(ord.product_details)
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
                    {this.state.ordd.map((ord, kl) => {
                      const dd = JSON.parse(ord.amount)
                      if (kl == 0) {
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
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="secondary"
                onClick={this.togglemodal}
              >
                Close
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

const mapStateToProps = ({ Dashboard }) => ({
  chartsData: Dashboard.chartsData,
})

const mapDispatchToProps = dispatch => ({
  onGetChartsData: periodType => dispatch(getChartsData(periodType)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Dashboard))
