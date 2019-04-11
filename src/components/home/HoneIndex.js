import React, { Component } from "react";
import UserStatistics from "./UserStatistics";
import { Row, Col, Statistic, Icon, Progress, Carousel, message } from "antd";
import { post } from "../../axios/tools.js";
import Map from "./Map";
import AlarmSwiper from "./AlarmSwiper";
import "../../style/jhy/css/homeIndex.css";
import alarm from "../../style/jhy/imgs/alarm.png";
import device from "../../style/jhy/imgs/device.png";
import statis from "../../style/jhy/imgs/statis.png";
import newalarm from "../../style/jhy/imgs/newalarm.png";

class HoneIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistic: {}
    };
  }

  componentDidMount() {
    this.dynamic = setInterval(() => {
      post({ url: "/api/camera_cop/getcount_e" }, res => {
        this.setState(
          {
            statistic: res
          },
          () => {}
        );
      });
    }, 1000 * 60);
  }
  componentWillUnmount() {
    clearInterval(this.dynamic);
  }

  render() {
    const statistic = this.state.statistic;
    return (
      <div className="homeIndex">
        <div className="statistic">
          <div className="statcol">
            <div className="statit">
              <img src={device} alt="" />
              设备数
            </div>
            <p className="statval">
              <span className="origdata1">{statistic.ecount}</span>个
            </p>
          </div>
          <div className="statcol">
            <div className="statit">
              <img src={alarm} alt="" />
              当前报警
            </div>
            <p className="statval">
              <span className="origdata2">{statistic.acount}</span>次
            </p>
          </div>
          <div className="statcol">
            <div className="statit">
              <img src={statis} alt="" />
              一小时警情统计
            </div>
            <p className="statval">
              <span className="origdata3">{statistic.onehour}</span>次
            </p>
          </div>
        </div>
        <div className="topMap">
          <Map />
        </div>
        <div className="newAlarm">
          <div className="newAlarmTit">
            <img src={newalarm} alt="" />
            最新警情
          </div>
          <div style={{ paddingLeft: "8px" }}>
            <AlarmSwiper />
          </div>
        </div>
      </div>
    );
  }
}

export default HoneIndex;
