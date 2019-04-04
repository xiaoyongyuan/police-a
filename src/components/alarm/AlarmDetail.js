import React, { Component } from 'react';
import {Timeline,Button } from 'antd';
import "../../style/sjg/police.css";
import {post} from "../../axios/tools";
import nodata from "../../style/imgs/nodata.png";
class AlarmDetail extends Component {
    componentWillMount() {
        this.setState({
            id:this.props.query.id,
        });
    }
    componentDidMount() {
        post({url:"/api/alarmhandle_cop/getone",data:{code:this.state.id}},(res)=>{
            if(res.success){
                console.log(res.data[0].atime,"000");
              this.setState({
                  atime:res.data[0].atime,
                  address:res.data[0].province_name+res.data[0].city_name+res.data[0].county_name+res.data[0].town_name+res.data[0].village_name,
                  adminname:res.data[0].adminname,
                  lastmemo:res.data[0].lastmemo,
                  pic_min:res.data[0].pic_min,
                  videopath:res.data[0].videopath,
              });
            }
        })
    }

    render() {
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
                            <div className="reportImgLeft"><img src={this.state.pic_min} alt="" /></div>
                            <div className="reportImgRight"><video src={this.state.videopath} autoplay loop controls /></div>
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
                    <div className="reportright">
                        <p><span className="fontStyle">警情处理：</span><Button type="primary">接警</Button><Button type="primary">结束</Button></p>
                        <div>
                            <span className=" floatleft w rig">案件描述：</span>
                            <textarea id="describe" className="describe" placeholder="案件描述..."></textarea>
                        </div>
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
                        <Timeline>
                            <Timeline.Item>
                                <div className="linetime"> 2015-09-01 09:09:23 </div>
                                <div className="linetext"> 犯罪嫌疑人归案，已结案。 </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className="linetime"> 2015-08-30 09:09:23 </div>
                                <div className="linetext"> 接警，张警官负责。 </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className="linetime"> 2015-08-28 09:09:23 </div>
                                <div className="linetext"> 张三报警，楼下有不法分子。 </div>
                            </Timeline.Item>

                        </Timeline>,
                    </div>
                </div>
            </div>
        )
    }
}

export default AlarmDetail;