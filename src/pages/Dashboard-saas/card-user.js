import React, { Component } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Media,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg"

class CardUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings_Menu: false,
      mdata: props.mdata,
    }
    this.toggleSettings = this.toggleSettings.bind(this)
  }

  //Setting Menu
  toggleSettings() {
    this.setState(prevState => ({
      settings_Menu: !prevState.settings_Menu,
    }))
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <Row>
                  <Col lg="4">
                    <div className="d-flex">
                      <div className="me-3">
                        <img
                          src={
                            this.state.mdata.profile !== ""
                              ? process.env.REACT_APP_BASEURL +
                                "assets/images/user-profiles/" +
                                this.state.mdata.profile
                              : avatar1
                          }
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </div>
                      <div className="flex-1 align-self-center">
                        <div className="text-muted">
                          <p className="mb-2">Welcome to WeTalla dashboard</p>
                          <h5 className="mb-1">
                            {localStorage.getItem("auser_name")}
                          </h5>
                          <p className="mb-0">{this.state.mdata.designation}</p>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col lg="4" className="align-self-center">
                    <div className="text-lg-center mt-4 mt-lg-0">
                      <Row>
                        <Col xs="4">
                          <div>
                            <p className="text-muted text-truncate mb-2">
                              Total Ads
                            </p>
                            <h5 className="mb-0">{this.state.mdata.ads}</h5>
                          </div>
                        </Col>
                        <Col xs="4">
                          <div>
                            <p className="text-muted text-truncate mb-2">
                              Total Orders
                            </p>
                            <h5 className="mb-0">{this.state.mdata.orders}</h5>
                          </div>
                        </Col>
                        <Col xs="4">
                          <div>
                            <p className="text-muted text-truncate mb-2">
                              Customers
                            </p>
                            <h5 className="mb-0">
                              {this.state.mdata.customers}
                            </h5>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  <Col lg="4" className="d-none d-lg-block">
                    <div className="clearfix mt-4 mt-lg-0"></div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default CardUser
