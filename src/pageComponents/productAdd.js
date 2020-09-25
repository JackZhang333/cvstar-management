import React from 'react'
import { Form, Input, Select, Button, Drawer,Row, Col,message} from 'antd'
import CvstarUpload from './cvstarUpload';
import CloudProduct from '../api/cloudProduct'
const { Option } = Select;



export default function ProductAdd(props) {
    const myRef = React.createRef()
    const onFinish =(values)=>{
        CloudProduct.addCloudProduct(values,({code,msg})=>{
            if(code === 1){
                message.success(msg)
                //关闭新增弹窗
                props.setVisible()
            }else {
                message.error('新增商品失败！')
            }
        })
        // console.log(values)
        
    }
    
    return <div>
        <Drawer
            title='新增商品'
            width='720px'
            onClose={() => props.setVisible()}
            visible={props.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => props.setVisible()} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={() =>{ 
                        myRef.current.submit()
                        
                    }
                        } type='primary'>确定新增</Button>
                </div>
            }
        >
            <Form 
            layout='vertical' 
            requiredMark={"optional"}
            onFinish = {onFinish}
            ref = {myRef}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name='barCode'
                            label='商品条码'
                            rules={[{ required: true, message: '请输入商品条码' }]}
                        >
                            <Input placeholder='请扫描或输入商品条码' />
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