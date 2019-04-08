import React, { Component } from "react";
import { post } from "../../axios/tools.js";

// import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

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
      slidesPerView: 4,
      observer: true
    });
    post({ url: "/api/alarmhandle_cop/gets_ten" }, res => {
      this.setState(
        {
          alarmList: res.data
        },
        () => {}
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
              <div className="swiper-slide" key={i}>
                <img src={v.pic_min} alt="" />
                <p className="newAlarmTit">
                  {v.city_name}
                  {v.county_name}
                  {v.town_name}
                </p>
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
