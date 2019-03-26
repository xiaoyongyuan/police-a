import React,{Component} from "react";
import ReactEcharts from 'echarts-for-react';
class IntelligenceStatistics extends Component{
    render() {
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'警情统计',
                    type:'pie',
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:135, name:'视频广告'},
                        {value:154, name:'搜索引擎'}
                    ]
                }
            ]
        };
        return(
            <ReactEcharts
                option={option}
                style={{width:"100%",height:"200px"}}
            />
        )
    }
}
export default IntelligenceStatistics;