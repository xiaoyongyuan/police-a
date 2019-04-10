import React, { Component } from "react";
import { post } from "../../axios/tools.js";
import { message } from "antd";
import PropTypes from "prop-types";
import BMap from "BMap";
import pointRed from "../../style/jhy/imgs/point.png";
import pointBlue from "../../style/jhy/imgs/point2.png";
import mapStyle from "../../style/jhy/custom_map_config.json";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerList: [],

      deviceInfo: {}
    };
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  getMarkerList = () => {
    post({ url: "/api/camera_cop/getlist" }, res => {
      this.setState(
        {
          markerList: res.data
        },
        () => {
          console.log(this.state.markerList, "this.state.markerList");
          const _this = this;
          this.initializeMap(_this);
        }
      );
    });
  };
  initializeMap = _this => {
    const routerhistory = this.context.router.history;
    var BMap = window.BMap;

    var map = new BMap.Map("mapContainer"); // 创建Map实例
    var mapStyle = { style: "midnight" };
    map.setMapStyle(mapStyle);
    map.centerAndZoom("西安市雁塔区", 12);
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    // map.setMapStyleV2(mapStyle);
    const getBoundary = () => {
      var bdary = new BMap.Boundary();
      var name = "西安市雁塔区";
      bdary.get(name, function(rs) {
        //获取行政区域
        map.clearOverlays(); //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 2, //设置多边形边线线粗
            strokeColor: "#2eccff", //设置多边形边线颜色
            strokeOpacity: 1, //设置多边形边线透明度0-1
            strokeStyle: "dashed", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
            fillColor: "#2eccff",
            fillOpacity: 0.2
          }); //建立多边形覆盖物
          map.addOverlay(ply); //添加覆盖物
          map.setViewport(ply.getPath()); //调整视野
        }
      });
    };
    getBoundary();
    if (this.state.markerList) {
      this.state.markerList.map((v, i) => {
        var pt = new BMap.Point(v.lng, v.lat);
        if (v.count === "") {
          var myIcon = new BMap.Icon(`${pointBlue}`, new BMap.Size(40, 40));
          var marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
          map.addOverlay(marker);
          marker.addEventListener("click", function() {
            post(
              { url: "/api/camera_cop/getone", data: { code: v.code } },
              res => {
                _this.setState(
                  {
                    deviceInfo: res.data
                  },
                  () => {
                    console.log(
                      _this.state.deviceInfo,
                      "this.state.markerList"
                    );

                    var opts = {
                      width: 300, // 信息窗口宽度
                      height: 70, // 信息窗口高度
                      title: `账号：${
                        _this.state.deviceInfo.adminaccount
                      }&nbsp;&nbsp;用户名：${_this.state.deviceInfo.adminname}`, // 信息窗口标题
                      enableMessage: true, //设置允许信息窗发送短息
                      message: ""
                    };
                    var infoWindow = new BMap.InfoWindow(
                      `地址：${_this.state.deviceInfo.province_name} ${
                        _this.state.deviceInfo.city_name
                      } ${_this.state.deviceInfo.county_name} ${
                        _this.state.deviceInfo.town_name
                      } ${_this.state.deviceInfo.village_name}`,
                      opts
                    ); // 创建信息窗口对象
                    map.openInfoWindow(infoWindow, pt); //开启信息窗口
                  }
                );
              }
            );
          });
        } else if (v.count > 0) {
          var myIcon2 = new BMap.Icon(`${pointRed}`, new BMap.Size(40, 40));
          var marker2 = new BMap.Marker(pt, { icon: myIcon2 }); // 创建标注
          map.addOverlay(marker2);
          marker2.addEventListener("click", function() {
            routerhistory.push(`/app/alarm/AlarmDetail?id=${v.code}`);
          });
        }
      });
    } else {
      message.info("获取设备位置出错");
    }
  };

  componentDidMount() {
    this.getMarkerList();
  }
  render() {
    return <div id="mapContainer" style={{ width: "100%", height: "100%" }} />;
  }
}

export default Map;
