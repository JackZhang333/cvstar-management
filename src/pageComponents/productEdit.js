import React, { useState,useEffect } from 'react'
import { Form, Input, Select, Button, Drawer, Upload, Row, Col, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import './product-add.css'
const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('你只能上传JPG/PNG格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小需要小于2M')
    }
    return isJpgOrPng && isLt2M
}

export default function ProductEdit(props) {
    
    const [uploadData, setUpload] = useState({
        imageUrl: null,
        loading: false
    })
    const [form] = Form.useForm();
    
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setUpload({
                ...uploadData,
                loading: true
            })
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setUpload({
                    imageUrl,
                    loading: false
                })
            })
        }
    }
    const uploadButton = (
        <div className='upload-content'>
            {uploadData.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
    )
    //关闭侧边弹窗的方法，在点击确定，取消和关闭时调用
    const closeDrawer = ()=>{

        props.setEditVisible({
            product: null,
            visible: false
        })
        
    }
    useEffect(()=>form.resetFields())
    return <div>
        <Drawer
            title='编辑商品'
            width='720px'
            onClose={closeDrawer}
            visible={props.editVisible.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={closeDrawer}
                        style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={closeDrawer}
                        type='primary'>保存</Button>
                </div>
            }
        >
            <Form layout='vertical'
                requiredMark={false}
                form={form}
                initialValues = {props.editVisible.visible?props.editVisible.product:{}}
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
                            style={{ display: 'none' }}
                            name='pic'
                            label='商品图片'
                            rules={[{ required: true, message: '请上传商品图片' }]}
                        >
                            <Input />
                        </Form.Item>
                        <span className="ant-form-item-label">商品图片</span>
                        <Upload
                            name='pic'
                            listType='picture-card'
                            className='pic-upload'
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            action="/api/uploadPic"
                        >
                            {uploadData.imageUrl ? <img src={uploadData.imageUrl} alt='商品图片' style={{ width: '100%' }} /> : uploadButton}
                        </Upload>

                    </Col>
                </Row>
            </Form>
        </Drawer>
    </div>
}