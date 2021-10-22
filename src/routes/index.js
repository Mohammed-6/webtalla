import React from "react"
import { Redirect } from "react-router-dom"
import Loadable from "react-loadable"

// Dashboard
import Dashboard from "../pages/Dashboard-saas/index"
// user screens
import MediaVerticals from "../admin-screens/ad-slot/MediaVerticals"
import AddUser from "../admin-screens/users/AddUser"
import ListUser from "../admin-screens/users/index"
import EditUser from "../admin-screens/users/EditUser"
import ServiceProvider from "../admin-screens/ad-slot/ServiceProvider"
import Ads from "../admin-screens/ad-slot/Ads"
import AddAd from "../admin-screens/ad-slot/AddAd"
import EditAd from "../admin-screens/ad-slot/EditAdd"
import Calendar from "../admin-screens/calendar/index"
import Chat from "../admin-screens/chat/Chat"
import Invoices from "../admin-screens/invoices/invoices-list"
import Orders from "../admin-screens/invoices/Orders"
import InvoiceDetail from "../admin-screens/invoices/invoices-detail"
import EmailInbox from "../admin-screens/email/email-inbox"
import EmailRead from "../admin-screens/email/email-read"
import ContactsGrid from "../admin-screens/contacts/contacts-grid"
import EditCustomer from "../admin-screens/contacts/ContactList/editCustomer"
import ContactsList from "../admin-screens/contacts/ContactList/contacts-list"
import ContactsProfile from "../admin-screens/contacts/ContactsProfile/contacts-profile"

// front
const HomePageLoadable = Loadable({
  loader: () => import("../front-screens/Homepage"),
  loading: "Loading...",
})

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
import Checkout from "../front-screens/user-screens/components/pages/Checkout"
import userOrders from "../front-screens/user-screens/components/pages/userOrders"

const authProtectedRoutes = [
  { path: "/dashboard", exact: true, component: Dashboard },
  { path: "/admin/edit-user/:id", exact: true, component: EditUser },
  { path: "/admin/add-user", exact: true, component: AddUser },
  { path: "/admin/users", exact: true, component: ListUser },
  { path: "/admin/calendar", exact: true, component: Calendar },
  { path: "/admin/chat", exact: true, component: Chat },
  { path: "/admin/invoices-list", exact: true, component: Invoices },
  { path: "/admin/orders", exact: true, component: Orders },
  { path: "/admin/invoices-detail/:id?", component: InvoiceDetail },
  { path: "/admin/email-inbox", component: EmailInbox },
  { path: "/admin/email-read", component: EmailRead },
  { path: "/admin/contacts-grid", component: ContactsGrid },
  { path: "/admin/contacts-list", component: ContactsList },
  { path: "/admin/customer/edit-customer/:id", component: EditCustomer },
  { path: "/admin/contacts-profile/:id", component: ContactsProfile },
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
  { path: "/", exact: true, component: HomePageLoadable },
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
  // { path: "/services/:category", component: ListPackages },
  { path: "/services/:category/:subcategory", component: CategoryProducts },
  { path: "/profile", component: Profile },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/user-orders", component: userOrders },
  // { path: "/:category/:details", component: CategoryDetails },
]

export { authProtectedRoutes, publicRoutes }
