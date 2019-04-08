import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
class UserStatistics extends Component {
  constructor(props) {
    super(props);
    this.myData = {
      data: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.myData.data = nextProps.deviceStatistics;
  }
  render() {
    const color = [
      "#32e3ec",
      "#6df2c5",
      "#3da0ff",
      "#c1f488",
      "#edc552",
      "#f38c2a",
      "#ff6254"
    ];
    var data = [];
    this.myData.data.map((v, i) => {
      data[i] = {
        name: v.county_name,
        value: v.count
      };
    });

    const seriesData = [];
    const seriesData2 = [];

    data.map((item, idx) => {
      seriesData.push({
        name: item.name,
        value: item.value
      });

      seriesData2.push({
        name: item.name,
        value: item.value,
        symbolSize: item.value,
        itemStyle: {
          normal: {
            color: color[idx % 7]
          }
        }
      });
    });

    function roundDatas(num) {
      var datas = [];
      for (var i = 0; i < num; i++) {
        datas.push({
          name: "circle" + i
        });
      }
      return datas;
    }

    const option = {
      color: color,
      animationDurationUpdate: 1500,
      animationEasingUpdate: "quinticInOut",
      roam: false, //鼠标缩放及平移
      focusNodeAdjacency: false, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
      series: [
        {
          name: "",
          type: "pie",
          startAngle: 0,
          hoverAnimation: false,
          radius: ["40%", "40%"],
          center: ["50%", "50%"],
          data: seriesData,
          itemStyle: {
            normal: {
              borderWidth: 5,
              borderColor: "rgba(0,0,0,0)",
              label: {
                show: true,
                color: "#000",
                fontSize: 12,
                //  formatter: '{b}{d}%',
                formatter: function(params) {
                  // console.log(params)
                  return params.name + " " + params.value + "%";
                }
              },
              labelLine: {
                show: true,
                length: 30,
                lineStyle: {
                  type: "dotted"
                }
              }
            }
          }
        },
        {
          type: "graph",
          tooltip: {},
          ribbonType: true,
          layout: "circular",
          hoverAnimation: false,
          width: "40%",
          height: "40%",
          circular: {
            rotateLabel: true
          },
          symbolSize: 5,
          data: roundDatas(20),
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              color: "#264c7f"
            },
            emphasis: {
              label: {
                show: false
              }
            }
          }
        },
        {
          type: "graph",
          tooltip: {},
          ribbonType: true,
          layout: "circular",
          width: "40%",
          height: "40%",

          symbolSize: 30,
          label: {
            normal: {
              show: true
            }
          },
          hoverAnimation: true,
          edgeSymbol: ["circle"],
          edgeSymbolSize: [8, 30],

          itemStyle: {
            normal: {
              label: {
                rotate: true,
                show: true,
                color: "#000",
                fontSize: 12,
                position: ["46", "46"],
                //  formatter: '{b}{d}%',
                formatter: function(params) {
                  // console.log(params)
                  return params.value;
                },
                algin: "center",
                alginArtical: " center"
              },
              borderColor: "#7C9ECD",
              borderWidth: 0
            },
            emphasis: {
              label: {
                rotate: true,
                show: true,
                color: "#000",
                fontSize: 14,
                position: ["46", "46"],
                //  formatter: '{b}{d}%',
                formatter: function(params) {
                  // console.log(params)
                  return params.value;
                },
                algin: "center",
                alginArtical: " center"
              },
              borderColor: "#7C9ECD",
              borderWidth: 0
            }
          },

          data: seriesData2
        }
      ]
    };
    return <ReactEcharts option={option} />;
  }
}
export default UserStatistics;
