import React, { Component } from "react";
import { Timeline, Form, Checkbox, Button, Modal, message } from "antd";
import "../../style/sjg/police.css";
import { post } from "../../axios/tools";
import "../../style/ztt/icon/iconfont.css";
import nodata from "../../style/imgs/nodata.png";
class AlarmDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treatment: [],
      alarmImgType: false,
      alarmVideo: false,
      ifCheck1: false,
      ifCheck2: false,
      nodataImg: false,
      alarmValue: 2 //选择的警情类型
    };
  }
  componentWillMount() {
    this.setState({
      id: this.props.query.id
    });
  }
  componentDidMount() {
    this.getone();
  }
  fun=(e) => {
    var box=document.getElementById('fdj');

			//第一个参数是最外层容器，第二个参数是放大倍数;
			changeBigImg(box,3);

			function changeBigImg(box,num){
					
			var main;//最外层的容器
			var scale;//放大倍数
			var small;//小盒子
			var mask;//跟随鼠标移动的盒子
			var big;//大盒子
			
			scale=parseInt(num);
			if(scale==undefined){
				console.log(scale);
				scale=3;
			}
			
			main=box;
			if(!main){
				return false;
			}
			small=main.getElementsByClassName('small')[0];
			if(!small){
				return false;
			}
			mask=small.getElementsByClassName('mask')[0];
			if(!mask){
				return false;
			}
			//设置mask的大小
			mask.style.width=small.clientWidth/scale+"px";
			mask.style.height=small.clientHeight/scale+"px";		
			var smallImg=small.getElementsByTagName('img')[0].getAttribute('src');
			big=document.createElement('div');
			big.setAttribute('class','big');
			var bigImg=document.createElement('img');
			bigImg.style.width=small.clientWidth*scale+"px";
			bigImg.style.height=small.clientHeight*scale+"px";
			bigImg.setAttribute('src',smallImg);
			big.appendChild(bigImg);
			main.appendChild(big);
			//以上创建了大盒子和里面的图片									
			small.onmousemove=function(e){
				var x=e.pageX-small.offsetLeft-main.offsetLeft;
				var y=e.pageY-small.offsetTop-main.offsetTop;				
				//mask跟随移动,大盒子里面的图跟随移动,并且到达边缘一定距离时保持不动
				mask.style.display="block";
				big.style.display="block";//大盒子出现
				// bigImg;//大图,前面创建的元素				
				//mask一半的宽度，判断是否移动到边缘
				var maskw=mask.clientWidth/2;
				//mask的一半的高度
			 	var maskh=mask.clientHeight/2;
			 	//最值
			 	var maxW=small.clientWidth*(scale-1);//要减去一个显示了部分
			 	var maxH=small.clientHeight*(scale-1);
			 	//大图的偏移值
			 	var bigX;
			 	var bigY;
			 	//mask的left和top值
			 	var maskTop;
			 	var maskLeft;			 	
			 	//left
			 	//是否在左边缘
				if(x<maskw){
					maskLeft=0;
					bigX=0;
				}
				//是否在右边缘
				else if(x>main.clientWidth-maskw){
					maskLeft=small.clientWidth-mask.clientWidth;
					bigX=0-maxW;
				}else{
					maskLeft=x-maskw;
					bigX=-(x-maskw)*scale;
				}
				//top
				//是否在上边缘
				if(y<maskh){
					maskTop=0;
					bigY=0;
				}
				//是否在下边缘
				else if(y>main.clientHeight-maskh){
					maskTop=small.clientHeight-mask.clientHeight;
					bigY=0-maxH;
				}else{
					maskTop=y-maskh;
					bigY=-(y-maskh)*scale;
				}
				bigImg.style.transform="translate("+bigX+"px,"+bigY+"px)";//大图位置
				mask.style.top=maskTop+"px";//mask的位置
				mask.style.left=maskLeft+"px";				
			}
			//移出容器之后隐藏
			small.onmouseleave=function(){
				mask.style.display="none";
				big.style.display="none";
			}			
			}		
}

  getone = () => {
    const _this = this;
    if (this.state.id) {
      post(
        { url: "/api/alarmhandle_cop/getone", data: { code: this.state.id } },
        res => {
          if (res.success) {
            _this.setState({
              oneCode: res.data[0].code,
              atime: res.data[0].atime,
              address: res.data[0].location,
              adminname: res.data[0].adminname,
              memo: res.data[0].memo,
              pic_min: res.data[0].pic_min,
              picpath: res.data[0].picpath,
              videopath: res.data[0].videopath,
              treatment: res.data.detail,
              astatus: res.data[0].astatus,
              adminaccount: res.data[0].adminaccount,
              nodataImg: true,
              ifCheck: false,
              acceptCheck: false
            });
            // 放大镜效果
            // this.fun();   

          } else {
            _this.setState({
              nodataImg: false
            });
          }
        }
      );
    }
  };
  hanlealarmImg = pathImg => {
    if (pathImg) {
      this.setState({
        alarmImgType: true,
        picmin: pathImg
      });
    }
  };
  handleCancelAlarmImg = () => {
    this.setState({
      alarmImgType: false
    });
  };
  hanlealarmVideo = pathVideo => {
    if (pathVideo) {
      this.setState({
        alarmVideo: true,
        pathVideo: pathVideo
      });
    }
  };
  handleCancelAlarmVideo = () => {
    this.setState({
      alarmVideo: false
    });
  };
  progressTemp = (v, i) => {
    switch (v.astatus) {
      case 0:
        return (
          <Timeline key={i}>
            <Timeline.Item>
              <div className="linetime">{v.createon}</div>
              <div className="linetext">
                有新报警，报警人{v.handlemen}.{v.handlememo}
              </div>
            </Timeline.Item>
          </Timeline>
        );
      case 1:
        return (
          <Timeline key={i}>
            <Timeline.Item>
              <div className="linetime">{v.createon}</div>
              <div className="linetext">
                {v.handlemen}接警.{v.handlememo}
              </div>
            </Timeline.Item>
          </Timeline>
        );
      case 2:
        return (
          <Timeline key={i}>
            <Timeline.Item>
              <div className="linetime">{v.createon}</div>
              <div className="linetext">{v.handlememo}</div>
            </Timeline.Item>
          </Timeline>
        );
      case 3:
        return (
          <Timeline key={i}>
            <Timeline.Item>
              <div className="linetime">{v.createon}</div>
              <div className="linetext">
                已结案，操作人{v.handlemen}.{v.handlememo}
              </div>
            </Timeline.Item>
          </Timeline>
        );
      default:
        return "";
    }
  };
  hanleRes = datas => {
    //处理请求
    post({ url: "/api/alarmhandle_cop/alarmhandle", data: datas }, res => {
      if (res.success) {
        message.success("处理成功!");
        this.props.form.resetFields();
        document.getElementById("case").value = "";
        this.setState(
          {
            alarmValue: 2
          },
          () => {
            this.getone();
          }
        );
      } else {
        message.error("处理失败!");
      }
    });
  };
  handleSubmit = e => {
    //处理提交
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.alarmValue === 2 && !values.description)
          return message.warning("请填写内容！");
        if (this.state.astatus === 0 && this.state.alarmValue === 2)
          return message.warning("请选择处理类型");
        const datas = {
          handlememo: values.description ? values.description : "",
          astatus: this.state.alarmValue ? this.state.alarmValue : 2,
          code: this.state.oneCode
        };
        this.hanleRes(datas);
      }
    });
  };
  //接警
  hanleAlarm = (e, value = 2, select, unselect) => {
    //警情状态护理
    this.setState({
      [select]: e.target.checked,
      [unselect]: false,
      alarmValue: e.target.checked ? value : 2
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="AlarmDetail">
        <div
          style={{
            width: "110px",
            height: "auto",
            margin: "20px auto",
            display:
              this.state.id && this.state.nodataImg === false ? "block" : "none"
          }}
        >
          <img src={nodata} style={{ width: "100%", height: "100%" }} alt="" />
        </div>
        <div
          style={{
            display:
              this.state.id && this.state.nodataImg === false ? "none" : "block"
          }}
        >
          <div className="reportinf">
            <div className="reportleft rightImg1">
              <div className="iconfont icon-baoandengji" />
              <div className="reportleft_text">报案信息</div>
            </div>
            <div className="reportright">
              <p>
                <span className="fontStyle">报警时间：</span>
                <span>{this.state.atime}</span>
              </p>
              <p>
                <span className="fontStyle">案发地点：</span>
                <span>{this.state.address}</span>
              </p>
              <p>
                <span className="fontStyle">报警人：</span>
                <span>
                  {this.state.adminname}-{this.state.adminaccount}
                </span>
              </p>
              <p>
                <span className="fontStyle">警情描述：</span>
                <span>{this.state.memo ? this.state.memo : "无"}</span>
              </p>
              <div className="reportImg main" id="fdj">
                <div className="reportImgLeft small">
                   <div className="mask"></div>
                  <img
                    src={this.state.pic_min}
                    alt=""
                    onClick={() => this.hanlealarmImg(this.state.picpath)}
                  />
                </div>
                <div className="reportImgRight">
                  <video
                    autoPlay="autoplay"
                    loop="loop"
                    src={this.state.videopath}
                    onClick={() => this.hanlealarmVideo(this.state.videopath)}
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.astatus === 3 ? null : (
            <div className="handle reportinf">
              <div className="reportleft rightImg2">
                <div className="iconfont icon-chuli" />
                <div className="reportleft_text">处理信息</div>
              </div>
              <div className="reportright">
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <Form.Item
                    label="警情处理："
                    labelCol={{
                      xl: { span: 3 },
                      xxl: { span: 3 }
                    }}
                    wrapperCol={{
                      xl: { span: 12 },
                      xxl: { span: 12 }
                    }}
                    labelAlign="right"
                  >
                    {getFieldDecorator("policeHandling")(
                      <span>
                        <Checkbox
                          onChange={e =>
                            this.hanleAlarm(e, 1, "acceptCheck", "ifCheck")
                          }
                          style={{
                            display:
                              this.state.astatus === 1 ||
                              this.state.astatus === 2
                                ? "none"
                                : "inline-block"
                          }}
                          checked={this.state.acceptCheck}
                        >
                          接警
                        </Checkbox>
                        <Checkbox
                          onChange={e =>
                            this.hanleAlarm(e, 3, "ifCheck", "acceptCheck")
                          }
                          checked={this.state.ifCheck}
                        >
                          结束
                        </Checkbox>
                      </span>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="案件描述："
                    labelCol={{
                      xl: { span: 3 },
                      xxl: { span: 3 }
                    }}
                    wrapperCol={{
                      xl: { span: 12 },
                      xxl: { span: 12 }
                    }}
                  >
                    {getFieldDecorator("description")(
                      <span>
                        <textarea
                          className="case"
                          placeholder="案件描述..."
                          id="case"
                        />
                      </span>
                    )}
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                      处理
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
          <div className="march reportinf">
            <div className="reportleft rightImg3">
              <div className="iconfont icon-jinzhantubiao" />
              <div className="reportleft_text">处理进展</div>
            </div>
            <div
              className="reportright polTimeline"
              style={{ paddingLeft: "5%" }}
            >
              {this.state.treatment.map((v, i) => this.progressTemp(v, i))}
            </div>
          </div>
          <div style={{ width: "73%", textAlign: "center", margin: "20px" }}>
            <Button type="primary">
              <a href="#/app/alarm/AlarmList">返回</a>
            </Button>
          </div>
        </div>
        <Modal
          width={650}
          title="警情详情"
          visible={this.state.alarmImgType}
          onCancel={this.handleCancelAlarmImg}
          footer={null}
        >
          <img src={this.state.picmin} className="alarmImgStyle" alt="" />
        </Modal>
        <Modal
          width={650}
          title="警情详情"
          visible={this.state.alarmVideo}
          onCancel={this.handleCancelAlarmVideo}
          footer={null}
        >
          <video
            autoPlay="autoplay"
            controls="controls"
            loop="loop"
            src={this.state.pathVideo}
            className="alarmImgStyle"
          />
        </Modal>
      </div>
    );
  }
}

export default (AlarmDetail = Form.create()(AlarmDetail));
