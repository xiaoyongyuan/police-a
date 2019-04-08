import React, { Component } from 'react';
import {Timeline, Form, Checkbox, Button, Modal} from 'antd';
import "../../style/sjg/police.css";
import {post} from "../../axios/tools";
import nodata from "../../style/imgs/nodata.png";
class AlarmDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            treatment:[],
            alarmImgType:false,
            alarmVideo:false
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
        if(this.state.id){
            post({url:"/api/alarmhandle_cop/getone",data:{code:this.state.id}},(res)=>{
                if(res.success){
                    this.setState({
                        atime:res.data[0].atime,
                        address:res.data[0].province_name+res.data[0].city_name+res.data[0].county_name+res.data[0].town_name+res.data[0].village_name,
                        adminname:res.data[0].adminname,
                        lastmemo:res.data[0].lastmemo,
                        pic_min:res.data[0].pic_min,
                        videopath:res.data[0].videopath,
                        treatment:res.data.detail,
                        astatus:res.data[0].astatus,
                    });
                }
            })
        }
    };
    onChange=(e)=>{
        console.log(`checked = ${e.target.checked}`);
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
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="AlarmDetail">
                <div className="reportinf">
                    <div className="reportleft">
                        <div className="reportleft_img">
                            <img src={nodata} alt="" />
                        </div>
                        <div className="reportleft_text">
                            报案信息
                        </div>
                    </div>
                    <div className="reportright">
                        <p><span className="fontStyle">报警时间：</span><span>{this.state.atime}</span></p>
                        <p><span className="fontStyle">案发地点：</span><span>{this.state.address}</span></p>
                        <p><span className="fontStyle">报警人：</span><span>{this.state.adminname}</span></p>
                        <p><span className="fontStyle">警情描述：</span><span>{this.state.lastmemo?this.state.lastmemo:"无"}</span></p>
                        <div className="reportImg">
                            <div className="reportImgLeft"><img src={this.state.pic_min} alt="" onClick={()=>this.hanlealarmImg(this.state.pic_min)} /></div>
                            <div className="reportImgRight"><video autoplay="autoplay" loop="loop" src={this.state.videopath} onClick={()=>this.hanlealarmVideo(this.state.videopath)} /></div>
                        </div>
                    </div>
                </div>
                <div className="handle reportinf">
                    <div className="reportleft">
                        <div className="reportleft_img">
                            <img src={nodata} alt="" />
                        </div>
                        <div className="reportleft_text">
                            处理信息
                        </div>
                    </div>
                    <div className="reportright" style={{display:this.state.astatus===3?"none":"inline-block"}}>
                        <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <Form.Item label="警情处理："
                                labelCol={{span: 2}}
                                wrapperCol={{ span: 12}}
                                labelAlign="right"
                            >
                                {getFieldDecorator('userName')(
                                    <span><Checkbox onChange={this.onChange} style={{display:this.state.astatus===1 || this.state.astatus===2?"none":"inline-block"}}>接警</Checkbox><Checkbox onChange={this.onChange}>结束</Checkbox></span>
                                )}
                            </Form.Item>
                            <Form.Item label="案件描述："
                               labelCol={{span: 2}}
                               wrapperCol={{ span: 12}}
                            >
                                {getFieldDecorator('description')(
                                    <span><textarea className="case" placeholder="案件描述..." /></span>
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
                <div className="march reportinf">
                    <div className="reportleft">
                        <div className="reportleft_img">
                            <img src={nodata} alt="" />
                        </div>
                        <div className="reportleft_text">
                            处理进展
                        </div>
                    </div>
                    <div className="reportright polTimeline" style={{paddingLeft:'5%'}}>
                        {
                            this.state.treatment.map((v,i)=>(
                                <Timeline key={i}>
                                    <Timeline.Item>
                                        <div className="linetime">{v.handlemen}&nbsp;&nbsp;{v.createon}</div>
                                        <div className="linetext">{v.memo}</div>
                                    </Timeline.Item>
                                </Timeline>
                            ))
                        }
                    </div>
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
                    <video autoplay="autoplay" controls="controls" loop="loop" src={this.state.pathVideo} className="alarmImgStyle" />
                </Modal>
            </div>
        )
    }
}

export default AlarmDetail=Form.create()(AlarmDetail);