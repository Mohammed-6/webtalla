import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from "react-meta-tags"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import Earning from "./earning"
import SalesAnalytics from "./sales-analytics"
import TotalSellingProduct from "./total-selling-product"
import Tasks from "./tasks"
import ChatBox from "./chat-box"

import axios from "axios"
const create = axios.create()
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [
        {
          icon: "bx bx-copy-alt",
          title: "Orders",
          value: "1,452",
          badgeValue: "+ 0.2%",
          color: "success",
          desc: "From previous period",
        },
        {
          icon: "bx bx-archive-in",
          title: "Revenue",
          value: "$ 28,452",
          badgeValue: "+ 0.2%",
          color: "success",
          desc: "From previous period",
        },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "Average Price",
          value: "$ 16.2",
          badgeValue: "0%",
          color: "warning",
          desc: "From previous period",
        },
      ],
      mdata: [],
      orders: [],
      ordd: [],
      orderunique: "",
    }
  }
  componentDidMount() {
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
              icon: "bx bx-copy-alt",
              title: "Orders",
              value: res.data.orders,
              badgeValue: "+ 0.2%",
              color: "success",
              desc: "From previous period",
            },
            {
              icon: "bx bx-archive-in",
              title: "Revenue",
              value: "₦ " + res.data.revenue,
              badgeValue: "+ 0.2%",
              color: "success",
              desc: "From previous period",
            },
            {
              icon: "bx bx-purchase-tag-alt",
              title: "Average Price",
              value: "₦" + res.data.average,
              badgeValue: "0%",
              color: "warning",
              desc: "From previous period",
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
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>WebTalla Dashboard</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Dashboard" breadcrumbItem="" />

            {/* Card User */}
            {this.state.mdata.length !== 0 ? (
              <>
                <CardUser mdata={this.state.mdata} />
              </>
            ) : (
              ""
            )}
            <Row>
              {/* welcome card */}
              <CardWelcome />

              <Col xl="8">
                <Row>
                  {/*mimi widgets */}
                  <MiniWidget reports={this.state.reports} />
                </Row>
              </Col>
            </Row>

            <Row>
              {/* earning */}
              {this.state.mdata.length !== 0 ? (
                <>
                  <Earning
                    mdata={this.state.mdata}
                    mgraph={JSON.parse(this.state.mdata.mgraph)}
                  />
                </>
              ) : (
                ""
              )}

              {/* sales anytics */}
              <SalesAnalytics />
            </Row>

            <Row>
              {/* total selling product */}
              <TotalSellingProduct />

              {/* tasks */}
              <Tasks />

              {/* chat box */}
              <ChatBox />
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
