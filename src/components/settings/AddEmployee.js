import React, { Component } from "react";
import { Form, Input } from "antd";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 14 }
  }
};
class AddEmployee extends Component {
  formref = () => {
    //将form传给父组件由父组件控制表单提交
    return this.props.form;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="账号" {...formItemLayout}>
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "请输入账号!" },
                { max: 10, message: "账号至多10位！" },
                { min: 3, message: "账号至少3位！" }
              ]
            })(<Input maxLength={10} />)}
          </FormItem>
          <FormItem label="编号" {...formItemLayout}>
            {getFieldDecorator("bianhao", {
              rules: [
                { required: true, message: "请输入编号!" },
                { max: 10, message: "编号至多10位！" },
                { min: 3, message: "编号至少3位！" }
              ]
            })(<Input maxLength={10} />)}
          </FormItem>
          <FormItem label="姓名" {...formItemLayout}>
            {getFieldDecorator("xingming", {
              rules: [
                { required: true, message: "请输入姓名!" },
                { max: 10, message: "账号至多10位！" },
                { min: 2, message: "账号至少2位！" }
              ]
            })(<Input maxLength={10} />)}
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout}>
            {getFieldDecorator("dianhua", {
              rules: [
                {
                  pattern: new RegExp(
                    "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$|^0\\d{2,3}-?\\d{7,8}$"
                  ),
                  message: "请输正确的联系电话！"
                }
              ]
            })(<Input maxLength={10} />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default (AddEmployee = Form.create()(AddEmployee));
