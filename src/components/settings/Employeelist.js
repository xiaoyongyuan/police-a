import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Table,
  Spin,
  message,
  LocaleProvider
} from "antd";
import { post } from "../../axios/tools";
import AddEmployee from "./AddEmployee";
const FormItem = Form.Item;
class Adminteam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      deleteshow: false,
      list: [],
      createinfo: [],
      page: 1, //当前页
      loading: true
    };
  }
  componentWillMount() {
    this.setState({
      zonecode: localStorage.getItem("policecomid"),
      adminuser: JSON.parse(localStorage.getItem("policeuser"))
    });
  }

  componentDidMount() {
    this.getList();
  }
  getList = () => {
    const datas = {
      realname: this.state.lookName,
      account: this.state.lookAccount,
      pageIndex: this.state.page
    };
    console.log(datas, this.state.lookName, this.state.lookAccount, "getlist");
    post({ url: "/api/usercop/getlist", data: datas }, res => {
      if (res.success) {
        if (res.data.length >= 1) {
          this.setState({
            list: res.data,
            loading: false
          });
        } else {
          this.setState({
            list: res.data,
            loading: false
          });
        }
      }
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  //新增
  handleCreate = () => {
    const forms = this.formRef.formref();
    forms.validateFields((err, values) => {
      if (!err) {
        const datas = {
          account: values.phone, //账号
          copID: values.bianhao,
          realname: values.xingming,
          linktel: values.dianhua,
          zonecode: this.state.zonecode,
          usertype: this.state.adminuser.usertype
        };
        post({ url: "/api/usercop/add", data: datas }, res => {
          if (res.success) {
            this.setState(
              {
                visible: false
              },
              () => {
                message.success("添加成功！");
                forms.resetFields();
                this.getList();
              }
            );
          } else {
            message.error("添加失败");
          }
        });
      }
    });
  };
  handleCancel = () => {
    const forms = this.formRef.formref();
    forms.resetFields();
    this.setState({
      visible: false
    });
  };
  //查询
  selectopt = e => {
    //检索
    this.setState({
      loading: true
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState(
        {
          lookName: values.realname,
          lookAccount: values.account
        },
        () => {
          this.getList();
        }
      );
    });
  };
  handleMove = code => {
    this.setState({
      deleteshow: true,
      code: code
    });
  };
  //删除
  deleteOk = () => {
    const parasDel = {
      zonecode: this.state.zonecode,
      code: this.state.code,
      ifdel: 1
    };
    if (parasDel) {
      post({ url: "/api/usercop/del", data: parasDel }, res => {
        if (res.success) {
          this.setState(
            {
              deleteshow: false
            },
            () => {
              message.success("删除成功！");
              this.getList();
            }
          );
        } else {
          message.error("删除失败");
        }
      });
    }
  };
  deleteCancel = () => {
    this.setState({
      deleteshow: false
    });
  };
  //分页
  changePage = page => {
    this.setState(
      {
        page: page
      },
      () => {
        this.getList();
      }
    );
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        render: (text, record, index) => index + 1
      },
      {
        title: "账号",
        dataIndex: "account",
        key: "account",
        render: text => <span>{text}</span>
      },
      {
        title: "姓名",
        dataIndex: "realname",
        key: "realname",
        render: text => <span>{text}</span>
      },
      {
        title: "编号",
        dataIndex: "copID",
        key: "copID",
        render: text => <span>{text}</span>
      },
      {
        title: "联系电话",
        dataIndex: "linktel",
        key: "linktel",
        render: text => <span>{text}</span>
      },
      {
        title: "身份",
        dataIndex: "userstatus",
        key: "userstatus",
        render: text => <span>{text === 0 ? "管理员" : "系统使用人员"}</span>
      },
      {
        title: "操作",
        key: "code",
        dataIndex: "code",
        render: (text, record, index) => {
          return (
            <div>
              <Button
                style={{ display: record.userstatus === 0 ? "none" : "block" }}
                className="deleteBtn"
                onClick={() => this.handleMove(record.code)}
              >
                删除
              </Button>
            </div>
          );
        }
      }
    ];
    return (
      <LocaleProvider>
        <div
          className="warrper"
          style={{ margin: "20px 20px", minHeight: "600px" }}
        >
          <div className="shange">
            <Row className="row-query" style={{ marginBottom: "30px" }}>
              <Col span={18} className="col-employ-queryinput">
                <Form layout="inline" onSubmit={this.selectopt}>
                  <FormItem label="姓名">
                    {getFieldDecorator("realname")(<Input />)}
                  </FormItem>
                  <FormItem label="账号">
                    {getFieldDecorator("account")(<Input />)}
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="queryBtn"
                    >
                      查询
                    </Button>
                  </FormItem>
                </Form>
              </Col>
              <Col span={2} style={{ textAlign: "right" }}>
                <Button onClick={this.showModal} className="queryBtn">
                  新增
                </Button>
              </Col>
            </Row>

            <Row>
              <Col span={20}>
                <Spin
                  spinning={this.state.loading}
                  className="spin"
                  size="large"
                  tip="加载中..."
                >
                  <Table
                    columns={columns}
                    dataSource={this.state.list}
                    bordered
                    rowKey={record => record.code}
                    pagination={{
                      hideOnSinglePage: true,
                      pageSize: 10,
                      current: this.state.page,
                      onChange: this.changePage
                    }}
                  />
                </Spin>
              </Col>
            </Row>
          </div>
          <Modal
            title="新增"
            okText="确认"
            cancelText="取消"
            width={450}
            visible={this.state.visible}
            onOk={() => this.handleCreate()}
            onCancel={this.handleCancel}
          >
            <AddEmployee wrappedComponentRef={form => (this.formRef = form)} />
          </Modal>
          <Modal
            title="提示信息"
            visible={this.state.deleteshow}
            onOk={this.deleteOk}
            width={370}
            onCancel={this.deleteCancel}
            okText="确认"
            cancelText="取消"
          >
            <p>确认删除吗？</p>
          </Modal>
        </div>
      </LocaleProvider>
    );
  }
}

export default (Adminteam = Form.create()(Adminteam));
