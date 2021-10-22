import React, { Component } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import { size } from "lodash"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import classnames from "classnames"

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

//Import Images
import images from "../../assets/images"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
  addMessage,
  getChats,
  getContacts,
  getGroups,
  getMessages,
} from "../../store/actions"

import axios from "axios"
const create = axios.create()
import Banner1 from "../../assets/front-assets/images/banner-ads.jpg"
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoomId: 0,
      currentUser: {
        name: localStorage.getItem("auser_name"),
        isActive: true,
      },
      chats: [],
      messages: [],
      notification_Menu: false,
      search_Menu: false,
      settings_Menu: false,
      other_Menu: false,
      activeTab: "1",
      Chat_Box_Username: "Steven Franklin",
      Chat_Box_User_Status: "online",
      Chat_Box_User_isActive: false,
      curMessage: "",
    }
    this.messageBox = null
  }

  componentDidMount() {
    const { onGetChats, onGetGroups, onGetContacts, onGetMessages } = this.props
    const { currentRoomId } = this.state
    onGetChats()
    onGetGroups()
    onGetContacts()
    onGetMessages(currentRoomId)

    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminCustomersChat?access_token=" +
          localStorage.getItem("adminToken")
      )
      .then(res => {
        console.log(res.data)
        this.setState({ chats: res.data })
      })
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messages } = this.props
    if (size(messages) !== size(prevProps.messages)) {
      this.scrollToBottom()
    }
  }

  toggleNotification = () => {
    this.setState(prevState => ({
      notification_Menu: !prevState.notification_Menu,
    }))
  }

  //Toggle Chat Box Menus
  toggleSearch = () => {
    this.setState(prevState => ({
      search_Menu: !prevState.search_Menu,
    }))
  }

  toggleSettings = () => {
    this.setState(prevState => ({
      settings_Menu: !prevState.settings_Menu,
    }))
  }

  toggleOther = () => {
    this.setState(prevState => ({
      other_Menu: !prevState.other_Menu,
    }))
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  //Use For Chat Box
  userChatOpen = (id, name, status, roomId) => {
    this.setState({ Chat_Box_Username: name, currentRoomId: roomId })

    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminGetChat?access_token=" +
          localStorage.getItem("adminToken") +
          "&roomId=" +
          roomId
      )
      .then(res => {
        console.log(res.data)
        this.setState({ messages: res.data })
      })
    // setInterval(() => {
    //   this.loadMessages(roomId)
    // }, 5000)
  }
  loadMessages(roomId) {
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminGetChat?access_token=" +
          localStorage.getItem("adminToken") +
          "&roomId=" +
          roomId
      )
      .then(res => {
        console.log(res.data)
        this.setState({ messages: res.data })
      })
  }
  addMessage = (roomId, sender) => {
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId,
      sender,
      message: this.state.curMessage,
      createdAt: new Date(),
    }
    const formData = new FormData()
    formData.append("message", JSON.stringify(message))
    create
      .post(
        process.env.REACT_APP_BASEURL +
          "admin/adminAddMessage?access_token=" +
          localStorage.getItem("adminToken"),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(res => {
        console.log(res.data)
      })
    this.setState({ curMessage: "" })
    this.loadMessages(roomId)
  }

  scrollToBottom = () => {
    if (this.messageBox) {
      this.messageBox.scrollTop = this.messageBox.scrollHeight + 1000
    }
  }

  onKeyPress = e => {
    const { key, value } = e
    const { currentRoomId, currentUser } = this.state
    if (key === "Enter") {
      this.setState({ curMessage: value })
      this.addMessage(currentRoomId, currentUser.name)
    }
  }

  render() {
    const { groups, contacts, messages } = this.props
    const { currentRoomId, currentUser } = this.state

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Chat | WebTalla</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Skote" breadcrumbItem="Chat" />

            <Row>
              <Col lg="12">
                <div className="d-lg-flex">
                  <div className="chat-leftsidebar me-lg-4">
                    <div className="">
                      <div className="py-4 border-bottom">
                        <div className="d-flex">
                          <div className="align-self-center me-3">
                            <img
                              src={
                                localStorage.getItem("admin_profile")
                                  ? process.env.REACT_APP_BASEURL +
                                    "assets/images/user-profiles/" +
                                    localStorage.getItem("admin_profile")
                                  : images.avatar1
                              }
                              className="avatar-xs rounded-circle"
                              alt=""
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-size-15 mt-0 mb-1">
                              {currentUser.name}
                            </h5>
                            <p className="text-muted mb-0">
                              <i className="mdi mdi-circle text-success align-middle me-1" />
                              Active
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <div className="search-box chat-search-box py-4">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div> */}

                      <div className="chat-leftsidebar-nav">
                        <Nav pills justified>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === "1",
                              })}
                              onClick={() => {
                                this.toggleTab("1")
                              }}
                            >
                              <i className="bx bx-chat font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Chat</span>
                            </NavLink>
                          </NavItem>
                          {/* <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === "2",
                              })}
                              onClick={() => {
                                this.toggleTab("2")
                              }}
                            >
                              <i className="bx bx-group font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Groups</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === "3",
                              })}
                              onClick={() => {
                                this.toggleTab("3")
                              }}
                            >
                              <i className="bx bx-book-content font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">
                                Contacts
                              </span>
                            </NavLink>
                          </NavItem> */}
                        </Nav>
                        <TabContent
                          activeTab={this.state.activeTab}
                          className="py-4"
                        >
                          <TabPane tabId="1">
                            <div>
                              {/* <h5 className="font-size-14 mb-3">Recent</h5> */}
                              <ul className="list-unstyled chat-list">
                                <PerfectScrollbar style={{ height: "410px" }}>
                                  {this.state.chats.map(chat => (
                                    <li
                                      key={chat.id + chat.status}
                                      className={
                                        currentRoomId === chat.roomId
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          this.userChatOpen(
                                            chat.id,
                                            chat.name,
                                            chat.status,
                                            chat.roomId
                                          )
                                        }}
                                      >
                                        <div className="d-flex">
                                          {/* <div className="align-self-center me-3">
                                            <i
                                              className={
                                                chat.status === "online"
                                                  ? "mdi mdi-circle text-success font-size-10"
                                                  : chat.status ===
                                                    "intermediate"
                                                  ? "mdi mdi-circle text-warning font-size-10"
                                                  : "mdi mdi-circle font-size-10"
                                              }
                                            />
                                          </div> */}
                                          <div className="align-self-center me-3">
                                            <img
                                              src={
                                                chat.image === ""
                                                  ? Banner1
                                                  : process.env
                                                      .REACT_APP_BASEURL +
                                                    "assets/images/user-profiles/" +
                                                    chat.image
                                              }
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>

                                          <div className="flex-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-14 mb-1">
                                              {chat.name}
                                            </h5>
                                            <p className="text-truncate mb-0">
                                              {chat.description}
                                            </p>
                                          </div>
                                          <div className="font-size-11">
                                            {chat.time}
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </PerfectScrollbar>
                              </ul>
                            </div>
                          </TabPane>

                          <TabPane tabId="2">
                            <h5 className="font-size-14 mb-3">Group</h5>
                            <ul className="list-unstyled chat-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {groups &&
                                  groups.map(group => (
                                    <li key={"test" + group.image}>
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          this.userChatOpen(
                                            group.id,
                                            group.name,
                                            group.status,
                                            Math.floor(Math.random() * 100)
                                          )
                                        }}
                                      >
                                        <Media className="align-items-center">
                                          <div className="avatar-xs me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {group.image}
                                            </span>
                                          </div>

                                          <Media body>
                                            <h5 className="font-size-14 mb-0">
                                              {group.name}
                                            </h5>
                                          </Media>
                                        </Media>
                                      </Link>
                                    </li>
                                  ))}
                              </PerfectScrollbar>
                            </ul>
                          </TabPane>

                          <TabPane tabId="3">
                            <h5 className="font-size-14 mb-3">Contact</h5>

                            <div>
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {contacts &&
                                  contacts.map(contact => (
                                    <div
                                      key={"test_" + contact.category}
                                      className={
                                        contact.category === "A" ? "" : "mt-4"
                                      }
                                    >
                                      <div className="avatar-xs mb-3">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                          {contact.category}
                                        </span>
                                      </div>

                                      <ul className="list-unstyled chat-list">
                                        {contact.child.map(array => (
                                          <li key={"test" + array.id}>
                                            <Link
                                              to="#"
                                              onClick={() => {
                                                this.userChatOpen(
                                                  array.id,
                                                  array.name,
                                                  array.status,
                                                  Math.floor(
                                                    Math.random() * 100
                                                  )
                                                )
                                              }}
                                            >
                                              <h5 className="font-size-14 mb-0">
                                                {array.name}
                                              </h5>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                              </PerfectScrollbar>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 user-chat">
                    <Card>
                      <div className="p-4 border-bottom ">
                        <Row>
                          <Col md="4" xs="9">
                            <h5 className="font-size-15 mb-1">
                              {this.state.Chat_Box_Username}
                            </h5>

                            {/* <p className="text-muted mb-0">
                              <i
                                className={
                                  this.state.Chat_Box_User_Status === "online"
                                    ? "mdi mdi-circle text-success align-middle me-1"
                                    : this.state.Chat_Box_User_Status ===
                                      "intermediate"
                                    ? "mdi mdi-circle text-warning align-middle me-1"
                                    : "mdi mdi-circle align-middle me-1"
                                }
                              />
                              {this.state.Chat_Box_User_Status}
                            </p> */}
                          </Col>
                          <Col md="8" xs="3">
                            <ul
                              className="list-inline user-chat-nav text-end mb-0"
                              style={{ display: "none" }}
                            >
                              <li className="list-inline-item d-none d-sm-inline-block">
                                <Dropdown
                                  isOpen={this.state.search_Menu}
                                  toggle={this.toggleSearch}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn dropdown-toggle"
                                    tag="button"
                                  >
                                    <i className="bx bx-search-alt-2"></i>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-md dropdown-menu-end">
                                    <Form className="p-3">
                                      <FormGroup className="m-0">
                                        <InputGroup>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
                                            aria-label="Recipient's username"
                                          />
                                          <InputGroupAddon addonType="append">
                                            <Button
                                              color="primary"
                                              type="submit"
                                            >
                                              <i className="mdi mdi-magnify"></i>
                                            </Button>
                                          </InputGroupAddon>
                                        </InputGroup>
                                      </FormGroup>
                                    </Form>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>{" "}
                              <li className="list-inline-item  d-none d-sm-inline-block">
                                <Dropdown
                                  isOpen={this.state.settings_Menu}
                                  toggle={this.toggleSettings}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-cog"></i>
                                  </DropdownToggle>
                                  <DropdownMenu
                                    direction="right"
                                    className="dropdown-menu-end"
                                  >
                                    <DropdownItem href="#">
                                      View Profile
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      Clear chat
                                    </DropdownItem>
                                    <DropdownItem href="#">Muted</DropdownItem>
                                    <DropdownItem href="#">Delete</DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>{" "}
                              <li className="list-inline-item">
                                <Dropdown
                                  isOpen={this.state.other_Menu}
                                  toggle={this.toggleOther}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="#">Action</DropdownItem>
                                    <DropdownItem href="#">
                                      Another Action
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      Something else
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <div className="chat-conversation p-3">
                          <ul className="list-unstyled mb-0">
                            <PerfectScrollbar
                              style={{ height: "486px", minHeight: "486px" }}
                              containerRef={ref => (this.messageBox = ref)}
                            >
                              {/* <li>
                                <div className="chat-day-title">
                                  <span className="title">Today</span>
                                </div>
                              </li> */}
                              {this.state.messages &&
                                this.state.messages.map(message => (
                                  <li
                                    key={"test_k2" + message.id}
                                    className={
                                      message.sender === currentUser.name
                                        ? "right"
                                        : ""
                                    }
                                  >
                                    <div className="conversation-list">
                                      <div className="ctext-wrap">
                                        <div className="conversation-name">
                                          {message.sender}
                                        </div>
                                        <p>{message.message}</p>
                                        <p className="chat-time mb-0">
                                          <i className="bx bx-time-five align-middle me-1" />{" "}
                                          {moment(message.createdAt).format(
                                            "hh:mm"
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </PerfectScrollbar>
                          </ul>
                        </div>
                        <div className="p-3 chat-input-section">
                          <Row>
                            <Col>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  value={this.state.curMessage}
                                  onKeyPress={this.onKeyPress}
                                  onChange={e => {
                                    this.setState({
                                      curMessage: e.target.value,
                                    })
                                  }}
                                  className="form-control chat-input"
                                  placeholder="Enter Message..."
                                />
                              </div>
                            </Col>
                            <Col className="col-auto">
                              <Button
                                type="button"
                                color="primary"
                                onClick={() =>
                                  this.addMessage(
                                    this.state.currentRoomId,
                                    currentUser.name
                                  )
                                }
                                className="btn-rounded chat-send w-md"
                              >
                                <span className="d-none d-sm-inline-block me-2">
                                  Send
                                </span>{" "}
                                <i className="mdi mdi-send"></i>
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
}

const mapStateToProps = ({ chat }) => ({
  chats: chat.chats,
  groups: chat.groups,
  contacts: chat.contacts,
  messages: chat.messages,
})

const mapDispatchToProps = dispatch => ({
  onGetChats: () => dispatch(getChats()),
  onGetGroups: () => dispatch(getGroups()),
  onGetContacts: () => dispatch(getContacts()),
  onGetMessages: roomId => dispatch(getMessages(roomId)),
  onAddMessage: roomId => dispatch(addMessage(roomId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
