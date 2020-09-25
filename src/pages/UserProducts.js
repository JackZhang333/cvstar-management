import React, { Component } from 'react'
import { Form, Input, Select, Button, Table, Tag } from 'antd'
// import defaultPic from '../assets/product-default.png'
import userProducts from '../api/userProducts'

const { Option } = Select;
const columns = [
    {
        title: '图片',
        dataIndex: 'pic',
        key: 'pic',
        width:'100px',
        render: (text) => {
            return <img
                alt='商品图片'
                style={{ with: '80px', height: '80px',overflow:'hidden' }}
                src={text} />
        }
    },
    {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
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
        width: '150px',
    },
    {
        title: '分类',
        dataIndex: 'categary',
        key: 'categary',
        width: '100px',
        render: (text) => {
            return <Tag>
                {text}
            </Tag>
        }
    },
    {
        title: '售价',
        dataIndex: 'price',
        key: 'price',
        width: '100px',
        render:(price)=>`¥${price}`
    },
    {
        title: '进价',
        dataIndex: 'pPrice',
        key: 'pPrice',
        width: '100px',
        render:(price)=>`¥${price}`
    },
    {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
        width: '100px'
    },
    {
        title: '用户',
        dataIndex: 'userName',
        key: 'userName',
    },
]

export default class UserProducts extends Component {
    constructor(props) {
        super()
        this.state = {
            data:[]
        }
        this.fetchedData = []
        this.loadData = () => {
            userProducts.getProducts((data) => {
                    console.log(data)
            //把服务端根据用户map出得空数组去掉，二维数组转换为一维，之后添加上key
            const dropEmptyData = [].concat.apply([],data)
            this.fetchedData = dropEmptyData.map(v=>{
                let {id,...others} = v
                return {...others,key:id}
            })
            this.setState({data:this.fetchedData})
                

            })
            // console.log('数据被重新加载了')
        }
    }
    componentDidMount(){
        this.loadData()
    }
    render() {
        let { phone } = this.props.match.params
        // console.log(props.match.params)
        if (phone === '0') {
            phone = ''
        }
        const formValues = {
            phone: phone || '',
            categary: '全部分类'
        }
        
        const queryData = (values) => {
            console.log(values)
            let { phone, categary } = values;
            if (phone) {
                let result = this.fetchedData.filter(v => v.userName === phone)

                this.setState({data:result})
            }
            if (categary !== '全部分类') {
                let result = this.fetchedData.filter(v => v.categary === categary)
                this.setState({data:result})
            }
            if (!phone && categary === '全部分类') {
                this.setState({data:this.fetchedData})
            }
        }
        return <div>
            <div >
                <Form
                    layout='inline'
                    onFinish={queryData}
                    initialValues={formValues}
                >
                    <Form.Item label="用户账号" name="phone">
                        <Input placeholder="请输入用户账号" allowClear />
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
                            <Option value='休闲小食'>休闲小食</Option>
                            <Option value='方便速食'>方便速食</Option>
                            <Option value='冷藏食品'>冷藏食品</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    scroll={{ y: 'calc(100vh - 400px)', x: '80vw' }}
                />
            </div>
        </div>
    }

}