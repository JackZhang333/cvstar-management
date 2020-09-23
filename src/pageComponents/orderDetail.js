import React from 'react';
import { Drawer, Button, Descriptions, Table } from 'antd';

const columns = [
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
        title: '单价',
        dataIndex: 'sPrice',
        key: 'sPrice',
        render:(price)=>{
            return `¥${price}`
        }
    },
    {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
    },{
        title: '总价',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render:(price)=>{
            return `¥${price}`
        }
    },
    
]
const data = [
    {
        key:'1',
        productName:'康师傅红烧牛肉面',
        barCode:'388374623783',
        sPrice:'4.50',
        count:2,
        totalPrice:'9.50'
    },
    {
        key:'2',
        productName:'康师傅红烧牛肉面',
        barCode:'388374623783',
        sPrice:'4.50',
        count:2,
        totalPrice:'9.50'
    },
]
export default function OrderDetail(props) {
    const { detailVisible: { visible, order }, setVisible } = props
    const descriptions = () => {
        if (order) {
            return (
                <Descriptions
                    column={2}
                >
                    <Descriptions.Item label="订单编号">{order.orderCode}</Descriptions.Item>
                    <Descriptions.Item label="交易时间">{order.orderTime}</Descriptions.Item>
                    <Descriptions.Item label="用户账号">{order.phone}</Descriptions.Item>
                    <Descriptions.Item label="成交金额">{order.totalPrice}</Descriptions.Item>
                    <Descriptions.Item label="商品数量">{order.count}</Descriptions.Item>
                    <Descriptions.Item label="毛利">{order.profile}</Descriptions.Item>
                </Descriptions>)
        } else {
            return ''
        }

    }
    return <div>
        <Drawer
            title='订单详情'
            width='720px'
            onClose={() => setVisible(false)}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => setVisible(false)} >关闭</Button>

                </div>
            }
        >
            {descriptions()}
        <div>
            <Table
                columns = {columns}
                dataSource = {data}
            />
        </div>
        </Drawer>
    </div>
}