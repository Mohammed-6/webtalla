import React, { Component } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import MetaTags from "react-meta-tags"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import "./datatables.scss"

import axios from "axios"
const create = axios.create()

import { Link } from "react-router-dom"
// Table data
const products = [
  {
    id: 1,
    name: "Airi Satou",
    position: "Accountant",
    office: "Tokyo",
    age: "33",
    startdate: "2008/11/28",
    salary: "$162,700",
  },
]

class DatatableTables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      sizePerPage: 10,
      productData: products,
      customers: [],
    }
  }

  componentDidMount() {
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminCustomers?access_token=" +
          localStorage.getItem("adminToken")
      )
      .then(res => {
        // console.log(res.data)
        this.setState({ customers: res.data })
      })
  }

  render() {
    const columns = [
      {
        dataField: "id",
        text: "Id",
        sort: true,
      },
      {
        dataField: "img",
        text: "#",
        formatter: (cellContent, user) => (
          <>
            {!user.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {user.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={
                    process.env.REACT_APP_BASEURL +
                    "assets/images/user-profile/" +
                    user.img
                  }
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "email",
        text: "Email",
        sort: true,
      },
      {
        dataField: "brand",
        text: "Brand Name",
        sort: true,
      },
      {
        dataField: "orders",
        text: "Orders",
        sort: true,
      },
      {
        dataField: "regby",
        text: "Reg By",
        sort: true,
      },
      {
        dataField: "view",
        isDummyField: true,
        text: "View Details",
        sort: true,
        formatter: (cellContent, row) => (
          <Link to={"/admin/contacts-profile/" + row.id}>
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => toggleViewModal(row)}
            >
              View Details
            </Button>
          </Link>
        ),
      },
      {
        dataField: "action",
        isDummyField: true,
        text: "Action",
        formatter: (cellContent, cs) => (
          <>
            <div className="d-flex gap-3">
              <Link
                to={"/admin/customer/edit-customer/" + cs.access_token}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              </Link>
              <Link to="#" className="text-danger">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => handleDeleteCustomer(cs)}
                />
              </Link>
            </div>
          </>
        ),
      },
    ]

    const defaultSorted = [
      {
        dataField: "id",
        order: "asc",
      },
    ]

    const pageOptions = {
      sizePerPage: 10,
      totalSize: products.length, // replace later with size(customers),
      custom: true,
    }

    // Custom Pagination Toggle
    const sizePerPageList = [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "15", value: 15 },
      { text: "20", value: 20 },
      { text: "25", value: 25 },
      { text: "All", value: this.state.customers.length },
    ]

    // Select All Button operation
    const selectRow = {
      mode: "checkbox",
    }
    const handleDeleteCustomer = cs => {
      if (confirm("Are you sure you want to delete this customer")) {
        create
          .post(
            process.env.REACT_APP_BASEURL +
              "admin/deleteCustomer?access_token=" +
              localStorage.getItem("adminToken") +
              "&customer_id=" +
              cs.id
          )
          .then(res => {
            // console.log(res.data)
            this.setState({ customers: res.data })
          })
      }
    }
    const toggleViewModal = cs => {}

    const { SearchBar } = Search

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Customers | WebTalla</title>
          </MetaTags>
          <div className="container-fluid">
            <Breadcrumbs title="Customers" breadcrumbItem="Customers List" />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columns}
                      data={this.state.customers}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={columns}
                          data={this.state.customers}
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={"id"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      selectRow={selectRow}
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="align-items-md-center mt-30">
                                <Col className="inner-custom-pagination d-flex">
                                  <div className="d-inline">
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                  <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default DatatableTables
