import React from "react"
import { Redirect } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import MediaVerticals from "../admin-screens/ad-slot/MediaVerticals"
import ServiceProvider from "../admin-screens/ad-slot/ServiceProvider"
import Ads from "../admin-screens/ad-slot/Ads"
import AddAd from "../admin-screens/ad-slot/AddAd"
import EditAd from "../admin-screens/ad-slot/EditAdd"

// front
import HomePage from "../front-screens/Homepage"
import AboutUs from "../front-screens/static-pages/AboutUs"
import Services from "../front-screens/static-pages/Services"
import Partners from "../front-screens/static-pages/Partners"
import Clients from "../front-screens/static-pages/Clients"
import Career from "../front-screens/static-pages/Career"
import Contact from "../front-screens/static-pages/Contact"
import HowtoList from "../front-screens/static-pages/HowtoList"
import Feedback from "../front-screens/static-pages/Feedback"
import Cancellation from "../front-screens/static-pages/Cancellation"
import Privacy from "../front-screens/static-pages/Privacy"
import PlatformPolicy from "../front-screens/static-pages/PlatformPolicy"
import TermsCondition from "../front-screens/static-pages/TermsCondition"
// import CategoryProducts from "../front-screens/product/index"
// import CategoryDetails from "../front-screens/product/EcommerceProductDetail"

//user dashboard
import AdminLogin from "../pages/Authentication/AdminLogin"
import UserHeader from "../front-screens/user-screens/components/pages/Services"
import ListPackages from "../front-screens/user-screens/components/pages/ListPackages"
import CategoryProducts from "../front-screens/user-screens/components/pages/ListServices"
import Profile from "../front-screens/user-screens/components/pages/Profile"
import Cart from "../front-screens/user-screens/components/pages/Cart"
import userOrders from "../front-screens/user-screens/components/pages/userOrders"

const authProtectedRoutes = [
  { path: "/dashboard", exact: true, component: Dashboard },
  { path: "/admin/media-verticals", exact: true, component: MediaVerticals },
  { path: "/admin/service-provider", exact: true, component: ServiceProvider },
  { path: "/admin/ads", exact: true, component: Ads },
  { path: "/admin/add-ad", exact: true, component: AddAd },
  { path: "/admin/edit-ad", exact: true, component: EditAd },

  // this route should be at the end of all other routes
  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", exact: true, component: AdminLogin },
  { path: "/", exact: true, component: HomePage },
  { path: "/about-us", exact: true, component: AboutUs },
  { path: "/services", exact: true, component: Services },
  { path: "/partners", exact: true, component: Partners },
  { path: "/clients", exact: true, component: Clients },
  { path: "/career", exact: true, component: Career },
  { path: "/contact", exact: true, component: Contact },
  { path: "/how-to-list", exact: true, component: HowtoList },
  { path: "/feedback", exact: true, component: Feedback },
  { path: "/cancellation-refund", exact: true, component: Cancellation },
  { path: "/privacy-policy", exact: true, component: Privacy },
  { path: "/platform-policy", exact: true, component: PlatformPolicy },
  { path: "/terms-condition", exact: true, component: TermsCondition },
  { path: "/our-services", exact: true, component: UserHeader },
  { path: "/services/:category", component: ListPackages },
  { path: "/services/:category/:subcategory", component: CategoryProducts },
  { path: "/profile", component: Profile },
  { path: "/cart", component: Cart },
  { path: "/user-orders", component: userOrders },
  // { path: "/:category/:details", component: CategoryDetails },
]

export { authProtectedRoutes, publicRoutes }
