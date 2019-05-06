import React, { Component, Fragment } from "react";
import { Row, Col, Modal, Icon } from "antd";
import { post } from "../../axios/tools";
import "../../style/jhy/css/shortVideo.css";

class ShortVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videolist: [],
      visible: false
    };
    this.handleModal = this.handleModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
  }
  componentDidMount() {
    post({ url: "/api/alarm_cop/getlist_video" }, res => {
      console.log(res, "video");
      this.setState(
        {
          videolist: res.data
        },
        () => {}
      );
    });
  }
  handleModal = () => {
    this.setState({
      visible: true
    });
  };
  cancelModal = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div className="shortVideo">
        <Row>
          {this.state.videolist.length > 0
            ? this.state.videolist.map((item, index) => {
                const titdetail = `视频详情 设备名称: ${item.name}`;
                return (
                  <Col
                    span={6}
                    key={item.code.toString()}
                    style={{ padding: "5px", height: "280px" }}
                  >
                    <video
                      src={item.videopath ? item.videopath : null}
                      // onClick={this.handleModal}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="videotit">
                      <p className="elli">{item.location}</p>
                      <p>{item.atime}</p>
                      <Icon
                        type="arrows-alt"
                        className="arrowbtn"
                        style={{
                          padding: "10px",
                          fontSize: "16px"
                        }}
                        onClick={this.handleModal}
                      />
                    </div>
                    <Modal
                      title={titdetail}
                      visible={this.state.visible}
                      footer={null}
                      mask
                      onCancel={this.cancelModal}
                      style={{ height: "40%" }}
                      width="50%"
                      bodyStyle={{ textAlign: "center" }}
                    >
                      <video
                        src={item.videopath ? item.videopath : ""}
                        autoPlay="autoplay"
                        controls="controls"
                        width="90%"
                        style={{ display: "inline-block" }}
                      />
                    </Modal>
                  </Col>
                );
              })
            : null}
        </Row>
      </div>
    );
  }
}

export default ShortVideo;
