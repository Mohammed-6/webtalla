import React, { Component } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/"
import AppRoute from "./routes/route"

// layouts
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import style
import "./assets/css/style.css"

import axios from "axios"
const create = axios.create()

import fakeBackend from "./helpers/AuthType/fakeBackend"

// Activating fake backend
fakeBackend()

import ListPackages from "./front-screens/user-screens/components/pages/ListPackages"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mediaverical: [],
    }
    this.getLayout = this.getLayout.bind(this)
  }
  componentDidMount() {
    create
      .post(process.env.REACT_APP_BASEURL + "basic/vertical_index")
      .then(res => {
        res.data.data.map(itm => {
          var conc = this.state.mediaverical.concat({
            path: "/services/" + this.cleanUrl(itm.vertical_name),
            component: ListPackages,
          })
          this.setState({ mediaverical: conc })
        })
      })
  }
  /**
   * Returns the layout
   */

  cleanUrl = url => {
    return url.replace(/\s+/g, "-").toLowerCase()
  }
  getLayout = () => {
    let layoutCls = VerticalLayout

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  render() {
    const Layout = this.getLayout()

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}
            {this.state.mediaverical.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

App.propTypes = {
  layout: PropTypes.object,
}

export default connect(mapStateToProps, null)(App)
