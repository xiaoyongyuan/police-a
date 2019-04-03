import React, { Component} from 'react';
import {Form, Input, Row, Col, Button, Modal, Table, Spin, message,LocaleProvider } from 'antd';
import {post} from "../../axios/tools";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 18 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span:18 },
        sm: { span: 14 },
    },
};
class Adminteam extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            deleteshow:false,
            list:[],
            createinfo:[],
            page:1, //当前页
            loading:true,
        };
    }
    componentWillMount() {
        this.setState({
            zonecode:localStorage.getItem('admincomid'),
            adminuser:JSON.parse(localStorage.getItem('adminuser'))
        });
    }

    componentDidMount() {
        this.getList();
    }
    getList=()=>{
        const datas={
            realname:this.state.realname,
            account:this.state.account,
            pageIndex:this.state.page
        };
        post({url:"/api/usercop/getlist",data:datas},(res)=>{
            if(res.success){
                if(res.data.length>1){
                    this.setState({
                        list:res.data,
                        loading:false
                    })
                }
            }
        })

    };
    showModal=()=>{
        this.setState({
            visible:true
        })
    };
    //新增
    handleCreate=()=>{
        this.props.form.validateFields((err, values) => {
            if(!err){
                post({url:"/api/usercop/add",data:{account:values.phone,zonecode:this.state.zonecode,usertype:this.state.adminuser.usertype}},(res)=>{
                    if(res.success){
                        this.setState({
                            visible:false
                        },()=>{
                            message.success("添加成功！");
                            this.props.form.resetFields();
                            this.getList();
                        });
                    }else{
                        message.error("添加失败");
                    }
                });
            }
        });

    };
    handleCancel=()=>{
        this.props.form.resetFields();
        this.setState({
            visible:false
        });
    };
    //查询
    selectopt = (e) => { //检索
        this.setState({
            loading:true
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    realname:values.realname,
                    account:values.account,
                },()=>{
                    this.getList();
                });
            }
        })
    };
    handleMove=(code)=>{
        this.setState({
            deleteshow:true,
            code:code
        })
    };
    //删除
    deleteOk=()=>{
        const parasDel={
            zonecode:this.state.zonecode,
            account:this.state.code
        };
        if(parasDel){
            post({url:"/api/usercop/del",data:parasDel},(res)=>{
                if(res.success){
                    this.setState({
                        deleteshow:false
                    },()=>{
                        message.success("删除成功！");
                        this.getList();
                    })
                }else{
                    message.error("删除失败");
                }
            });
        }
    };
    deleteCancel=()=>{
        this.setState({
            deleteshow:false
        })
    };
    //分页
    changePage=(page)=>{
        this.setState({
            page: page,
        },()=>{
            this.getList()
        })
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record,index) => (index+1)
            },{
                title: '账号',
                dataIndex: 'account',
                key: 'account',
                render: text => <span>{text}</span>,
            },{
                title: '姓名',
                dataIndex: 'realname',
                key: 'realname',
                render: text => <span>{text}</span>,
            },{
                title: '邮箱',
                dataIndex: 'emailaddress',
                key: 'emailaddress',
                render: text => <span>{text}</span>,
            },{
                title: '身份',
                dataIndex: 'userstatus',
                key: 'userstatus',
                render: text => <span>{text===0?"管理员":"系统使用人员"}</span>,
            },{
                title: '操作',
                key: 'code',
                dataIndex: 'code',
                render: (text,record,index) => {
                    return(
                        <div>
                            <Button style={{display:record.userstatus===0?"none":"block"}} className="deleteBtn" onClick={()=>this.handleMove(record.account)}>删除</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <LocaleProvider>
            <div className="warrper" style={{margin:'20px 20px',minHeight:'600px' }}>
                <div className="shange">
                    <Row className="row-query" style={{ marginBottom:'30px' }}>
                        <Col span={18} className="col-employ-queryinput">
                            <Form layout="inline" onSubmit={this.selectopt}>
                                <FormItem label="姓名">
                                    {getFieldDecorator('realname')(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="账号">
                                    {getFieldDecorator('account')(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="queryBtn">
                                        查询
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={2} style={{textAlign:'right' }}>
                            <Button onClick={this.showModal} className="queryBtn">新增</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={20}>
                            <Spin spinning={this.state.loading} className="spin" size="large" tip="加载中..." >
                               <Table columns={columns} dataSource={this.state.list} bordered rowKey={record =>record.code }
                                      pagination={{hideOnSinglePage:true,pageSize:10,current:this.state.page,onChange:this.changePage}}/>
                            </Spin>
                        </Col>
                    </Row>
                </div>
                <Modal title="新增"
                       okText="确认"
                       cancelText="取消"
                       width={450}
                       visible={this.state.visible}
                       onOk={()=>this.handleCreate()}
                       onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem label="账号" {...formItemLayout}>
                            {getFieldDecorator('phone')(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="提示信息"
                       visible={this.state.deleteshow}
                       onOk={this.deleteOk}
                       width={370}
                       onCancel={this.deleteCancel}
                       okText="确认"
                       cancelText="取消"
                >
                    <p>确认删除吗？</p>
                </Modal>
            </div>
            </LocaleProvider>
        )
    }
}

export default Adminteam=Form.create()(Adminteam);