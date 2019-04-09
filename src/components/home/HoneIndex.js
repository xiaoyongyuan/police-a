import React, { Component } from "react";
import UserStatistics from "./UserStatistics";
import "../../style/jhy/css/homeIndex.css";
import { Row, Col, Progress, Carousel, message } from "antd";
import { connect } from "react-redux";
import * as homeActions from "../../action/index";
import Map from "./Map";
import AlarmSwiper from "./AlarmSwiper";

class HoneIndex extends Component {
  componentDidMount() {
    const { getDeviceStatistics, getAlarmStatistics } = this.props;
    getDeviceStatistics();
    getAlarmStatistics();
  }

  render() {
    const { alarmStatistics } = this.props;
    const { deviceStatistics } = this.props;
    console.log(deviceStatistics);
    const total = alarmStatistics.reduce((inittotal, item) => {
      return inittotal + item.count;
    }, 0);

    return (
      <div className="homeIndex">
        <div className="homeIndex-left">
          <div className="leftMap" style={{ width: "100%", height: "66%" }}>
            <Map />
          </div>
          <div className="leftNewest" id="leftNewest">
            <p className="titleHomeIndex">最新警情</p>
            <div style={{ paddingLeft: "8px" }}>
              <AlarmSwiper />
            </div>
          </div>
        </div>

        <div className="homeIndex-right" style={{ boxSing: "border-box" }}>
          <div className="rightPoliceWrap">
            <div className="rightPolice">
              <p className="alarmTit">
                警情统计
                <span className="alarmTitSpan">共{total}个</span>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceStatistics: state.homeMoudle.deviceStatistics,
    alarmStatistics: state.homeMoudle.alarmStatistics,
    alarmRecord: state.homeMoudle.alarmRecord
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDeviceStatistics() {
      dispatch(homeActions.getDeviceStatistics());
    },
    getAlarmStatistics() {
      dispatch(homeActions.getAlarmStatistics());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoneIndex);
