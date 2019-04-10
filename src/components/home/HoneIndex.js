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
    post({ url: "/api/camera_cop/getcount_e" }, res => {
      this.setState(
        {
          statistic: res.data
        },
        () => {
          console.log(
            "this.statistic--------------------------------",
            this.state.statistic
          );
        }
      );
    });
  }

  render() {
    const statistic = this.state.statistic;
    // const total = alarmStatistics.reduce((inittotal, item) => {
    //   return inittotal + item.count;
    // }, 0);

    return (
      <div className="homeIndex">
        {/* <div className="homeIndex-left"> */}
        <div className="statistic">
          <div className="statcol">
            <div className="statit">
              <img src={device} alt="" />
              设备数
            </div>
            <p className="statval">
              <span className="origdata1">80</span>个
            </p>
          </div>
          <div className="statcol">
            <div className="statit">
              <img src={alarm} alt="" />
              当前报警
            </div>
            <p className="statval">
              <span className="origdata2">41</span>次
            </p>
          </div>
          <div className="statcol">
            <div className="statit">
              <img src={statis} alt="" />
              一小时警情统计
            </div>
            <p className="statval">
              <span className="origdata3">0</span>次
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
        {/* </div> */}

        {/* <div className="homeIndex-right" style={{ boxSing: "border-box" }}>
          <div className="rightPoliceWrap">
            <div className="rightPolice">
              <p className="alarmTit">
                警情统计
                <span className="alarmTitSpan">共{total}条</span>
              </p>
            </div>
            <div className="garden">
              {alarmStatistics.map((v, i) => {
                var perval = v.count / total;
                return (
                  <div className="details" key={i}>
                    <Progress
                      type="circle"
                      percent={perval === 1 ? 100 : perval}
                      width={100}
                      strokeWidth={5}
                      format={() => `${v.count}条`}
                    />
                    <div className="detailsName">{v.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rightDevice">
            <p className="titleHomeIndex">设备统计</p>
            <div className="deviceWrap">
              <UserStatistics
                deviceStatistics={deviceStatistics}
                className="userDevice"
              />
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default HoneIndex;
