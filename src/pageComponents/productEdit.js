import React from 'react'
import { Form, Input, Select, Button, Drawer, Row, Col,message } from 'antd'
import CvstarUpload from './cvstarUpload';
import CloudProduct from '../api/cloudProduct'

const { Option } = Select;

export default class ProductEdit extends React.Component {
    constructor(props) {
        super()
        this.myForm = React.createRef();
        
    }
   
    render() {

        //关闭侧边弹窗的方法，在点击确定，取消和关闭时调用
        const closeDrawer = () => {
            // this.myRef.current.resetFields()
            this.props.setEditVisible({
                product: null,
                visible: false
            })

        }
        //提交表单
        const sumbmitHandler = (values) => {
            // console.log(values,this.props.editVisible)
            //调用api修改商品信息
            CloudProduct.editCloudProduct(values,(res)=>{
                const {code,msg}= res
                if(code === 1){
                    message.success(msg)
                    //刷新商品列表
                    this.props.loadData()
                    closeDrawer()
                }else{
                    message.error('修改商品信息失败')
                }
            })
        }
        return <div>
            <Drawer
                title='编辑商品'
                width='720px'
                onClose={closeDrawer}
                visible={this.props.editVisible.visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={closeDrawer}
                            style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={
                            () => {
                                this.myForm.current.submit()
                            }

                        }
                            type='primary'>保存</Button>
                    </div>
                }
            >
                <Form layout='vertical'
                    ref={this.myForm}
                    fields = {this.props.editVisible.product}
                    requiredMark={false}
                    onFinish={sumbmitHandler}
                    // initialValues={this.props.editVisible.visible ? this.props.editVisible.product : {}}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name='barCode'
                                label='商品条码'
                                rules={[{ required: true, message: '请输入商品条码' }]}
                            >
                                <Input placeholder='请扫描或输入商品条码' disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='productName'
                                label='商品名称'
                                rules={[{ required: true, message: '请输入商品名称' }]}
                            >
                                <Input placeholder='请输入商品名称' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name='spec'
                                label='商品规格'
                                rules={[{ required: true, message: '请输入商品规格' }]}
                            >
                                <Input placeholder='请扫描或输入商品规格' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='sPrice'
                                label='售价'
                                rules={[{ required: false, message: '请输入商品售价' }]}
                            >
                                <Input placeholder='请输入商品售价' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name='pPrice'
                                label='进价'
                                rules={[{ required: false, message: '请输入商品进价' }]}
                            >
                                <Input placeholder='请输入商品进价' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='categary'
                                label='分类'
                                rules={[{ required: true, message: '请选择商品分类' }]}
                            >
                                <Select
                                    name="categary"
                                    showSearch
                                    placeholder='请选择分类'
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.indexOf(input) >= 0
                                    }
                                >

                                    <Option value='酒水饮料'>酒水饮料</Option>
                                    <Option value='休闲零售'>休闲零售</Option>
                                    <Option value='方便速食'>方便速食</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name='pic'
                                label='商品图片'
                                rules={[{ required: true, message: '请上传商品图片' }]}
                            >
                                <CvstarUpload />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    }

}