/**
 * 头部登录人信息
 */
import React, { Component } from "react";
import { Menu, Icon, Layout } from "antd";
import screenfull from "screenfull";
import icon_admin from "../style/imgs/icon_admin.png";
import icon_user from "../style/imgs/icon_user.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import logo from "../style/jhy/imgs/logo.png";


const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
  state = {
    user: "",
    visible: false
  };
  componentDidMount() {
    const _user = JSON.parse(localStorage.getItem("policeuser"));
    if (!_user) {
      this.props.history.push("/login");
    } else {
      this.setState({
        user: _user
      });
      // this.notify(_user.account);
    }
  }
  screenFull = () => {
    //全屏
    screenfull.toggle();
    this.props.toggle();
  };
  menuClick = e => {
    e.key === "logout" && this.logout();
  };
  logout = () => {
    //退出
    localStorage.removeItem("policeuser");
    localStorage.removeItem("policetoken");
    this.props.history.push("/login");
  };
  popoverHide = () => {
    this.setState({
      visible: false
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  namequf = () => {
    const usertype = this.state.user ? this.state.user.usertype : null;
    if (usertype) {
      switch (usertype) {
        case "0":
          return "公安厅";
        case "1":
          return "公安局";
        case "2":
          return "公安分局";
        default:
          return "";
      }
    }
  };
  notify = account => {
    //消息推送
    window.pushJs
      .init({
        appKey: "7FD0C3504B625DE9219B5808B076D668",
        chanel: "13152426570"
      })
      .connect();
    window.pushJs.onmessage = function(message) {
      console.log("receive:" + message.data);
    };
    window.pushJs.onopen = function() {
      console.log("open");
    };
  };
  render() {
    return (
      <Header
        className="custom-theme header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="logotext" style={{ height: "65px", width: "500px" }}>
          <div style={{ padding: "15px 0 0 15px" }}>
            <img
              src={logo}
              width="33px"
              style={{ verticalAlign: "top" }}
              alt=""
            />
            <span
              style={{
                lineHeight: "35px",
                height: "35px",
                verticalAlign: "top",
                display: "inlineBlock",
                paddingLeft: "12px",
                fontSize: "25px",
                fontFamily: "黑体",
                color: "#fff"
              }}
            >
              {this.state.user ? this.state.user.zonename : null}
              {this.namequf()}
            </span>
          </div>
        </div>
        <Menu
          mode="horizontal"
          style={{ lineHeight: "64px", float: "right" }}
          onClick={this.menuClick}
        >
          <Menu.Item key="full" onClick={this.screenFull}>
            <Icon type="arrows-alt" onClick={this.screenFull} />
          </Menu.Item>
          <SubMenu
            title={
              <span className="avatar">
                <img
                  src={!this.props.user.userstatus ? icon_user : icon_admin}
                  alt="头像"
                />
                <i className="on bottom b-white" />
              </span>
            }
          >
            <MenuItemGroup title="用户中心">
              <Menu.Item key="setting:1">
                你好 - {this.props.user.account}
              </Menu.Item>
              <Menu.Item key="logout">
                <span onClick={this.logout}>退出登录</span>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

const mapStateToProps = state => {
  const { responsive = { data: {} } } = state.httpData;
  return { responsive };
};

export default withRouter(connect(mapStateToProps)(HeaderCustom));
