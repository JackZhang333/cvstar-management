import React, { useState } from 'react'
import { Form,Input,DatePicker,Button, Table} from 'antd'
import "./user-orders.css"
const {RangePicker} = DatePicker;
const columns = [
    {
        title:'订单编号',
        dataIndex:'orderCode',
        key:'orderCode'
    },
    {
        title:'用户账户',
        dataIndex:'phone',
        key:'phone'
    },
    {
        title:'交易时间',
        dataIndex:'orderTime',
        key:'orderTime'
    },
    {
        title:'金额',
        dataIndex:'totalPrice',
        key:'totalPrice',
        render:price=>{
            return `¥${price}`
        }
    },
    {
        title:'毛利',
        dataIndex:'profile',
        key:'profile',
        render:profile=>{
            return `¥${profile}`
        }
    },
    {
        title:'商品数',
        dataIndex:'count',
        key:'count'
    },
    {
        title:'操作',
        key:'actions',
        render:(text,record)=>{
            return <a href={{javascript:0}}
                onClick = {(e)=>{
                    e.preventDefault();
                    console.log(record.orderCode)
                }}
            >详情</a>
        }
    },
]
const data = [
    {
        key:'1',
        orderCode:'4938239348293',
        phone:'13221038498',
        orderTime:'2020-09-21 14:24',
        totalPrice:'57.50',
        profile:'35.00',
        count:'23',
    },
    {
        key:'2',
        orderCode:'4938239348294',
        phone:'18700441020',
        orderTime:'2020-10-21 14:24',
        totalPrice:'57.50',
        profile:'35.00',
        count:'23',
    },
]
export default function UserOrders(props){
    let {phone} = props.match.params
    // console.log(props.match.params)
    if(phone==='0'){
        phone = ''
    }
    const formValues = {
        phone:phone||'',
        orderCode:''
    }
    const [filtedData,setFilted] = useState(data)

    const queryData = (values)=>{
        const { orderCode, phone, dateRange} = values
        if(orderCode){
            let arr = []
            let result = data.find(v=>v.orderCode === orderCode)
            if(result){
                arr.push(result)
            }
            setFilted(arr)
        }
        if(phone){
            let result = data.filter(v=>v.phone === phone)
            setFilted(result)
        }
        if(dateRange){
            let startDate = new Date(dateRange[0].format('YYYY/MM/DD')).getTime()
            let endDate = new Date(dateRange[1].format('YYYY/MM/DD')).getTime()
            let result = data.filter(v=>{
                let orderTime = new Date(v.orderTime).getTime()
                return (orderTime<=endDate)&&(orderTime>=startDate)
                    
            })
            setFilted(result)
        }
        if(!orderCode&&!phone&&!dateRange){
            setFilted(data)
        }
    }
    return <div>
        <div >
        <Form
            layout = 'inline'
            onFinish = {queryData}
            initialValues = {
                formValues
            }
           >
               <Form.Item label = "订单编号" name = "orderCode">
                   <Input placeholder = "请输入订单编号" allowClear/>
               </Form.Item>
               <Form.Item label = "用户账号" name = "phone">
                   <Input placeholder = "请输入用户账号" allowClear/>
               </Form.Item>
                <Form.Item label = "交易时间" name = "dateRange">
                    <RangePicker />
                </Form.Item>
                <Form.Item>
                    <Button type = "primary" htmlType = "submit">查询</Button>
                </Form.Item>
           </Form>
        </div>
        <div>
        <Table 
            columns = {columns} 
            dataSource = {filtedData}
            scroll = {{y:400,x:'80vw'}}
            />
        </div>
    </div>
}