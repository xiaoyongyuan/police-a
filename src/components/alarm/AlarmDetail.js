import React, { Component } from 'react';
import {Timeline, Form, Checkbox, Button, Modal,message,Input} from 'antd';
import "../../style/sjg/police.css";
import {post} from "../../axios/tools";
import "../../style/ztt/icon/iconfont.css";
import nodata from "../../style/imgs/nodata.png";
class AlarmDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            treatment:[],
            alarmImgType:false,
            alarmVideo:false,
            ifCheck1:false,
            ifCheck2:false,
            nodataImg:false,
            alarmValue:2, //选择的警情类型
        };
    }
    componentWillMount() {
        this.setState({
            id:this.props.query.id,
        });
    }
    componentDidMount() {
        this.getone();
    }
    getone=()=>{
        const _this=this;
        if(this.state.id){

            post({url:"/api/alarmhandle_cop/getone",data:{code:this.state.id}},(res)=>{
                if(res.success){
                    _this.setState({
                        oneCode:res.data[0].code,
                        atime:res.data[0].atime,
                        address:res.data[0].location,
                        adminname:res.data[0].adminname,
                        memo:res.data[0].memo,
                        pic_min:res.data[0].pic_min,
                        picpath:res.data[0].picpath,
                        videopath:res.data[0].videopath,
                        treatment:res.data.detail,
                        astatus:res.data[0].astatus,
                        adminaccount:res.data[0].adminaccount,
                        nodataImg:true,
                        ifCheck:false,
                        acceptCheck:false,
                    });
                }else{
                    _this.setState({
                        nodataImg:false,
                    });
                }
            })
        }
    };
    hanlealarmImg=(pathImg)=>{
        if(pathImg){
            this.setState({
                alarmImgType:true,
                picmin:pathImg
            })
        }
    };
    handleCancelAlarmImg=()=>{
        this.setState({
            alarmImgType:false
        })
    };
    hanlealarmVideo=(pathVideo)=>{
        if(pathVideo){
            this.setState({
                alarmVideo:true,
                pathVideo:pathVideo
            })
        }
    }
    handleCancelAlarmVideo=()=>{
        this.setState({
            alarmVideo:false
        })
    };
    progressTemp=(v,i)=>{
        switch(v.astatus){
            case 0 :
                return (<Timeline key={i}>
                    <Timeline.Item>
                        <div className="linetime">{v.createon}</div>
                        <div className="linetext">有新报警，报警人{v.handlemen}.{v.handlememo}</div>
                    </Timeline.Item>
                </Timeline>);
            case 1 :
                return (<Timeline key={i}>
                    <Timeline.Item>
                        <div className="linetime">{v.createon}</div>
                        <div className="linetext">{v.handlemen}接警.{v.handlememo}</div>
                    </Timeline.Item>
                </Timeline>);
            case 2 :
                return (<Timeline key={i}>
                    <Timeline.Item>
                        <div className="linetime">{v.createon}</div>
                        <div className="linetext">{v.handlememo}</div>
                    </Timeline.Item>
                </Timeline>);
            case 3 :
                return (<Timeline key={i}>
                    <Timeline.Item>
                        <div className="linetime">{v.createon}</div>
                        <div className="linetext">已结案，操作人{v.handlemen}.{v.handlememo}</div>
                    </Timeline.Item>
                </Timeline>)

        }
    };
    hanleRes=(datas)=>{ //处理请求
        post({url:"/api/alarmhandle_cop/alarmhandle",data:datas},(res)=>{
            if(res.success){
                message.success("处理成功!");
                this.props.form.resetFields();
                document.getElementById("case").value="";
                this.setState({
                    alarmValue:2,
                },()=>{
                    this.getone();
                });
            }else{
                message.error("处理失败!");
            }
        })
    };
    handleSubmit=(e)=>{ //处理提交
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                if(this.state.alarmValue==2 && !values.description ) return message.warning("请填写内容！");
                if(this.state.astatus==0 && this.state.alarmValue==2 ) return message.warning("请选择处理类型");
                const datas={
                    handlememo:values.description?values.description:'',
                    astatus:this.state.alarmValue?this.state.alarmValue:2,
                    code:this.state.oneCode
                };
                this.hanleRes(datas);
            }
        })
    };
    //接警
    hanleAlarm=(e,value=2,select,unselect)=>{ //警情状态护理
        this.setState({
            [select]:e.target.checked,
            [unselect]:false,
            alarmValue:e.target.checked?value:2
        })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="AlarmDetail">
                <div style={{width:"110px",height:"auto",margin:"20px auto",display:this.state.id && this.state.nodataImg===false?"block":"none"}}><img src={nodata} style={{width:"100%",height:"100%"}} /></div>
                <div style={{display:this.state.id && this.state.nodataImg===false?"none":"block"}}>
                    <div className="reportinf">
                        <div className="reportleft rightImg1">
                            <div className="iconfont icon-baoandengji" />
                            <div className="reportleft_text">
                                报案信息
                            </div>
                        </div>
                        <div className="reportright">
                            <p><span className="fontStyle">报警时间：</span><span>{this.state.atime}</span></p>
                            <p><span className="fontStyle">案发地点：</span><span>{this.state.address}</span></p>
                            <p><span className="fontStyle">报警人：</span><span>{this.state.adminname}-{this.state.adminaccount}</span></p>
                            <p><span className="fontStyle">警情描述：</span><span>{this.state.memo?this.state.memo:"无"}</span></p>
                            <div className="reportImg">
                                <div className="reportImgLeft"><img src={this.state.pic_min} alt="" onClick={()=>this.hanlealarmImg(this.state.picpath)} /></div>
                                <div className="reportImgRight"><video autoPlay="autoplay" loop="loop" src={this.state.videopath} onClick={()=>this.hanlealarmVideo(this.state.videopath)} /></div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.astatus==3
                            ?null
                            :<div className="handle reportinf">
                                <div className="reportleft rightImg2">
                                    <div className="iconfont icon-chuli" />
                                    <div className="reportleft_text">
                                        处理信息
                                    </div>
                                </div>
                                <div className="reportright">
                                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                                        <Form.Item label="警情处理："
                                                   labelCol={{
                                                       xl:{ span:3 },
                                                       xxl:{ span:2 }
                                                   }}
                                                   wrapperCol={{
                                                       xl:{ span:12 },
                                                       xxl:{ span:12 }
                                                   }}
                                                   labelAlign="right"
                                        >
                                            {getFieldDecorator('policeHandling')(
                                                <span><Checkbox onChange={(e)=>this.hanleAlarm(e,1,'acceptCheck','ifCheck')} style={{display:this.state.astatus===1 || this.state.astatus===2?"none":"inline-block"}} checked={this.state.acceptCheck}>接警</Checkbox><Checkbox onChange={(e)=>this.hanleAlarm(e,3,'ifCheck','acceptCheck')} checked={this.state.ifCheck}>结束</Checkbox></span>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="案件描述："
                                                   labelCol={{
                                                       xl:{ span:3 },
                                                       xxl:{ span:2 }
                                                   }}
                                                   wrapperCol={{
                                                       xl:{ span:12 },
                                                       xxl:{ span:12 }
                                                   }}
                                        >
                                            {getFieldDecorator('description')(
                                                <span><textarea className="case" placeholder="案件描述..." id="case" /></span>
                                            )}
                                        </Form.Item>
                                        <Form.Item
                                            wrapperCol={{ span: 12, offset: 6 }}
                                        >
                                            <Button type="primary" htmlType="submit">处理</Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                    }
                    <div className="march reportinf">
                        <div className="reportleft rightImg3">
                            <div className="iconfont icon-jinzhantubiao" />
                            <div className="reportleft_text">
                                处理进展
                            </div>
                        </div>
                        <div className="reportright polTimeline" style={{paddingLeft:'5%'}}>
                            {this.state.treatment.map((v,i)=>(
                                this.progressTemp(v,i)
                            ))}
                        </div>
                    </div>
                    <div style={{width:"73%",textAlign:"center",margin:"20px"}}><Button type="primary"><a href="#/app/alarm/AlarmList">返回</a></Button></div>
                </div>
                <Modal
                    width={650}
                    title="警情详情"
                    visible={this.state.alarmImgType}
                    onCancel={this.handleCancelAlarmImg}
                    footer={null}
                >
                    <img src={this.state.picmin} className="alarmImgStyle" alt="" />
                </Modal>
                <Modal
                    width={650}
                    title="警情详情"
                    visible={this.state.alarmVideo}
                    onCancel={this.handleCancelAlarmVideo}
                    footer={null}
                >
                    <video autoPlay="autoplay" controls="controls" loop="loop" src={this.state.pathVideo} className="alarmImgStyle" />
                </Modal>
            </div>
        )
    }
}

export default AlarmDetail=Form.create()(AlarmDetail);