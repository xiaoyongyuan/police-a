import React, { Component } from "react";
import { post } from "../../axios/tools.js";
import { Link } from "react-router-dom";

class AlarmSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmList: []
    };
  }

  componentDidMount() {
    var Swiper = window.Swiper;
    var mySwiper = new Swiper(".swiper-container", {
      loop: false, //循环
      autoplay: {
        //滑动后继续播放（不写官方默认暂停）
        disableOnInteraction: false
      }, //可选选项，自动滑动
      slidesPerView: 8,
      spaceBetween: 10,
      observer: true,
      observeParents: true,
      observeSlideChildren: true
    });
    post({ url: "/api/alarmhandle_cop/gets_ten" }, res => {
      this.setState(
        {
          alarmList: res.data
        },
        () => {
          console.log(this.state.alarmList, "alarmlist");
        }
      );
    });
  }

  render() {
    const alarmList = this.state.alarmList;
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {alarmList ? (
            alarmList.map((v, i) => (
              <div
                className="swiper-slide"
                key={i}
                style={{ position: "relative" }}
              >
                <img src={v.pic_min} alt="" className="newAlarmImg" />
                <p className="newAlarmTit">
                  {v.location} <br />
                  {v.handletime}
                </p>
                <Link
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    zIndex: "10000",
                    position: "absolute",
                    left: 0,
                    top: 0
                  }}
                  to={{
                    pathname: "/app/alarm/AlarmDetail",
                    search: `?id=${v.code}`
                  }}
                />
              </div>
            ))
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    );
  }
}
export default AlarmSwiper;
