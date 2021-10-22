import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Col, Container, Row } from "reactstrap"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import axios from "axios"
const create = axios.create()

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card invoice
import CardInvoice from "./card-invoice"
import { getInvoices } from "store/actions"

class InvoicesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoices: [],
    }
  }
  componentDidMount() {
    // const { onGetInvoices } = this.props
    // onGetInvoices()
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminInvoices?access_token=" +
          localStorage.getItem("adminToken")
      )
      .then(res => {
        // console.log(res.data)
        this.setState({ invoices: res.data })
      })
  }

  render() {
    const { invoices } = this.props
    return (
      <React.Fragment>
        <div className="page-content">
          {/* add meta title */}
          <MetaTags>
            <title>Invoice List | Wetalla</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

            <Row>
              {this.state.invoices.map((inv, k) => (
                <CardInvoice data={inv} key={"_invoice_" + k} />
              ))}
              {/* {map(invoices, (invoice, key) => (
                <CardInvoice data={invoice} key={"_invoice_" + key} />
              ))} */}
            </Row>
            <Row>
              <Col xs="12">
                <div className="text-center my-3">
                  <Link to="#" className="text-success">
                    <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                    Load more
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

InvoicesList.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

const mapStateToProps = ({ invoices }) => ({
  invoices: invoices.invoices,
})

const mapDispatchToProps = dispatch => ({
  onGetInvoices: () => dispatch(getInvoices()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InvoicesList))
