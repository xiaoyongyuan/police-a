import React, { Component } from 'react';
import BreadcrumbCustom from "../BreadcrumbCustom";
import {Select,Form,Table, DatePicker,Input, Row, Col, Button,LocaleProvider,Spin} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
class AlarmList extends Component {

    selectopt = (e) => { //检索
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    estatus: values.estatus,
                    bdate:values.range_picker1&&values.range_picker1.length?values.range_picker1[0].format("YYYY-MM-DD"):"",
                    edate:values.range_picker1&&values.range_picker1.length?values.range_picker1[1].format("YYYY-MM-DD"):"",
                },()=>{
                   console.log('*this.state.estatus*',this.state.estatus);
                   console.log('*range_picker1*',this.state.bdate,this.state.edate);
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (          
         <LocaleProvider locale={zh_CN}>
            <div className="AlarmList">
                <BreadcrumbCustom first="报警管理" second="报警列表" />
                <div className="shange">
                <Row style={{marginBottom:'20px'}}>
                    <Col span={18}>
                    <LocaleProvider locale={zh_CN}>
                        <Form layout="inline"onSubmit={this.selectopt}>
                            <Form.Item
                                label="日期"
                            >
                                {getFieldDecorator('range_picker1')(
                                    <RangePicker placeholder={['开始时间', '结束时间']} />
                                )}
                            </Form.Item>
                            <FormItem label="区域">
                                {getFieldDecorator('estatus', {
                                    initialValue:""
                                })(
                                    <Select style={{ width: 120 }}>
                                        <Option value="">所有</Option>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                )}
                                </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                            </FormItem>
                        </Form>
                        </LocaleProvider>
                    </Col>
                </Row>
              
                </div>
                
            </div>
            </LocaleProvider>
           
        )
    }
}

export default AlarmList=Form.create()(AlarmList);