import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Image
import logo from "../../assets/front-assets/images/logo.png"
import PropTypes from "prop-types"
import { getInvoiceDetail } from "../../store/invoices/actions"
import { connect } from "react-redux"

import axios from "axios"
const create = axios.create()
class InvoiceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoiceDetail1: [],
      billingAddress: {},
    }
  }
  componentDidMount() {
    const {
      match: { params },
      onGetInvoiceDetail,
    } = this.props
    // if (params && params.id) {
    //   onGetInvoiceDetail(params.id)
    // } else {
    //   onGetInvoiceDetail(1) //remove this after full integration
    // }

    if (params && params.id) {
      create
        .post(
          process.env.REACT_APP_BASEURL +
            "admin/getOrderDetails?access_token=" +
            localStorage.getItem("adminToken") +
            "&unique=" +
            params.id
        )
        .then(res => {
          console.log(res.data)
          this.setState({
            invoiceDetail1: res.data[0],
            billingAddress: JSON.parse(res.data[0].billingAddress),
          })
        })
    }
  }

  //Print the Invoice
  printInvoice = () => {
    window.print()
  }

  render() {
    // const { invoiceDetail } = this.props

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Invoice Detail | WebTalla</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Invoices" breadcrumbItem="Invoice Detail" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="invoice-title">
                      <h4 className="float-end font-size-16">
                        Order # {this.state.invoiceDetail1.orderId}
                      </h4>
                      <div className="mb-4">
                        <img src={logo} alt="logo" height="20" />
                      </div>
                    </div>
                    <hr />
                    <Row>
                      <Col sm="6">
                        <address>
                          <strong>Billed To:</strong>
                          <br />
                          <span>
                            {this.state.billingAddress.name}, <br />
                            {this.state.billingAddress.email}, <br />
                            {this.state.billingAddress.phone}, <br />
                            {this.state.billingAddress.address},{" "}
                            {this.state.billingAddress.state}, <br />
                            Notes: {this.state.billingAddress.ordernotes}
                          </span>
                          <br />
                        </address>
                      </Col>
                      <Col sm="6" className="text-sm-end"></Col>
                    </Row>
                    <Row>
                      <Col sm="6" className="mt-3">
                        <address>
                          <strong>Payment Method:</strong>
                          <br />
                          {this.state.billingAddress.paymentmethod}, <br />
                          {this.state.billingAddress.email},{" "}
                        </address>
                      </Col>
                      <Col sm="6" className="mt-3 text-sm-end">
                        <address>
                          <strong>Order Date:</strong>
                          <br />
                          {this.state.invoiceDetail1.orderDate}
                          <br />
                          <br />
                        </address>
                      </Col>
                    </Row>
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 font-weight-bold">
                        Order summary
                      </h3>
                    </div>
                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>No.</th>
                            <th>Item</th>
                            <th className="text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {map(this.state.invoiceDetail1.items, (item, key) => (
                            <tr key={key}>
                              <td>{item.id}</td>
                              <td>{item.item}</td>
                              <td className="text-end">{item.price}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="2" className="text-end">
                              Sub Total
                            </td>
                            <td className="text-end">
                              ₦ {this.state.invoiceDetail1.total}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="text-end">
                              VAT(7.5%)
                            </td>
                            <td className="text-end">
                              ₦ {(7.5 / 100) * this.state.invoiceDetail1.total}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="border-0 text-end">
                              <strong>Total</strong>
                            </td>
                            <td className="border-0 text-end">
                              <h4 className="m-0">
                                ₦{" "}
                                {this.state.invoiceDetail1.total +
                                  (7.5 / 100) * this.state.invoiceDetail1.total}
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="d-print-none">
                      <div className="float-end">
                        <Link
                          to="#"
                          onClick={this.printInvoice}
                          className="btn btn-success me-1"
                        >
                          <i className="fa fa-print" />
                        </Link>{" "}
                        <Link to="#" className="btn btn-primary w-md">
                          Send
                        </Link>
                      </div>
                    </div>
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

export default withRouter(InvoiceDetail)
