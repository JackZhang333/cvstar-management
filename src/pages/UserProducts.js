import React, { useState } from 'react'
import { Form, Input, Select, Button, Table, Tag } from 'antd'
import defaultPic from '../assets/product-default.png'

const { Option } = Select;
const columns = [
    {
        title:'图片',
        dataIndex:'pic',
        key:'pic',
        render:(text)=>{
            return <img
            alt = '商品图片'
            style = {{with:'80px',height:'80px'}}
            src = {text}/>
        }
    },
    {
        title:'商品名称',
        dataIndex:'productName',
        key:'productName',
    },
    {
        title:'商品条码',
        dataIndex:'barCode',
        key:'barCode',
    },
    {
        title:'规格',
        dataIndex:'spec',
        key:'spec',
    },
    {
        title:'分类',
        dataIndex:'categary',
        key:'categary',
        render:(text)=>{
            return <Tag>
                {text}
            </Tag>
        }
    },
    {
        title:'售价',
        dataIndex:'sPrice',
        key:'sPrice',
        width:'100px'
    },
    {
        title:'进价',
        dataIndex:'pPrice',
        key:'pPrice',
        width:'100px'
    },
    {
        title:'库存',
        dataIndex:'stock',
        key:'stock',
        width:'100px'
    },
    {
        title:'用户',
        dataIndex:'phone',
        key:'phone',
    },
]
const data = [
    {
        key:'1',
        pic:defaultPic,
        productName:'康师傅红烧牛肉面',
        spec:'106g/包',
        categary:'方便速食',
        sPrice:'4.50',
        pPrice:'2.50',
        barCode:'2182839384',
        stock:'87',
        phone:'18700441020'
    },
    {
        key:'2',
        pic:defaultPic,
        productName:'哇哈哈矿泉水',
        spec:'550ml/瓶',
        categary:'酒水饮料',
        sPrice:'2.50',
        pPrice:'1.50',
        barCode:'2182839385',
        stock:'87',
        phone:'18700441020'
    },
    {
        key:'3',
        pic:defaultPic,
        productName:'乐事黄瓜味薯片',
        spec:'60g/包',
        categary:'休闲零售',
        sPrice:'2.50',
        pPrice:'0.50',
        barCode:'2182839386',
        stock:'87',
        phone:'18700441020'
    },
    {
        key:'4',
        pic:defaultPic,
        productName:'哇哈哈矿泉水',
        spec:'550ml/瓶',
        categary:'酒水饮料',
        sPrice:'2.50',
        pPrice:'1.50',
        barCode:'2182839387',
        stock:'87',
        phone:'13221089385'
    },
]
export default function UserProducts(props) {
    let {phone} = props.match.params
    // console.log(props.match.params)
    if(phone==='0'){
        phone = ''
    }
    const formValues = {
        phone:phone||'',
        categary:'全部分类'
    }
    const [filtedData,setFilted] = useState(data)
    const queryData = (values)=>{
        let { phone, categary } = values;
        if(phone){
            let result = data.filter(v=>v.phone === phone)
            
            setFilted(result)
        }
        if(categary!=='全部分类'){
            let result = data.filter(v=>v.categary === categary)
            setFilted(result)
        }
        if(!phone&&categary==='全部分类'){
            setFilted(data)
        }
    }
    return <div>
        <div style={{ marginBottom: '20px' }}>
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
                        <Option value='休闲零售'>休闲零售</Option>
                        <Option value='方便速食'>方便速食</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        </div>
        <div>
        <Table
            columns = {columns} 
            dataSource = {filtedData}
            scroll = {{y:'calc(100vh - 400px)',x:'80vw'}}
            />
        </div>
    </div>
}