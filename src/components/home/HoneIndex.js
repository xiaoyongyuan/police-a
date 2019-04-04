import React, { Component } from "react";
import UserStatistics from "./UserStatistics";
import "../../style/ztt/css/homeIndex.css";
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import { Row, Col, Progress, Carousel, message } from "antd";
import { connect } from "react-redux";
import * as homeActions from "../../action/index";
import Map from "./Map";
// import Swiper from "swiper";

class HoneIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { name: "雁塔区", number: 23 },
        { name: "长安区", number: 34 },
        { name: "莲湖区", number: 56 },
        { name: "未央区", number: 25 },
        { name: "灞桥区", number: 89 }
      ]
    };
  }

  componentDidMount() {
      new Swiper('.leftNewest', {
          autoplay: true,//可选选项，自动滑动
          slidesPerView : 3,
          centeredSlides : true,
      });
      const {
      getMarker,
      getDeviceStatistics,
      getAlarmStatistics,
      getAlarmRecord
    } = this.props;
    getMarker();
    getDeviceStatistics();
    getAlarmStatistics();
    getAlarmRecord();
    // const swiper = new Swiper(".swiperContainer", {
    //   autoplay: true //可选选项，自动滑动
    // });
  }

  render() {
    const { markerList } = this.props;
    const { alarmRecord } = this.props;
    const { alarmStatistics } = this.props;
    const { deviceStatistics } = this.props;

    return (
      <div className="homeIndex">
        <div className="homeIndex-left">
          <div className="leftMap">
            <Map markerList={markerList} />
          </div>
          <div className="leftNewest" id="leftNewest">
              <div className="swiper-container">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide" style={{background:"red"}}>23232</div>
                      <div className="swiper-slide">dfdfdf</div>
                      <div className="swiper-slide">hkjhk</div>
                      <div className="swiper-slide">34323</div>
                      <div className="swiper-slide">fh4545</div>

                  </div>
              </div>
            <p className="titleHomeIndex">最新警情</p>
            <div>
              {alarmRecord.map((item, index) => {
                return (
                  <div key={index} style={{ display: "inline-block" }}>
                    <img src={item.pic_min} alt="" />
                    <p>
                      {item.city_name}
                      {item.county_name}
                      {item.town_name}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* <div>
              2222222222222222222222222222222
              <div className="swiperContainer">
                <div className="swiperWrapper">
                  <div className="swiperSlide">slider1</div>
                  <div className="swiperSlide">slider2</div>
                  <div className="swiperSlide">slider3</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="homeIndex-right">
          <div className="rightPolice">
            <p>
              <div>警情统计</div>
              <div>
                共<span>{alarmStatistics.length}</span>个
              </div>
            </p>
            <div className="garden">
              {alarmStatistics.map((v, i) => (
                <div className="details" key={i}>
                  <Progress
                    type="circle"
                    percent={v.count}
                    width={100}
                    strokeWidth={5}
                  />
                  <div className="detailsName">{v.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rightUser">
            <p className="titleHomeIndex">设备统计</p>
            <div>
              <UserStatistics deviceStatistics={deviceStatistics} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    markerList: state.homeMoudle.markerList,
    deviceStatistics: state.homeMoudle.deviceStatistics,
    alarmStatistics: state.homeMoudle.alarmStatistics,
    alarmRecord: state.homeMoudle.alarmRecord
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMarker() {
      dispatch(homeActions.getMarker());
    },
    getDeviceStatistics() {
      dispatch(homeActions.getDeviceStatistics());
    },
    getAlarmStatistics() {
      dispatch(homeActions.getAlarmStatistics());
    },
    getAlarmRecord() {
      dispatch(homeActions.getAlarmRecord());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoneIndex);
