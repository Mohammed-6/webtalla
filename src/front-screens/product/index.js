import React, { Component } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap"
import classnames from "classnames"
import { isEmpty, map, size } from "lodash"

//Import Star Ratings
import StarRatings from "react-star-ratings"

// RangeSlider
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

//Import Product Images
import { productImages } from "assets/images/product"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import data
import { discountData, productsData } from "common/data"

//Import actions
import { getProducts } from "store/e-commerce/actions"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

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

import Header from "../Header1"
import Footer from "../Footer"

import axios from "axios"
const create = axios.create()

class EcommerceProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      FilterClothes: [
        { id: 1, name: "T-shirts", link: "#" },
        { id: 2, name: "Shirts", link: "#" },
        { id: 3, name: "Jeans", link: "#" },
        { id: 4, name: "Jackets", link: "#" },
      ],
      ratingvalues: [],
      products: [],
      category: "",
      activeTab: "1",
      discountData: [],
      filters: {
        discount: [],
        price: { min: 0, max: 500 },
      },
      page: 1,
      totalPage: 5, //replace this with total pages of data
    }
    this.toggleTab = this.toggleTab.bind(this)
    this.onSelectRating = this.onSelectRating.bind(this)
  }

  componentDidMount() {
    // const { products, onGetProducts } = this.props
    // this.setState({ products })
    // onGetProducts()
    // this.setState({ discountData })

    create
      .post(process.env.REACT_APP_BASEURL + "adslots/ad_index")
      .then(res => {
        console.log(res.data.data)
        this.setState({ products: res.data.data })
        res.data.data.map(tm => {
          this.setState({ category: tm.vertical_name })
        })
      })
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { products } = this.props
    if (
      isEmpty(prevProps.products) &&
      !isEmpty(products) &&
      size(products) !== size(prevProps.products)
    ) {
      this.setState({ products })
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  onSelectDiscount = e => {
    const { value, checked } = e.target
    const {
      filters,
      filters: { discount },
    } = this.state
    this.setState(
      {
        filters: {
          ...filters,
          discount: discount.find(item => item === value)
            ? discount.filter(item => item !== value)
            : [...discount, value],
        },
      },
      () => {
        this.onFilterProducts(value, checked)
      }
    )
  }

  onFilterProducts = (value, checked) => {
    const {
      filters: { discount },
    } = this.state
    let filteredProducts = productsData
    if (!!checked && parseInt(value) === 0) {
      filteredProducts = productsData.filter(product => product.rates < 10)
    } else if (discount.length > 0) {
      filteredProducts = productsData.filter(
        product => product.rates >= Math.min(...discount)
      )
    }
    this.setState({ products: filteredProducts })
  }

  onUpdate = (render, handle, value) => {
    this.setState({
      products: productsData.filter(
        product => product.rates >= value[0] && product.rates <= value[1]
      ),
    })
  }

  /*
  on change rating checkbox method
  */
  onChangeRating = value => {
    this.setState({
      products: productsData.filter(product => product.rating >= value),
    })

    var modifiedRating = [...this.state.ratingvalues]
    modifiedRating.push(value)
    this.setState({ ratingvalues: modifiedRating })
  }

  onSelectRating = value => {
    this.setState({
      products: productsData.filter(product => product.rating === value),
    })
  }

  onUncheckMark = value => {
    var modifiedRating = [...this.state.ratingvalues]
    const modifiedData = (modifiedRating || []).filter(x => x !== value)
    /*
    find min values
    */
    var filteredProducts = productsData
    if (modifiedData && modifiedData.length && value !== 1) {
      var minValue = Math.min(...modifiedData)
      if (minValue && minValue !== Infinity) {
        filteredProducts = productsData.filter(
          product => product.rating >= minValue
        )

        this.setState({ ratingvalues: modifiedData })
      }
    } else {
      filteredProducts = productsData
    }
    this.setState({ products: filteredProducts })
  }

  handlePageClick = page => {
    this.setState({ page })
  }

  cleanUrl = url => {
    // const str = url
    return url.replace(/\s+/g, "-").toLowerCase()
    // return str // "sonic-free-games"
  }

  render() {
    const { history } = this.props
    const { discountData, products, page, totalPage } = this.state
    return (
      <React.Fragment>
        <Header />
        <div className="pt-5"></div>
        <div className="page-content">
          <MetaTags>
            <title>Products</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
            <Row>
              <Col lg="3">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Filter</CardTitle>
                    <div>
                      <h5 className="font-size-14 mb-3">Clothes</h5>
                      {/* Render Cloth Categories */}
                      <ul className="list-unstyled product-list">
                        {this.state.FilterClothes.map((cloth, key) => (
                          <li key={"_li_" + key}>
                            <Link to={cloth.link}>
                              <i className="mdi mdi-chevron-right me-1" />{" "}
                              {cloth.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-3">
                      <h5 className="font-size-14 mb-4">Price</h5>
                      <br />

                      <Nouislider
                        range={{ min: 0, max: 5000000 }}
                        tooltips={true}
                        start={[100000, 1000000]}
                        connect
                        onSlide={this.onUpdate}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="9">
                <Row className="mb-3">
                  <Col xl="4" sm="6">
                    <div className="mt-2">
                      <h5>{this.state.category}</h5>
                    </div>
                  </Col>
                  <Col lg="8" sm="6">
                    <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                      <div className="search-box me-2">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control border-0"
                            placeholder="Search..."
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                      <Nav className="product-view-nav" pills>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeTab === "1",
                            })}
                            onClick={() => {
                              this.toggleTab("1")
                            }}
                          >
                            <i className="bx bx-grid-alt" />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeTab === "2",
                            })}
                            onClick={() => {
                              this.toggleTab("2")
                            }}
                          >
                            <i className="bx bx-list-ul" />
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  {!isEmpty(products) &&
                    products.map((product, key) => (
                      <Col xl="4" sm="6" key={"_col_" + key}>
                        <Card>
                          <CardBody>
                            <div className="product-img position-relative">
                              <Carousel responsive={responsive}>
                                {JSON.parse(product.attachments).map(im => (
                                  <div>
                                    <img
                                      src={
                                        process.env.REACT_APP_BASEURL +
                                        "assets/images/product-images/" +
                                        im.file_name
                                      }
                                      alt=""
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                ))}
                              </Carousel>

                              {/* <img
                                  src={product.adname}
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                                /> */}
                            </div>

                            <div className="mt-4 text-center">
                              <h5 className="mb-3 text-truncate">
                                <Link
                                  to={
                                    this.cleanUrl(product.vertical_name) +
                                    "/" +
                                    this.cleanUrl(product.adname)
                                  }
                                  className="text-dark"
                                >
                                  {product.adname}{" "}
                                </Link>
                              </h5>
                              <h5 className="my-0">
                                <span className="text-muted me-2">
                                  <del>${product.rates - product.rates}</del>
                                </span>{" "}
                                <b>${product.rates}</b>
                              </h5>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                </Row>

                <Row>
                  <Col lg="12">
                    <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                      <PaginationItem disabled={page === 1}>
                        <PaginationLink
                          previous
                          href="#"
                          onClick={() => this.handlePageClick(page - 1)}
                        />
                      </PaginationItem>
                      {map(Array(totalPage), (item, i) => (
                        <PaginationItem active={i + 1 === page} key={i}>
                          <PaginationLink
                            onClick={() => this.handlePageClick(i + 1)}
                            href="#"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem disabled={page === totalPage}>
                        <PaginationLink
                          next
                          href="#"
                          onClick={() => this.handlePageClick(page + 1)}
                        />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  onGetProducts: PropTypes.func,
}

const mapStateToProps = state => ({
  products: state.ecommerce.products,
})

const mapDispatchToProps = dispatch => ({
  onGetProducts: () => dispatch(getProducts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceProducts))
