import React, { Component, Fragment } from "react";
import { Row, Col, Modal } from "antd";
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
  }
  componentDidMount() {
    post({ url: "/api/alarm_cop/getlist_video" }, res => {
      console.log(res);
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
                  <Col span={6} key={index} style={{ padding: "5px" }}>
                    <video
                      src={item.videopath}
                      controls="controls"
                      width="100%"
                      onClick={this.handleModal}
                    />
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
                        src={item.videopath}
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
