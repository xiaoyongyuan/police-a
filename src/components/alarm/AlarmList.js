import React, { Component } from "react";
import {
  Form,
  DatePicker,
  Row,
  Col,
  Button,
  LocaleProvider,
  Modal,
  Icon,
  Pagination,
  Spin,
   Tabs
} from "antd";
import moment from "moment";
import { post } from "../../axios/tools";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import "../../style/sjg/police.css";
import nodata from "../../style/imgs/nodata.png";
import AlarmDetail from "./AlarmDetail";
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
class AlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmImgType: false,
      callPoliceList: [],
      page: 1,
      spinStyle: true,
      bdate:moment().format('YYYY-MM-DD'),//检索的开始时间
      edate:moment().format('YYYY-MM-DD'),//检索的结束时间
    };
  }
  componentDidMount() {
    this.callPolice();
      this.props.form.setFieldsValue({
          range_picker1:[moment(moment().subtract('days', 6)),moment(moment().format('YYYY-MM-DD'))]
      });
  }
  callPolice = () => {
     let data={
          pagesize: 10,
          pageindex: this.state.page,
          bdate: this.state.bdate,
          edate: this.state.edate,
          handlestatus:this.state.handlestatus
      };
    post({ url: "/api/alarmhandle_cop/getlist", data:data}, res => {
      if (res.success) {
        this.setState({
          callPoliceList: res.data,
          spinStyle: false,
          totalcount: res.totalcount
        });
      }
    });
  };
  selectopt = e => {
    //检索
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState(
          {
            spinStyle: true,
            bdate:
              values.range_picker1 && values.range_picker1.length
                ? values.range_picker1[0].format("YYYY-MM-DD")
                : "",
            edate:
              values.range_picker1 && values.range_picker1.length
                ? values.range_picker1[1].format("YYYY-MM-DD")
                : ""
          },
          () => {
            this.callPolice();
          }
        );
      }
    });
  };
  progress = astatus => {
    if (astatus === 0) {
      return "已推送未处理";
    } else if (astatus === 1) {
      return "已接警";
    } else if (astatus === 2) {
      return "处理中";
    } else if (astatus === 3) {
      return "已结束";
    }
  };
  handleCancelAlarmImg = () => {
    this.setState({
      alarmImgType: false
    });
  };
  //分页
  handlepage = page => {
    this.setState(
      {
        page,
        spinStyle: true
      },
      () => {
        this.callPolice();
      }
    );
  };
  handleState = (state, atime, adminname, lastmemo, lastmen) => {
    if (state === 0) {
      return (
        <div className="dashed">
          <Row className="pol polone">
            <Col span={24}>
              <span className="powercolor">已推送</span>
            </Col>
          </Row>
          <Row className="pol poltwo">
            <Col span={24}>
              <span className="powercolor">{atime}</span>
            </Col>
          </Row>
        </div>
      );
    } else if (state === 1) {
      return (
        <div className="dashed">
          <Row className="pol polone">
            <Col span={24}>
              <span className="powercolor">接警人：</span>
              {adminname}
            </Col>
          </Row>
          <Row className="pol poltwo">
            <Col span={24}>
              <span className="powercolor">最新进展：</span>
              {lastmemo}&nbsp;&nbsp;{atime}
            </Col>
          </Row>
        </div>
      );
    } else if (state === 2) {
      return (
        <div className="dashed">
          <Row className="pol polone">
            <Col span={24}>
              <span className="powercolor">处理人：</span>
              {lastmen}
            </Col>
          </Row>
          <Row className="pol poltwo">
            <Col span={24}>
              <span className="powercolor">最新进展：</span>
              {lastmemo}&nbsp;&nbsp;{atime}
            </Col>
          </Row>
        </div>
      );
    } else if (state === 3) {
      return (
        <div className="dashed">
          <Row className="pol polone">
            <Col span={24}>
              <span className="powercolor">已结案</span>
            </Col>
          </Row>
          <Row className="pol poltwo">
            <Col span={24}>
              <span className="powercolor">{atime}</span>
            </Col>
          </Row>
        </div>
      );
    }
  };
  detail = astatus => {
    if (astatus === 0) {
      return "pushed";
    } else if (astatus === 1) {
      return "caseClosed";
    } else if (astatus === 2) {
      return "alarmReceiver";
    } else if (astatus === 3) {
      return "processing";
    }
  };
  linepolice = astatus => {
    if (astatus === 0) {
      return "pushed policeline";
    } else if (astatus === 1) {
      return "policeline";
    } else if (astatus === 2) {
      return "alarmReceiver policeline";
    } else if (astatus === 3) {
      return "processing policeline";
    }
  };
  //未处理
  untreatedHandle=(status)=>{
        this.setState({
            handlestatus:status,
            page:1,
        },()=>{
            this.callPolice();
        })
  };
    onChange = (date, dateString)=> {
        this.setState({
            bdate:dateString[0],
            edate:dateString[1]
        });
    };
    disabledDate = (current) => {
        // return current > moment().startOf('day') || current > moment().subtract(-1, 'day') ;
        return current > moment().endOf('day');
    };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="AlarmList">
        <div className="shange">
          <Row style={{ margin: "1%" }}>
            <Col span={15}>
              <LocaleProvider locale={zh_CN}>
                <Form layout="inline" onSubmit={this.selectopt}>
                  <Form.Item label="日期">
                    {getFieldDecorator("range_picker1")(
                      <RangePicker placeholder={["开始时间", "结束时间"]}
                                   showTime={{ format: 'HH:00:00' }}
                                   format="YYYY-MM-DD"
                      />
                    )}
                  </Form.Item>
                  <FormItem>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </FormItem>
                </Form>
              </LocaleProvider>
            </Col>
              <Button type="primary" onClick={()=>this.untreatedHandle("")} style={{marginLeft:"1%",border:'none',background:!this.state.handlestatus?'#001529':'#1890ff'}}>全部</Button>
              <Button type="primary" onClick={()=>this.untreatedHandle(1)} style={{border:'none',background:this.state.handlestatus==1?'#001529':'#1890ff'}}>未处理</Button>
              <Button type="primary" onClick={()=>this.untreatedHandle(2)} style={{border:'none',background:this.state.handlestatus==2?'#001529':'#1890ff'}}>处理中</Button>
              <Button type="primary" onClick={()=>this.untreatedHandle(3)} style={{border:'none',background:this.state.handlestatus==3?'#001529':'#1890ff'}}>已结束</Button>
          </Row>
        </div>
        <div style={{ width: "100%", height: "auto", textAlign: "center" }}>
          <img
            src={nodata}
            alt=""
            style={{
              display:
                this.state.callPoliceList.length > 0 ? "none" : "inline-block",
              marginTop: "2%",
              width: "6%"
            }}
          />
        </div>
        <Spin size="large" spinning={this.state.spinStyle}>
          <div>
            {this.state.callPoliceList.map((v, i) => (
              <div className="policeboy" key={i}>
                <a
                  href={"#/app/alarm/AlarmDetail?id=" + v.code}
                  className="underline"
                >
                  <div className="policeyuan">
                    <div className={this.detail(v.astatus)}>{i + 1}</div>
                  </div>
                  <div className="policelist">
                    <div className={this.linepolice(v.astatus)} />
                    <div className="policecon">
                      <div className="policeinf">
                        <div className="poltop">
                          <Row className="pol polone">
                            <Col span={4}>{v.atime}</Col>
                            <Col span={7}>{v.location}</Col>
                            <Col span={6}>
                              <span>
                                <Icon
                                  type="user-add"
                                  style={{ color: "#2980F3" }}
                                />{" "}
                                报警人：
                              </span>
                              <span>{v.adminname}</span>
                            </Col>
                            <Col span={7}>
                              <span>
                                <Icon
                                  type="phone"
                                  style={{ color: "#2980F3" }}
                                  className="iphone"
                                />{" "}
                                联系电话：
                              </span>
                              <span>{v.adminaccount}</span>
                            </Col>
                          </Row>
                          <Row className="pol poltwo">
                            <Col span={24}>
                              <span className="powercolor">警情描述：</span>
                              <span>{v.lastmemo ? v.lastmemo : "无"}</span>{" "}
                            </Col>
                          </Row>
                        </div>
                        {this.handleState(
                          v.astatus,
                          v.atime,
                          v.adminname,
                          v.lastmemo,
                          v.lastmen
                        )}
                      </div>
                      <div className="policeimg">
                        <img src={v.pic_min} alt="" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </Spin>
        <div
          className="pagination"
          style={{ display: this.state.callPoliceList ? "block" : "none" }}
        >
          <Pagination
            defaultCurrent={1}
            current={this.state.page}
            total={this.state.totalcount}
            defaultPageSize={10}
            onChange={this.handlepage}
            hideOnSinglePage={true}
          />
        </div>
        <Modal
          width={1000}
          title="警情详情"
          visible={this.state.alarmImgType}
          onCancel={this.handleCancelAlarmImg}
          footer={null}
        >
          <AlarmDetail
            visible={this.state.alarmImgType}
            toson={this.state.toson}
          />
        </Modal>
      </div>
    );
  }
}

export default (AlarmList = Form.create()(AlarmList));
