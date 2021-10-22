import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

//actions
import { getEarningChartsData } from "../../store/actions"

import ReactApexChart from "react-apexcharts"

import axios from "axios"
const create = axios.create()
class Earning extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      mdata: props.mdata,
      series: [
        {
          name: "Orders",
          data: props.mgraph,
        },
      ],
      options: {
        chart: {
          toolbar: "false",
          dropShadow: {
            enabled: !0,
            color: "#000",
            top: 18,
            left: 7,
            blur: 8,
            opacity: 0.2,
          },
        },
        dataLabels: {
          enabled: !1,
        },
        colors: ["#556ee6"],
        stroke: {
          curve: "smooth",
          width: 3,
        },
      },
      earningChartData: [],
      seletedMonth: "jan",
    }
    this.onGetEarningChartsData = this.onGetEarningChartsData.bind(this)
  }

  componentDidMount() {}

  onGetEarningChartsData(month) {
    create
      .get(
        process.env.REACT_APP_BASEURL +
          "admin/getMonthlyData?access_token=" +
          localStorage.getItem("adminToken") +
          "&month=" +
          month
      )
      .then(res => {
        console.log(res.data)
        this.setState({
          series: [
            {
              name: "Orders",
              data: res.data,
            },
          ],
        })
      })
  }
  render() {
    const { earningChartData, seletedMonth } = this.state

    const series = [
      {
        name: "Series 1",
        data: [...earningChartData],
      },
    ]
    return (
      <React.Fragment>
        <Col xl="8">
          <Card>
            <CardBody>
              <div className="clearfix">
                <div className="float-end">
                  <div className="input-group input-group">
                    <select
                      value={seletedMonth}
                      onChange={e => {
                        this.onGetEarningChartsData(e.target.value)
                      }}
                      className="form-select form-select-sm"
                    >
                      <option value="01">Jan</option>
                      <option value="02">Feb</option>
                      <option value="03">Mar</option>
                      <option value="04">Apr</option>
                      <option value="05">May</option>
                      <option value="06">Jun</option>
                      <option value="07">Jul</option>
                      <option value="08">Aug</option>
                      <option value="09">Sep</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </select>
                    <label className="input-group-text">Month</label>
                  </div>
                </div>
                <h4 className="card-title mb-4">Earning</h4>
              </div>

              <Row>
                <Col lg="4">
                  <div className="text-muted">
                    <div className="mb-4">
                      <p>This month</p>
                      <h4>₦{this.state.mdata.me}</h4>
                      <div>
                        <span className="badge badge-soft-success font-size-12 me-1">
                          {" "}
                          {this.state.mdata.lme}%{" "}
                        </span>{" "}
                        From previous period
                      </div>
                    </div>

                    <div>
                      <Link
                        to="/admin/orders"
                        className="btn btn-primary btn-sm"
                      >
                        View Details{" "}
                        <i className="mdi mdi-chevron-right ms-1"></i>
                      </Link>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2">Last month</p>
                      <h5>₦{this.state.mdata.lm}</h5>
                    </div>
                  </div>
                </Col>

                <Col lg="8">
                  <div id="line-chart" className="apex-charts" dir="ltr">
                    <ReactApexChart
                      series={this.state.series}
                      options={this.state.options}
                      type="line"
                      height={320}
                      className="apex-charts"
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

Earning.propTypes = {
  earningChartData: PropTypes.any,
  onGetEarningChartsData: PropTypes.func,
}

const mapStateToProps = ({ DashboardSaas }) => ({
  earningChartData: DashboardSaas.earningChartData,
})

const mapDispatchToProps = dispatch => ({
  onGetEarningChartsData: month => dispatch(getEarningChartsData(month)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Earning)
