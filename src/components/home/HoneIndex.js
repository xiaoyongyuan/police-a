import React, { Component } from "react";
// import UserStatistics from "./UserStatistics";
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
          statistic: res
        });
    });
    this.dynamic = setInterval(() => {
      post({ url: "/api/camera_cop/getcount_e" }, res => {
        this.setState(
          {
            statistic: res
          });
      });
    }, 1000 * 5);
  }
  componentWillUnmount() {
    clearInterval(this.dynamic);
  }

  render() {
    const statistic = this.state.statistic;
    return (
      <div className="homeIndex">
        <div className="statistic">
          <div className="statcol"  style={{width:'160px',height:"92px"}}>
            <div className="statit">
              <img src={device} alt="" />
            </div>
            <p className="statval" style={{marginTop:'-8px'}}>
              <span className="origdata1" style={{fontSize:'42px',fontWeight:'bold'}}>{statistic.ecount}</span>
              <span className="unit">个设备</span>
            </p>
          </div>
          <div className="statcol"  style={{width:'210px',height:"92px"}}>
            <div className="statit">
              <img src={alarm} alt="" />
            </div>
            <p className="statval" style={{marginTop:'-8px'}}>
              <span className="origdata2" style={{fontSize:'42px',fontWeight:'bold'}}>{statistic.acount}</span>
              <span className="unit">条未处理报警</span>
            </p>
          </div>
          <div className="statcol"  style={{width:'200px',height:"92px"}}>
            <div className="statit">
              <img src={statis} alt="" />
            </div>
            <p className="statval" style={{marginTop:'-8px'}}>
              <span className="origdata3" style={{fontSize:'42px',fontWeight:'bold'}}>{statistic.onehour}</span>
              <span className="unit">起一小时内报警</span>
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
          <div
            style={{
              paddingLeft: "8px",
              boxSizing: "border-box",
              height: "82%",
              paddingBottom: "10px"
            }}
          >
            <AlarmSwiper />
          </div>
        </div>
      </div>
    );
  }
}

export default HoneIndex;
