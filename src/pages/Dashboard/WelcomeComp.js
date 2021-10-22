import React, { Component } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"

class WelcomeComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mdata: props.mdata,
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card className="overflow-hidden">
          <div className="bg-primary bg-soft">
            <Row>
              <Col xs="8">
                <div className="text-primary p-3">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <p>WebTalla Dashboard</p>
                </div>
              </Col>
              <Col xs="4" className="align-self-end">
                <img src={profileImg} alt="" className="img-fluid" />
              </Col>
            </Row>
          </div>
          <CardBody className="pt-0">
            <Row>
              <Col sm="12">
                <div className="avatar-md profile-user-wid mb-4">
                  <img
                    src={
                      process.env.REACT_APP_BASEURL +
                      "assets/images/user-profiles/" +
                      this.state.mdata.profile
                    }
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate">
                  {localStorage.getItem("auser_name")}
                </h5>
                <p className="text-muted mb-0 text-truncate">
                  {this.state.mdata.designation}
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default WelcomeComp
