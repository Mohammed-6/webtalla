import React, { Component } from "react"
import { Row, Col } from "reactstrap"

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container-fluid">
            <Row>
              <Col sm={6}>{new Date().getFullYear()} © Webtalla.</Col>
              <Col sm={6}>
                <div className="text-sm-end d-none d-sm-block">
                  Powered by Sasaran Technologies
                </div>
              </Col>
            </Row>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

export default Footer