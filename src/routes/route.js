import React from "react"
import PropTypes from "prop-types"
import { Route, Switch, Redirect } from "react-router-dom"

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Switch>
    <Route
      {...rest}
      render={props => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }}
    />
  </Switch>
)

AppRoute.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default AppRoute
