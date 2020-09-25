import React, { Component } from 'react'
import { Form, Input, Select, Button, Table, Tag, Space, Modal, message, } from 'antd'
import defaultPic from '../assets/product-default.png'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import CloudProduct from '../api/cloudProduct'

import ProductAdd from '../pageComponents/productAdd';
import ProductEdit from '../pageComponents/productEdit';

const { Option } = Select;

const data = [
    {
        key: '1',
        pic: defaultPic,
        productName: '康师傅红烧牛肉面',
        spec: '106g/包',
        categary: '方便速食',
        sPrice: '4.50',
        pPrice: '2.50',
        barCode: '2182839384'
    },
    {
        key: '2',
        pic: defaultPic,
        productName: '哇哈哈矿泉水',
        spec: '550ml/瓶',
        categary: '酒水饮料',
        sPrice: '2.50',
        pPrice: '1.50',
        barCode: '2182839385'
    },
    {
        key: '3',
        pic: defaultPic,
        productName: '乐事黄瓜味薯片',
        spec: '60g/包',
        categary: '休闲零售',
        sPrice: '2.50',
        pPrice: '0.50',
        barCode: '2182839386'
    },
    {
        key: '4',
        pic: defaultPic,
        productName: '哇哈哈矿泉水',
        spec: '550ml/瓶',
        categary: '酒水饮料',
        sPrice: '2.50',
        pPrice: '1.50',
        barCode: '2182839387'
    },
]

export default class Products extends Component {
    constructor() {
        super()
        this.state = {
            data,
            addVisible: false,
            editVisible: {
                visible: false,
                product: null,
            }
        }
        this.fethedData = []
        this.loadData = () => {
            CloudProduct.getAllCloudProducts((data)=>{
                let {products} = data
                console.log(products)
                this.fethedData = products.map(v=>{
                    let {id} = v
                    return {...v,key:id}
                })
                this.setState({
                    ...this.state,
                    data:this.fethedData 
                })
            })
        }
    }
    componentDidMount(){
        this.loadData()
    }
    render() {
        const columns = [
            {
                title: '图片',
                dataIndex: 'pic',
                key: 'pic',
                render: (text) => {
                    return <img
                        alt='商品图片'
                        style={{ with: '80px', height: '80px' }}
                        src={text} />
                }
            },
            {
                title: '商品名称',
                dataIndex: 'productName',
                key: 'productName',
            },
            {
                title: '商品条码',
                dataIndex: 'barCode',
                key: 'barCode',
            },
            {
                title: '规格',
                dataIndex: 'spec',
                key: 'spec',
            },
            {
                title: '分类',
                dataIndex: 'categary',
                key: 'categary',
                render: (text) => {
                    return <Tag>
                        {text}
                    </Tag>
                }
            },
            {
                title: '售价',
                dataIndex: 'sPrice',
                key: 'sPrice',
            },
            {
                title: '进价',
                dataIndex: 'pPrice',
                key: 'pPrice',
            },
            {
                title: '操作',
                key: 'actions',
                render: (text, record) => {
                    return <Space>
                        <a href={{ javascript: 0 }} onClick={(e) => {
                            e.preventDefault()
                            this.setState({
                                ...this.state,
                                editVisible:{
                                visible: true,
                                product: record
                            }
                            })
                            console.log(record.barCode)
                        }}>编辑</a>
                        <a href={{ javascript: 0 }} onClick={(e) => {
                            e.preventDefault()
                            Modal.confirm({
                                title: '删除商品',
                                icon: <ExclamationCircleOutlined />,
                                content: `确定要删除商品${record.productName}?`,
                                okText: '删除商品',
                                cancelText: '取消',
                                onOk: () => { message.success('商品删除成功！') }
                            })
                        }}>删除</a>
                    </Space>
                }
            },
        ]
        const queryData = (values) => {
            let { barCode, categary } = values;
            if (barCode) {
                let result =this.fethedData.find(v => v.barCode === barCode)
                let arr = [];
                if (result) {
                    arr.push(result)
                }

                this.setState({...this.state,data:arr})
            }
            if (categary !== '全部分类') {
                let result = this.fethedData.filter(v => v.categary === categary)
                this.setState({...this.state,data:result})
            }
            if (!barCode && categary === '全部分类') {
                this.setState({...this.state,data:this.fethedData})
            }
        }
        return <div>
            <div style={{ marginBotom: '20px' }}>
                <div className='query-panel'>
                    <Form
                        layout='inline'
                        onFinish={queryData}
                        initialValues={
                            { barCode: '', categary: '全部分类' }
                        }
                    >
                        <Form.Item label="商品条码" name="barCode">
                            <Input placeholder="请输入商品条码" allowClear />
                        </Form.Item>
                        <Form.Item label="商品分类" name="categary">
                            <Select
                                name="categary"
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.indexOf(input) >= 0
                                }
                            >
                                <Option value='全部分类'>全部分类</Option>
                                <Option value='酒水饮料'>酒水饮料</Option>
                                <Option value='休闲零售'>休闲零售</Option>
                                <Option value='方便速食'>方便速食</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Form>
                    <ProductAdd visible={this.state.addVisible} setVisible={() => this.setState({ ...this.state, addVisible: false })} />
                    <ProductEdit editVisible={this.state.editVisible} setEditVisible={(obj) => this.setState({ ...this.state, editVisible:obj})} />
                </div>
            </div>
            <Button
                type='primary'
                style={{ marginBottom: '20px' }}
                onClick={() => this.setState({...this.state,addVisible:true})}
            ><PlusOutlined />新增商品</Button>
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    scroll={{ y: 'calc(100vh - 450px)', x: '80vw' }}
                />
            </div>
        </div>
    }
}