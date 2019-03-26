import React, { Component } from 'react';
import IntelligenceStatistics from "./IntelligenceStatistics";
import UserStatistics from "./UserStatistics";
import "../../style/ztt/css/homeIndex.css";
import {Row,Col} from "antd";
import Map from "./Map";

class HoneIndex extends Component {
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
                      <p><div>警情统计</div><div>共<span>230</span>个</div></p>
                      <div className="garden">
                          <div className="statistics"><IntelligenceStatistics /></div>
                          <div className="statistics"><IntelligenceStatistics /></div>
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