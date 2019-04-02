import React, { Component } from "react";
import { getMarker } from "@/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import BMap from "BMap";
import pointRed from "../../style/jhy/imgs/point.jpg";
import pointBlue from "../../style/jhy/imgs/point2.jpg";

class MapWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapJson: [
        {
          code: 1203,
          lat: 34.335823,
          lng: 109.003382,
          name: "测试账号",
          location: "陕西省西安市",
          addrname: "张三",
          addrtel: 13560790543,
          type: 0
        },
        {
          code: 1203,
          lat: 34.33475,
          lng: 108.926199,
          name: "测试账号",
          location: "陕西省西安市",
          addrname: "张三",
          addrtel: 13560790543,
          type: 1
        },
        {
          code: 1203,
          lat: 34.353587,
          lng: 108.959401,
          name: "测试账号",
          location: "陕西省西安市",
          addrname: "张三",
          addrtel: 13560790543,
          type: 1
        }
      ]
    };
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  initializeMap = () => {
    const routerhistory = this.context.router.history;
    var map = new BMap.Map("mapContainer"); // 创建Map实例
    map.centerAndZoom("西安", 15);
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    this.state.mapJson.forEach((v, i) => {
      if (v.type === 0) {
        var pt = new BMap.Point(v.lng, v.lat);
        var myIcon = new BMap.Icon(`${pointRed}`, new BMap.Size(35, 40));
        var marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        var opts = {
          width: 200, // 信息窗口宽度
          height: 100, // 信息窗口高度
          title: `${v.addrname}`, // 信息窗口标题
          enableMessage: true, //设置允许信息窗发送短息
          message: ""
        };
        var infoWindow = new BMap.InfoWindow(`地址：${v.location}`, opts); // 创建信息窗口对象
        marker.addEventListener("click", function() {
          map.openInfoWindow(infoWindow, pt); //开启信息窗口
        });
        map.addOverlay(marker); // 将标注添加到地图中
      } else if (v.type === 1) {
        var pt2 = new BMap.Point(v.lng, v.lat);
        var myIcon2 = new BMap.Icon(`${pointBlue}`, new BMap.Size(35, 40));
        var marker2 = new BMap.Marker(pt2, { icon: myIcon2 }); // 创建标注
        marker2.addEventListener("click", function() {
          routerhistory.push("/app/alarm/AlarmDetail");
        });
        map.addOverlay(marker2);
      }
    });
  };

  componentDidMount() {
    console.log(this.state.mapJson, "555");
    console.log(this.context.router);
    this.initializeMap();
  }
  render() {
    return <div id="mapContainer" style={{ width: "100%", height: "600px" }} />;
  }
}

const Map = connect()(MapWrap);

export default Map;
