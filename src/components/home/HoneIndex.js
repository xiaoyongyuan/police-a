import React, { Component } from 'react';
import UserStatistics from "./UserStatistics";
import "../../style/ztt/css/homeIndex.css";
import {Row,Col,Progress} from "antd";
import axios from "axios";

import Map from "./Map";

class HoneIndex extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[
                {name:"雁塔区",number:23},
                {name:"长安区",number:34},
                {name:"莲湖区",number:56},
                {name:"未央区",number:25},
                {name:"灞桥区",number:89},
            ]
        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="homeIndex">
              <div className="homeIndex-left">
                  <div className="leftMap"><Map /></div>
                  <div className="leftNewest">
                      <p className="titleHomeIndex">最新警情</p>
                      <Row>
                          <Col span={6} className="newestAlarm">
                              <div><img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt=""/></div>
                              <p className="newestName">西安理工大</p>
                          </Col>
                          <Col span={6} className="newestAlarm">
                              <div><img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt=""/></div>
                              <p className="newestName">西安理工大</p>
                          </Col>
                          <Col span={6} className="newestAlarm">
                              <div><img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt=""/></div>
                              <p className="newestName">西安理工大</p>
                          </Col>
                          <Col span={6} className="newestAlarm">
                              <div><img src="http://pic01.aokecloud.cn/alarm/1000021/pic/20190325/EFGABC017_20190325170848_640X360.jpg" alt=""/></div>
                              <p className="newestName">西安理工大</p>
                          </Col>
                      </Row>
                  </div>
              </div>
              <div className="homeIndex-right">
                  <div className="rightPolice">
                      <p><span className="policeStatistics">警情统计</span><span className="numberAlarm">共<span>230</span>个</span></p>
                      <div className="garden">
                          {
                              this.state.list.map((v,i)=>(
                                  <div className="details" key={i}><Progress type="circle" percent={v.number} /><div className="detailsName">{v.name}</div></div>
                              ))
                          }
                      </div>
                  </div>
                  <div className="rightUser">
                      <p className="titleHomeIndex">用户统计</p>
                      <div><UserStatistics /></div>
                  </div>
              </div>
            </div>
        )
    }
}

export default HoneIndex;