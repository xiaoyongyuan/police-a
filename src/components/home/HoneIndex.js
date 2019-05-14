import React, { Component } from "react";
import { Icon } from "antd";
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
      statistic: {},
      notfinish: {
        handling: 0,
        unhandle: 0
      }
    };
    this.handalarmclick = this.handalarmclick.bind(this);
    this.cancelAra = this.cancelAra.bind(this);
  }

  componentDidMount() {
    post({ url: "/api/camera_cop/getcount_e" }, res => {
      this.setState(
        {
          statistic: res
        },
        () => {}
      );
    });
    post({ url: "/api/alarmhandle_cop/getnum_notfinish" }, res => {
      if (res.success) this.setState({ notfinish: res.data[0] });
    });
    this.dynamic = setInterval(() => {
      post({ url: "/api/camera_cop/getcount_e" }, res => {
        this.setState({
          statistic: res
        });
      });
      post({ url: "/api/alarmhandle_cop/getnum_notfinish" }, res => {
        this.setState({
          notfinish: res.data[0]
        });
      });
    }, 1000 * 5);
  }
  componentWillUnmount() {
    clearInterval(this.dynamic);
  }
  handalarmclick = () => {
    this.newala.style.bottom = 0;
    this.alarmBtn.style.right = "-150px";
  };
  cancelAra = () => {
    this.newala.style.bottom = "-30%";
    this.alarmBtn.style.right = 0;
  };
  render() {
    const statistic = this.state.statistic;
    var alarmcount = parseInt(
      this.state.notfinish.handling + this.state.notfinish.unhandle
    );

    return (
      <div className="homeIndex">
        <div className="statistic">
          <div className="statcol" style={{ width: "160px", height: "92px" }}>
            <div className="statit">
              <img src={device} alt="" />
            </div>
            <p className="statval" style={{ marginTop: "-8px" }}>
              <span
                className="origdata1"
                style={{ fontSize: "42px", fontWeight: "bold" }}
              >
                {statistic.ecount}
              </span>
              <span className="unit">个设备</span>
            </p>
          </div>
          <div className="statcol" style={{ width: "210px", height: "92px" }}>
            <div className="statit">
              <img src={alarm} alt="" />
            </div>
            <p className="statval" style={{ marginTop: "-8px" }}>
              <span
                className="origdata2"
                style={{ fontSize: "42px", fontWeight: "bold" }}
              >
                {statistic.acount}
              </span>
              <span className="unit">条未处理报警</span>
            </p>
          </div>
          <div className="statcol" style={{ width: "200px", height: "92px" }}>
            <div className="statit">
              <img src={statis} alt="" />
            </div>
            <p className="statval" style={{ marginTop: "-8px" }}>
              <span
                className="origdata3"
                style={{ fontSize: "42px", fontWeight: "bold" }}
              >
                {statistic.onehour}
              </span>
              <span className="unit">起一小时内报警</span>
            </p>
          </div>
        </div>
        <div className="topMap">
          <Map hideNewAla={this.cancelAra} />
        </div>
        <div
          className="newAlarm"
          ref={alarm => {
            this.newala = alarm;
          }}
          style={{
            bottom:
              this.state.notfinish.handling + this.state.notfinish.unhandle > 0
                ? 0
                : "-30%"
          }}
        >
          <div className="newAlarmTit">
            <Icon
              type="fullscreen-exit"
              onClick={this.cancelAra}
              style={{ padding: "4px 10px", fontSize: "16px", float: "right" }}
            />
            <img src={newalarm} alt="" />
            最新警情&nbsp; 未处理：<span>{this.state.notfinish.unhandle}</span>
            &nbsp;条 &nbsp;&nbsp;未结束：
            <span>{this.state.notfinish.handling}</span> 条
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
        <div
          className="alarmBtn"
          style={{
            cursor: "point",
            userSelect: "none"
          }}
          ref={alarmBtn => {
            this.alarmBtn = alarmBtn;
          }}
          onClick={this.handalarmclick}
        >
          <Icon type="fullscreen" style={{ padding: "0 5px" }} />
          最新警情(
          <span className="alarmcount">{alarmcount}</span>)
        </div>
        <button
          onClick={() => {
            window.location.href = "/#/app/alarm/shortvideo";
          }}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            background: "rgba(255,255,255,.9)",
            color: "#001529",
            display: "inline-block",
            border: "1px solid #001529",
            fontWeight: "bold",

            padding: "10px 30px",
            borderRadius: "2px"
          }}
        >
          报警短视频
        </button>
      </div>
    );
  }
}

export default HoneIndex;
