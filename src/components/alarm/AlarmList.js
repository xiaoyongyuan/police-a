import React, { Component } from 'react';
import {Select,Form, DatePicker, Row, Col, Button,LocaleProvider,Modal,Icon,Pagination} from 'antd';
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import '../../style/sjg/police.css';
import nodata from "../../style/imgs/nodata.png";
import CascaderModule from "../common/CascaderModule";
import AlarmDetail from "./AlarmDetail";
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
var province
class AlarmList extends Component {
    constructor(props){
        super(props);
        this.state= {
            alarmImgType: false,
            callPoliceList: [],
            page:1
        }
    }
    componentDidMount(){
        this.callPolice();
       
    }
    callPolice=()=>{
      post({url:"/api/alarmhandle_cop/getlist",data:{pagesize:3,pageindex:this.state.page}},(res)=>{
          if(res.success){
              this.setState({
                  callPoliceList:res.data,
                  totalcount:res.totalcount
              })
          }
      })
    }
    selectopt = (e) => { //检索
        e.preventDefault();
        province=this.child.formref();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    estatus: values.estatus,
                    bdate:values.range_picker1&&values.range_picker1.length?values.range_picker1[0].format("YYYY-MM-DD"):"",
                    edate:values.range_picker1&&values.range_picker1.length?values.range_picker1[1].format("YYYY-MM-DD"):"",
                })
            }
        })
    };
    onRef = (ref) => {
        this.child = ref
    };
    progress=(astatus)=>{
        if(astatus===0){
            return "已推送未处理";
        }else if(astatus===1){
            return "已接警";
        }else if(astatus===2){
            return "处理中";
        }else if(astatus===3){
            return "已结束";
        }
    };
    handleCancelAlarmImg =()=>{
        this.setState({
            alarmImgType:false
        })
    };
    //分页
    handlepage=(page)=>{
        this.setState({page},()=>{
            this.callPolice();
        })
    };
    handleState=(state,atime,adminname,lastmemo,lastmen)=> {
        if (state === 0) {
            return (
                <div className="dashed">
                    <Row className="pol polone">
                        <Col span={24}><span className="powercolor">已推送</span></Col>
                    </Row>
                    <Row className="pol poltwo">
                        <Col span={24}><span className="powercolor">{atime}</span></Col>
                    </Row>
                </div>
            )
        } else if(state===1) {
            return(
                <div className="dashed">
                    <Row className="pol polone">
                        <Col span={24}><span className="powercolor">接警人：</span>{adminname}</Col>
                    </Row>
                    <Row className="pol poltwo">
                        <Col span={24}><span className="powercolor">最新进展：</span>{lastmemo}&nbsp;&nbsp;{atime}</Col>
                    </Row>
                </div>
            )
        }else if(state===2){
            return(
                <div className="dashed">
                    <Row className="pol polone">
                        <Col span={24}><span className="powercolor">处理人：</span>{lastmen}</Col>
                    </Row>
                    <Row className="pol poltwo">
                        <Col span={24}><span className="powercolor">最新进展：</span>{lastmemo}&nbsp;&nbsp;{atime}</Col>
                    </Row>
                </div>
            )
        }else if(state===3){
            return(
                <div className="dashed">
                    <Row className="pol polone">
                        <Col span={24}><span className="powercolor">已结案</span></Col>
                    </Row>
                    <Row className="pol poltwo">
                        <Col span={24}><span className="powercolor">{atime}</span></Col>
                    </Row>
                </div>
            )
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="AlarmList">
                <div className="shange">
                <Row style={{margin:'1%'}}>
                    <Col span={18}>
                    <LocaleProvider locale={zh_CN}>
                        <Form layout="inline" onSubmit={this.selectopt}>
                            <Form.Item
                                label="日期"
                            >
                                {getFieldDecorator('range_picker1')(
                                    <RangePicker placeholder={['开始时间', '结束时间']} />
                                )}
                            </Form.Item>
                            <FormItem label="区域">
                                {getFieldDecorator('estatus', {
                                    initialValue:""
                                })(
                                    <CascaderModule onRef={this.onRef} />
                                )}
                                </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                            </FormItem>
                        </Form>
                        </LocaleProvider>
                    </Col>
                </Row>
                </div>
                {
                    this.state.callPoliceList.map((v,i)=>(
                        <div className="policeboy" key={i}>
                            <a href={"#/app/alarm/AlarmDetail?id="+v.code} className="underline">
                                <div className="policeyuan">
                                    <div>{i+1}</div>
                                </div>
                                <div className="policelist">
                                    <div className="policeline"></div>
                                    <div className="policecon">
                                        <div className="policeinf">
                                            <div className="poltop">
                                                <Row className="pol polone">
                                                    <Col span={4}>{v.atime}</Col>
                                                    <Col span={7}>{v.city_name+v.county_name+v.town_name}</Col>
                                                    <Col span={6}><span><Icon type="user-add" style={{color:"#2980F3"}} /> 报警人：</span><span>{v.adminname}</span></Col>
                                                    <Col span={7}><span><Icon type="phone" style={{color:"#2980F3"}} className="iphone" /> 联系电话：</span><span>{v.adminaccount}</span></Col>
                                                </Row>
                                                <Row className="pol poltwo">
                                                    <Col span={24}><span className="powercolor">警情描述：</span><span>{v.lastmemo?v.lastmemo:"无"}</span> </Col>
                                                </Row>
                                            </div>
                                            {this.handleState(v.astatus,v.atime,v.adminname,v.lastmemo,v.lastmen)}
                                        </div>
                                        <div className="policeimg">
                                            <img src={v.pic_min} alt="" />
                                        </div>
                                    </div>

                                </div>
                            </a>
                        </div>
                    ))
                }
                <div className="pagination"><Pagination defaultCurrent={1} current={this.state.page} total={13} onChange={this.handlepage} hideOnSinglePage={true}/></div>
                 <Modal
                    width={1000}
                    title="警情详情"
                    visible={this.state.alarmImgType}
                    onCancel={this.handleCancelAlarmImg}
                    footer={null}
                 >
                    <AlarmDetail visible={this.state.alarmImgType} toson={this.state.toson} />
                 </Modal>

            </div>
        )
    }
}

export default AlarmList=Form.create()(AlarmList);