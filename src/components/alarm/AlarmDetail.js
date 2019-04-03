import React, { Component } from 'react';
import {Timeline } from 'antd';
import "../../style/sjg/police.css";
import nodata from "../../style/imgs/nodata.png";
class AlarmDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    componentWillMount=()=>{
        this.setState({
            id:this.props.query.id,
            code:this.props.query.code
        },()=>{
            console.log('code--->id',this.state.id,this.state.code,this.props.query);
        });
    }
    render() {
        return (
            <div className="AlarmDetail">
               <div className="reportinf">
                  <div className="reportleft"> 
                   <div className="reportleft_img">
                      <img src={nodata} alt=""/>
                   </div>
                   <div className="reportleft_text">
                    报案信息
                   </div>
                  </div>
                  <div className="reportright"> 
                      <div className="report"><span className="rig">报警时间：</span><span className="rigvalue">2019-12-12 09:09:30</span></div>
                      <div className="report"><span className="rig">案发地点：</span><span className="rigvalue">丈八六路西安理工大学科技园北门</span></div>
                      <div className="report"><span className="rig">报警人：</span><span className="rigvalue">张三-138929890</span></div>
                      <div className="report"><span className="rig">警情描述：</span><span className="rigvalue">楼下杨啊龙拿着一把杀猪刀。</span></div>
                      <div className="reportImg">
                          <div className="reportImgLeft"><img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt="" /></div>
                          <div className="reportImgRight"><img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt="" /></div>
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
                      <div className="report"><span className="rig">接警人：</span><span className="rigvalue">张警官</span></div>
                      <div className="report"><span className="rig">日期：</span><span className="rigvalue">2019-4-3</span></div>
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