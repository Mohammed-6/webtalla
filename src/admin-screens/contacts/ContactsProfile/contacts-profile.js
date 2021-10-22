import React, { Component } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import mini card widgets
import MiniCards from "./mini-card"

//Import Images
import profile1 from "assets/images/profile-img.png"

// import charts
import ApexRevenue from "../ApexRevenue"
import { getUserProfile } from "store/actions"
import images from "assets/images"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import projectColumns from "./projectColumns"

import Banner1 from "../../../assets/front-assets/images/banner-ads.jpg"
import axios from "axios"
const create = axios.create()
class ContactsProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      miniCards: [
        {
          title: "Completed Orders",
          iconClass: "bx-check-circle",
          text: "125",
        },
        { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
        { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
      ],
      mainid: props.match.params.id,
      customer: [],
      orders: [],
      graph: {},
    }
  }

  componentDidMount() {
    const { onGetUserProfile } = this.props
    onGetUserProfile()

    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminCustomerProfile?access_token=" +
          localStorage.getItem("adminToken") +
          "&id=" +
          this.state.mainid
      )
      .then(res => {
        // console.log(res.data)
        this.setState({
          customer: res.data[0],
          miniCards: [
            {
              title: "Completed Projects",
              iconClass: "bx-check-circle",
              text: res.data[0].orders,
            },
            {
              title: "Total Revenue",
              iconClass: "bx-package",
              text: "₦" + res.data[0].total,
            },
          ],
          orders: res.data[0].allord,
          graph: res.data.graph,
        })
      })
  }

  render() {
    const { userProfile } = this.props

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Profile | WebTalla</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Contacts" breadcrumbItem="Profile" />

            <Row>
              <Col xl="4">
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col xs="7">
                        <div className="text-primary p-3">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p>It will seem like simplified</p>
                        </div>
                      </Col>
                      <Col xs="5" className="align-self-end">
                        <img src={profile1} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <Row>
                      <Col sm="4">
                        <div className="avatar-md profile-user-wid mb-4">
                          <img
                            src={
                              this.state.customer.img === null
                                ? Banner1
                                : process.env.REACT_APP_BASEURL +
                                  "assets/images/user-profile/" +
                                  this.state.customer.img
                            }
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                        <h5 className="font-size-15 text-truncate">
                          {this.state.customer.name}
                        </h5>
                        <p className="text-muted mb-0 text-truncate">
                          {this.state.customer.brand}
                        </p>
                      </Col>

                      <Col sm={8}>
                        <div className="pt-4">
                          <Row>
                            <Col xs="6">
                              <h5 className="font-size-15">
                                {this.state.customer.orders}
                              </h5>
                              <p className="text-muted mb-0">Orders</p>
                            </Col>
                            <Col xs="6">
                              <h5 className="font-size-15">
                                ₦{this.state.customer.total}
                              </h5>
                              <p className="text-muted mb-0">Revenue</p>
                            </Col>
                          </Row>
                          <div className="mt-4">
                            <Link to="" className="btn btn-primary btn-sm">
                              View Profile{" "}
                              <i className="mdi mdi-arrow-right ms-1" />
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <CardTitle className="mb-4 h4">
                      Personal Information
                    </CardTitle>

                    <div className="table-responsive">
                      <Table className="table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Full Name :</th>
                            <td>{this.state.customer.name}</td>
                          </tr>
                          <tr>
                            <th scope="row">Mobile :</th>
                            <td>{this.state.customer.phone}</td>
                          </tr>
                          <tr>
                            <th scope="row">E-mail :</th>
                            <td>{this.state.customer.email}</td>
                          </tr>
                          <tr>
                            <th scope="row">Location :</th>
                            <td>{this.state.customer.address}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>

                <Card style={{ display: "none" }}>
                  <CardBody>
                    <CardTitle className="mb-5">Experience</CardTitle>
                    <div className="">
                      <ul className="verti-timeline list-unstyled">
                        {map(userProfile.experiences, (experience, i) => (
                          <li
                            className={
                              experience.id === 1
                                ? "event-list active"
                                : "event-list"
                            }
                            key={"_exp_" + i}
                          >
                            <div className="event-timeline-dot">
                              <i
                                className={
                                  experience.id === 1
                                    ? "bx bx-right-arrow-circle bx-fade-right"
                                    : "bx bx-right-arrow-circle"
                                }
                              />
                            </div>
                            <div className="d-flex">
                              <div className="me-3">
                                <i
                                  className={
                                    "bx " +
                                    experience.iconClass +
                                    " h4 text-primary"
                                  }
                                />
                              </div>
                              <div className="flex-1">
                                <div>
                                  <h5 className="font-size-15">
                                    <Link
                                      to={experience.link}
                                      className="text-dark"
                                    >
                                      {experience.designation}
                                    </Link>
                                  </h5>
                                  <span className="text-primary">
                                    {experience.timeDuration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xl="8">
                <Row>
                  {this.state.miniCards.map((card, key) => (
                    <MiniCards
                      title={card.title}
                      text={card.text}
                      iconClass={card.iconClass}
                      key={"_card_" + key}
                    />
                  ))}
                </Row>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4 h4">Revenue</CardTitle>
                    <div id="revenue-chart" className="apex-charts">
                      {this.state.orders.length > 0 ? (
                        <ApexRevenue graph={JSON.parse(this.state.graph)} />
                      ) : (
                        ""
                      )}
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4 h4">My Orders</CardTitle>
                    <ToolkitProvider
                      keyField="id"
                      data={userProfile.projects || []}
                      columns={projectColumns()}
                      bootstrap4
                    >
                      {toolkitProps => (
                        <React.Fragment>
                          <Row>
                            <Col xl="12">
                              <div className="table-responsive">
                                <div class="table-responsive">
                                  <div class="react-bootstrap-table">
                                    <table class="table table table-nowrap table-hover mb-0">
                                      <thead class="tbody-light">
                                        <tr>
                                          <th
                                            tabindex="0"
                                            aria-label="# sortable"
                                            class="sortable"
                                          >
                                            #<span class="order-4"></span>
                                          </th>
                                          <th
                                            tabindex="0"
                                            aria-label="Projects sortable"
                                            class="sortable"
                                          >
                                            Order name
                                            <span class="order-4"></span>
                                          </th>
                                          <th
                                            tabindex="0"
                                            aria-label="Start Date sortable"
                                            class="sortable"
                                          >
                                            Purchase Date
                                            <span class="order-4"></span>
                                          </th>

                                          <th
                                            tabindex="0"
                                            aria-label="Budget sortable"
                                            class="sortable"
                                          >
                                            Amount<span class="order-4"></span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.orders.map((order, key) => {
                                          const dd = JSON.parse(
                                            order.product_details
                                          )
                                          const ordd = order.created_at
                                          // const date = new Date(Date.parse(ordd));

                                          return (
                                            <tr>
                                              <td>{key + 1}</td>
                                              <td>{dd.adname}</td>
                                              <td>{ordd.substring(0, 10)}</td>
                                              <td>₦{dd.rates}</td>
                                            </tr>
                                          )
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </React.Fragment>
                      )}
                    </ToolkitProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

ContactsProfile.propTypes = {
  userProfile: PropTypes.any,
  onGetUserProfile: PropTypes.func,
}

const mapStateToProps = ({ contacts }) => ({
  userProfile: contacts.userProfile,
})

const mapDispatchToProps = dispatch => ({
  onGetUserProfile: () => dispatch(getUserProfile()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactsProfile))
