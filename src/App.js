import React, { Component } from "react";
import { Layout } from "antd";
import SiderCustom from "./components/SiderCustom";
import HeaderCustom from "./components/HeaderCustom";
import { receiveData } from "./action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Routes from "./routes";
// import { ThemePicker } from './components/widget'; //主题色变化

// auth  根据权限取菜单
const { Content } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };
  componentWillMount() {
    const { receiveData } = this.props;
    const user = localStorage.getItem("policeuser");
    if (user && user !== "undefined") {
      //此处判断有没有登录
      user && receiveData(JSON.parse(user), "auth");
    } else {
      this.props.history.push("/login");
    }

    // receiveData({a: 213}, 'auth');
    // fetchData({funcName: 'admin', stateName: 'auth'});
    this.getClientWidth();
    window.onresize = () => {
      this.getClientWidth();
    };
  }
  componentDidMount() {
    // const openNotification = () => {
    //     notification.open({
    //       message: '信息',
    //       description: (
    //           <div>
    //               ssss
    //           </div>
    //       ),
    //       icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
    //       duration: 0,
    //     });
    //     localStorage.setItem('isFirst', JSON.stringify(true));
    // };
    // const isFirst = JSON.parse(localStorage.getItem('isFirst'));
    // !isFirst && openNotification();
  }
  getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const { receiveData } = this.props;
    const clientWidth = window.innerWidth;
    receiveData({ isMobile: clientWidth <= 992 }, "responsive");
  };
  toggle = () => {
    //左侧导航变换效果
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { auth, responsive } = this.props;
    return (
      <Layout>
        <HeaderCustom
          toggle={this.toggle}
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
          collapsed={this.state.collapsed}
          user={auth.data || {}}
        />
        <Content
          className="Layoutcontent"
          style={{ height: "calc(100% - 65px)" }}
        >
          <Layout>
            {!responsive.data.isMobile && (
              <SiderCustom collapsed={this.state.collapsed} />
            )}
            <Content style={{ overflowY: "scroll", flex: "1 1 0" }}>
              <Routes auth={auth} />
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { auth = { data: {} }, responsive = { data: {} } } = state.httpData;
  return { auth, responsive };
};
const mapDispatchToProps = dispatch => ({
  receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
