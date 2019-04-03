import React, { Component } from 'react';
import BreadcrumbCustom from "../BreadcrumbCustom";
import {Select,Form, DatePicker, Row, Col, Button,LocaleProvider,Spin, Modal,Icon} from 'antd';
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../../style/sjg/police.css';
import nodata from "../../style/imgs/nodata.png";
import AlarmDetail from "./AlarmDetail";
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
class AlarmList extends Component {
    constructor(props){
        super(props);
        this.state={
            alarmImgType:false,
        };
    }
    componentDidMount() {
        
       
    }
    selectopt = (e) => { //检索
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    estatus: values.estatus,
                    bdate:values.range_picker1&&values.range_picker1.length?values.range_picker1[0].format("YYYY-MM-DD"):"",
                    edate:values.range_picker1&&values.range_picker1.length?values.range_picker1[1].format("YYYY-MM-DD"):"",
                },()=>{
                   console.log('*this.state.estatus*',this.state.estatus);
                   console.log('*range_picker1*',this.state.bdate,this.state.edate);
                })
            }
        })
    }

    //查看报警详情
    alarmImg =()=>{
        this.setState({
            alarmImgType:true,
        })
    }
    handleCancelAlarmImg =()=>{
        this.setState({
            alarmImgType:false
        })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (          
         <LocaleProvider locale={zh_CN}>
            <div className="AlarmList">
                <div className="shange">
                <Row style={{margin:'1%'}}>
                    <Col span={18}>
                    <LocaleProvider locale={zh_CN}>
                        <Form layout="inline"onSubmit={this.selectopt}>
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
                                    <Select style={{ width: 120 }}>
                                        <Option value="">所有</Option>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
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
                
                 <div className="policeboy" >
                 <a href={"#/app/alarm/AlarmDetail?id="+1+"&code="+2} className="underline">
                    <div className="policeyuan">
                        <div>1</div>
                    </div>
                    <div className="policelist"> 
                        <div className="policeline"></div>
                        <div className="policecon">
                            <div className="policeinf">
                                <div className="poltop">
                                    <Row className="pol polone">
                                        <Col span={4}>20190907</Col> 
                                        <Col span={7}>长安区xx路yy店</Col>
                                        <Col span={6}><span><Icon type="user-add" style={{color:"#2980F3"}} /> 报警人：</span><span>张三</span></Col>
                                        <Col span={7}><span><Icon type="phone" style={{color:"#2980F3"}} className="iphone" /> 联系电话：</span><span>13093939203</span></Col>
                                    </Row>
                                    <Row className="pol poltwo">
                                       <Col span={24}><span className="powercolor">警情描述：</span><span>可疑人员在门口转悠，连续三天，疑似踩点。</span> </Col>
                                    </Row>
                                </div>
                                <div className="dashed">
                                    <Row className="pol polone">
                                        <Col span={24}><span className="powercolor">接警人：</span><span>张警官</span></Col>
                                    </Row>
                                    <Row className="pol poltwo">
                                       <Col span={24}><span className="powercolor">最新进展：</span><span>已出警抓获嫌疑人，突审中。</span> </Col>
                                    </Row>
                                </div>
                                  
                            </div>
                            <div className="policeimg">
                               <img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt=""/>
                            </div>
                        </div>
                        
                    </div>
                    </a>
                 </div>
                 <div className="policeboy" >
                 <a href={"#/app/alarm/AlarmDetail?id="+3+"&code="+4} className="underline">
                    <div className="policeyuan">
                        <div>2</div>
                    </div>
                    <div className="policelist"> 
                        <div className="policeline"></div>
                        <div className="policecon">
                            <div className="policeinf">
                                <div className="poltop">
                                    <Row className="pol polone">
                                        <Col span={4}>20190907</Col> 
                                        <Col span={7}>长安区xx路yy店</Col>
                                        <Col span={6}><span><Icon type="user-add" style={{color:"#2980F3"}} /> 报警人：</span><span>张三</span></Col>
                                        <Col span={7}><span><Icon type="phone" style={{color:"#2980F3"}} className="iphone" /> 联系电话：</span><span>13093939203</span></Col>
                                    </Row>
                                    <Row className="pol poltwo">
                                       <Col span={24}><span className="powercolor">警情描述：</span><span>可疑人员在门口转悠，连续三天，疑似踩点。</span> </Col>
                                    </Row>
                                </div>
                                <div className="dashed">
                                    <Row className="pol polone">
                                        <Col span={24}><span className="powercolor">接警人：</span><span>张警官</span></Col>
                                    </Row>
                                    <Row className="pol poltwo">
                                       <Col span={24}><span className="powercolor">最新进展：</span><span>已出警抓获嫌疑人，突审中。</span> </Col>
                                    </Row>
                                </div>
                                  
                            </div>
                            <div className="policeimg">
                               <img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt=""/>
                            </div>
                        </div>
                        
                    </div>
                    </a>
                 </div>
                
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
           
            </LocaleProvider>
           
        )
    }
}

export default AlarmList=Form.create()(AlarmList);