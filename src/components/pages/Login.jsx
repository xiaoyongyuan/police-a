/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchData, receiveData } from "@/action"; //action->index按需取
import axios from "axios";
import CascaderModule from "../common/CascaderModule";
import "../../style/jhy/css/login.css";
import logo from "../../style/jhy/imgs/logo.png";
import backg from "../../style/jhy/imgs/backg.jpg";
import locat from "../../style/jhy/imgs/locat.png";
import pass from "../../style/jhy/imgs/pass.png";
import user from "../../style/jhy/imgs/user.png";
import formbut from "../../style/jhy/imgs/forbut.png";
import formbacg from "../../style/jhy/imgs/formbacg.png";

const FormItem = Form.Item;
const logincomcode = localStorage.getItem("loginzonecode");
const loginaccount = localStorage.getItem("loginpoliceaccount");

class Login extends React.Component {
  componentWillMount() {
    const { receiveData } = this.props;
    receiveData(null, "auth");
  }
  componentDidMount() {
    this.props.form.setFieldsValue({
      comid: logincomcode && logincomcode != "undefined" ? logincomcode : null,
      account: loginaccount && loginaccount != "undefined" ? loginaccount : null
    });
  }
  componentDidUpdate(prevProps) {
    const { auth: nextAuth = {}, history } = this.props;
    if (nextAuth.data && nextAuth.data.success) {
      localStorage.setItem("loginzonecode", nextAuth.data.data.companycode);
      localStorage.setItem("loginzonecode", nextAuth.data.data.companycode);
      localStorage.setItem(
        "loginname",
        nextAuth.data.data.zonename + this.namequf(nextAuth.data.data.usertype)
      );
      localStorage.setItem("policetoken", nextAuth.data.token);
      localStorage.setItem("policeuser", JSON.stringify(nextAuth.data.data));
      localStorage.setItem("policecomid", nextAuth.data.data.companycode);
      localStorage.setItem("policeaccount", nextAuth.data.data.account);
      history.push("/");
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    //在从此处登录，并记录下来
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //获取到的表单的值values
        const { fetchData } = this.props;
        fetchData({
          funcName: "webapp",
          url: "/login/verify_cop",
          params: values,
          stateName: "auth"
        });
      }
    });
  };
  onRef = ref => {
    this.child = ref;
  };
  namequf = usertype => {
    switch (usertype) {
      case "0":
        return "公安厅";
      case "1":
        return "公安局";
      case "2":
        return "公安分局";
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const loginname = localStorage.getItem("loginname");
    return (
      <div className="loginPage" style={{ background: `url(${backg})` }}>
        <div className="logincaption">{loginname}</div>
        <div className="contwrap">
          <div className="logo">
            <img src={logo} alt="" />
          </div>

          <div
            className="login-form"
            // style={{
            //   background: "url(" + formbacg + ") no-reapt center",
            //   maxWidth: "520px",
            //   height: "440px"
            // }}
            style={{
              background: `url('${formbacg}')  no-repeat center/100% 100%`,
              maxWidth: "520px",
              height: "440px"
            }}
          >
            <Form
              onSubmit={this.handleSubmit}
              style={{ maxWidth: "300px" }}
              className="lgform"
            >
              <FormItem>
                {getFieldDecorator("comid", {
                  rules: [{ required: true, message: "地区编码!" }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="environment"
                        style={{ fontSize: 18, color: "#ffffff" }}
                      />
                    }
                    placeholder="请输入地区编码"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("account", {
                  rules: [{ required: true, message: "请输入用户名!" }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{ fontSize: 18, color: "#ffffff" }}
                      />
                    }
                    placeholder="请输入用户名"
                    style={{ background: "#283a53" }}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码!" }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="lock"
                        style={{ fontSize: 18, color: "#ffffff" }}
                      />
                    }
                    type="password"
                    placeholder="请输入密码"
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="lgbutton"
                  style={{
                    width: "158px",
                    height: "100%",
                    background: `url('${formbut}')  no-repeat center/100% 100%`
                  }}
                >
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <div className="copyright">陕ICP备18019072号-1</div>
      </div>
    );
  }
}

const mapStateToPorps = state => {
  const { auth } = state.httpData;
  return { auth };
};
const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchData, dispatch),
  receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(Form.create()(Login));

//第一个参数输入值，第二个输出。
//使用context取值
