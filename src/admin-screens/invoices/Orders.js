import React, { Component, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import MetaTags from "react-meta-tags"
import { withRouter } from "react-router-dom"
import { isEmpty, size } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { Link } from "react-router-dom"
import * as moment from "moment"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Badge,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { getOrders, addNewOrder, updateOrder, deleteOrder } from "store/actions"

// import OrdersModal from "./OrdersModal"
const OrderModal = props => {
  const [ordd, setOrdd] = useState([])
  const [orderunique, setOrderunique] = useState(props.uniq)

  useEffect(() => {
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "basic/getOrderDetails?access_token=" +
          localStorage.getItem("token") +
          "&unique=" +
          props.uniq
      )
      .then(res => {
        console.log(res.data)
        setOrdd(res.data)
      })
  }, [])
  let amt = 0
  return (
    <>
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
                      <h5 class="text-truncate font-size-14">{dd.adname}</h5>
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
                      <td>₦ {amt}</td>
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
                      <td>₦ {parseInt(amt + ll).toFixed(2)}</td>
                    </tr>
                  </>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
import axios from "axios"
const create = axios.create()
class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewmodal: false,
      modalmodal: false,
      vieworderid: "",
      modal: false,
      orders: [],
      editorder: {},
      EcommerceOrderColumns: [
        {
          text: "id",
          dataField: "id",
          sort: true,
          hidden: true,
          formatter: (cellContent, user) => <>{order.id}</>,
        },
        {
          dataField: "orderId",
          text: "Order ID",
          sort: true,
          formatter: (cellContent, row) => (
            <Link to="#" className="text-body fw-bold">
              {row.orderId}
            </Link>
          ),
        },
        {
          dataField: "billingName",
          text: "Billing Name",
          sort: true,
        },
        {
          dataField: "orderdate",
          text: "Date",
          sort: true,
          formatter: (cellContent, row) => this.handleValidDate(row.orderdate),
        },
        {
          dataField: "total",
          text: "Total",
          sort: true,
        },
        {
          dataField: "paymentStatus",
          text: "Payment Status",
          sort: true,
          formatter: (cellContent, row) => (
            <Badge
              className={"font-size-12 badge-soft-" + row.badgeclass}
              color={row.badgeclass}
              pill
            >
              {row.paymentStatus}
            </Badge>
          ),
        },
        {
          dataField: "paymentMethod",
          isDummyField: true,
          text: "Payment Method",
          sort: true,
          formatter: (cellContent, row) => (
            <>
              <i
                className={
                  row.paymentMethod !== "Cheque"
                    ? "fab fa-cc-" +
                      this.toLowerCase1(row.paymentMethod) +
                      " me-1"
                    : "fab fas fa-money-bill-alt me-1"
                }
              />{" "}
              {row.paymentMethod}
            </>
          ),
        },
        {
          dataField: "view",
          isDummyField: true,
          text: "View Details",
          sort: true,
          formatter: (cellContent, row) => (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => this.toggleViewModal(row.orderId)}
            >
              View Details
            </Button>
          ),
        },
        {
          dataField: "action",
          isDummyField: true,
          text: "Action",
          formatter: (cellContent, order) => (
            <>
              <div className="d-flex gap-3">
                <Link to="#" className="text-success">
                  <i
                    className="mdi mdi-pencil font-size-18"
                    id="edittooltip"
                    onClick={() => this.handleOrderClick(order)}
                  />
                </Link>
                <Link to="#" className="text-danger">
                  <i
                    className="mdi mdi-delete font-size-18"
                    id="deletetooltip"
                    onClick={() => this.handleDeleteOrder(order)}
                  />
                </Link>
              </div>
            </>
          ),
        },
      ],
    }

    this.handleOrderClick = this.handleOrderClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.etoggle = this.etoggle.bind(this)
    this.handleValidOrderSubmit = this.handleValidOrderSubmit.bind(this)
    this.handleOrderClicks = this.handleOrderClicks.bind(this)
    this.toLowerCase1 = this.toLowerCase1.bind(this)
  }

  toLowerCase1(str) {
    return str.toLowerCase()
  }

  componentDidMount() {
    // const { orders, onGetOrders } = this.props
    // if (orders && !orders.length) {
    //   onGetOrders()
    // }
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/getAllUserOrders?access_token=" +
          localStorage.getItem("adminToken")
      )
      .then(res => {
        // console.log(res.data)
        this.setState({ orders: res.data })
      })
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { orders } = this.props
    if (!isEmpty(orders) && size(prevProps.orders) !== size(orders)) {
      this.setState({ orders: {}, isEdit: false })
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  etoggle() {
    this.setState(prevState => ({
      editmodal: !prevState.editmodal,
    }))
  }

  handleOrderClicks = () => {
    this.setState({ orders: "", isEdit: false })
    this.toggle()
  }

  // eslint-disable-next-line no-unused-vars
  handleTableChange = (type, { page, searchText }) => {
    const { orders } = this.props
    this.setState({
      orders: orders.filter(order =>
        Object.keys(order).some(
          key =>
            typeof order[key] === "string" &&
            order[key].toLowerCase().includes(searchText.toLowerCase())
        )
      ),
    })
  }

  toggleViewModal = id => {
    console.log(id)
    this.setState(prevState => ({
      viewmodal: !prevState.viewmodal,
      editmodal: !prevState.editmodal,
      vieworderid: id,
    }))
  }

  /* Insert,Update Delete data */

  handleDeleteOrder = order => {
    console.log("order", order)
    if (order["id"] === "") {
    } else {
      if (confirm("Are you sure you want to delete this order")) {
        create
          .post(
            process.env.REACT_APP_BASEURL +
              "admin/deleteOrder?access_token=" +
              localStorage.getItem("adminToken") +
              "&orderId=" +
              order.unique_id
          )
          .then(res => {
            // console.log(res.data)
            this.setState({ orders: res.data })
          })
      }
    }
  }

  handleOrderClick = arg => {
    const order = arg

    this.setState({
      editorder: {
        id: order.id,
        orderId: order.orderId,
        billingName: order.billingName,
        orderdate: order.orderdate,
        total: order.total.substring(1, 10),
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        badgeclass: order.badgeclass,
      },
      isEdit: true,
    })

    this.toggle()
  }

  /**
   * Handling submit Order on Order form
   */
  handleValidOrderSubmit = (e, values) => {
    const { onAddNewOrder, onUpdateOrder } = this.props
    const { isEdit, orders, selectedOrder } = this.state

    if (isEdit) {
      const updateOrder = {
        id: orders.id,
        orderId: values.orderId,
        billingName: values.billingName,
        orderdate: values.orderdate,
        total: values.total,
        paymentStatus: values.paymentStatus,
        paymentMethod: values.paymentMethod,
        badgeclass: values.badgeclass,
      }

      // update Order
      const formData = new FormData()
      formData.append("data", JSON.stringify(updateOrder))
      create
        .post(
          process.env.REACT_APP_BASEURL +
            "admin/updateUserOrders?access_token=" +
            localStorage.getItem("adminToken"),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(res => {
          // console.log(res.data)
          this.setState({ orders: res.data })
        })
      //   onUpdateOrder(updateOrder)
    } else {
      const newOrder = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        orderId: values["orderId"],
        billingName: values["billingName"],
        orderdate: values["orderdate"],
        total: values["total"],
        paymentStatus: values["paymentStatus"],
        paymentMethod: values["paymentMethod"],
        badgeclass: values["badgeclass"],
      }
      // save new Order
      //   onAddNewOrder(newOrder)
    }
    this.setState({ selectedOrder: null })
    this.toggle()
  }

  handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  render() {
    const { orders } = this.props

    const { SearchBar } = Search

    const { isEdit } = this.state

    //pagination customization
    const pageOptions = {
      sizePerPage: 10,
      totalSize: this.state.orders.length, // replace later with size(Order),
      custom: true,
    }

    const defaultSorted = [
      {
        dataField: "orderId",
        order: "desc",
      },
    ]

    const selectRow = {
      mode: "checkbox",
    }

    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.editmodal}
          role="dialog"
          autoFocus={true}
          centered={true}
          className="exampleModal"
          tabIndex="-1"
          toggle={this.etoggle}
        >
          <div className="modal-content">
            <ModalHeader toggle={this.etoggle}>Order Details</ModalHeader>
            <ModalBody>
              <OrderModal uniq={this.state.vieworderid} />
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="secondary" onClick={this.etoggle}>
                Close
              </Button>
            </ModalFooter>
          </div>
        </Modal>
        <div className="page-content">
          <MetaTags>
            <title>Orders | WebTalla</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions || [])}
                      keyField="id"
                      columns={this.state.EcommerceOrderColumns || []}
                      data={this.state.orders || []}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={this.state.orders}
                          columns={this.state.EcommerceOrderColumns || []}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded mb-2 me-2"
                                      onClick={this.handleOrderClicks}
                                    >
                                      <i className="mdi mdi-plus me-1" /> Add
                                      New Order
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <div className="table-responsive">
                                <BootstrapTable
                                  {...toolkitProps.baseProps}
                                  {...paginationTableProps}
                                  responsive
                                  defaultSorted={defaultSorted}
                                  bordered={false}
                                  striped={false}
                                  selectRow={selectRow}
                                  classes={
                                    "table align-middle table-nowrap table-check"
                                  }
                                  headerWrapperClasses={"table-light"}
                                />
                                <Modal isOpen={this.state.modal}>
                                  <ModalHeader toggle={this.toggle} tag="h4">
                                    {!!isEdit ? "Edit Order" : "Add Order"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm
                                      onValidSubmit={
                                        this.handleValidOrderSubmit
                                      }
                                    >
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <AvField
                                              name="orderId"
                                              label="Order Id"
                                              type="text"
                                              errorMessage="Invalid orderId"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                this.state.editorder.orderId ||
                                                ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="billingName"
                                              label="Billing Name"
                                              type="text"
                                              errorMessage="Invalid Billing Name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                this.state.editorder
                                                  .billingName || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="orderdate"
                                              label="Date"
                                              type="date"
                                              errorMessage="Invalid Date"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                this.state.editorder
                                                  .orderdate || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="total"
                                              label="Total"
                                              type="text"
                                              errorMessage="Invalid Total"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                this.state.editorder.total || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentStatus"
                                              label="Payment Status"
                                              type="select"
                                              id="status1"
                                              className="form-select"
                                              errorMessage="Invalid Payment Status"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                this.state.editorder
                                                  .paymentStatus || "Paid"
                                              }
                                            >
                                              <option>Paid</option>
                                              <option>Pending</option>
                                            </AvField>
                                          </div>
                                          <div
                                            className="mb-3"
                                            style={{ display: "none" }}
                                          >
                                            <AvField
                                              name="badgeclass"
                                              label="Badge Class"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Badge Class"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                this.state.editorder
                                                  .badgeclass || "success"
                                              }
                                            >
                                              <option>success</option>
                                              <option>danger</option>
                                              <option>warning</option>
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentMethod"
                                              label="Payment Method"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Payment Method"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                this.state.editorder
                                                  .paymentMethod || "Mastercard"
                                              }
                                            >
                                              <option>Visa</option>
                                              <option>Cheque</option>
                                            </AvField>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="text-end">
                                            <button
                                              type="submit"
                                              className="btn btn-success save-user"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </AvForm>
                                  </ModalBody>
                                </Modal>
                              </div>
                              <div className="pagination pagination-rounded justify-content-end mb-2">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </div>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
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

Orders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
}

const mapStateToProps = state => ({
  orders: state.ecommerce.orders,
})

const mapDispatchToProps = dispatch => ({
  onGetOrders: () => dispatch(getOrders()),
  onAddNewOrder: order => dispatch(addNewOrder(order)),
  onUpdateOrder: order => dispatch(updateOrder(order)),
  onDeleteOrder: order => dispatch(deleteOrder(order)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders))
