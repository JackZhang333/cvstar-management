import React, { Component } from 'react'
import { Form, Input, DatePicker, Button, Table } from 'antd'
import "./user-orders.css"
import OrderDetail from '../pageComponents/orderDetail'
import userOrders from '../api/userOrders'

const { RangePicker } = DatePicker;


export default class UserOrders extends Component {
    constructor(props) {
        super()
        this.state = {
            data:[],
            visible: false,
            order: null
        }
        this.fetchedData = []
        this.loadData = () => {
            userOrders.getUserOrders((data) => {
                //  查看数据结构，并拼接数据显示出来
                // console.log([].concat.apply([],data))
                const orders = [].concat.apply([],data)
                const userOrderDatas = orders.map(v=>{
                    let {orderTime,orderCode,products} = v
                    let key = v.id
                    let phone = v.userName
                    let totalPrice2 = products.reduce((total,v)=>(total+v.totalPrice),0)
                    let totalPrice = parseFloat(totalPrice2).toFixed(2)
                    let profile2 = products.reduce((total,v)=>(total+v.price-v.pPrice),0)
                    let profile = parseFloat(profile2).toFixed(2)
                    let count = products.reduce((total,v)=>(total+v.count),0)
                    return {key,phone,totalPrice,profile,count,orderTime,orderCode,products}
                })
                this.setState({ ...this.state,data: userOrderDatas })
                this.fetchedData = userOrderDatas

            })
            console.log('数据被重新加载了')
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
            orderCode: ''
        }
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'orderCode',
                key: 'orderCode'
            },
            {
                title: '用户账户',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '交易时间',
                dataIndex: 'orderTime',
                key: 'orderTime'
            },
            {
                title: '金额',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                render: price => {
                    return `¥${price}`
                }
            },
            {
                title: '毛利',
                dataIndex: 'profile',
                key: 'profile',
                render: profile => {
                    return `¥${profile}`
                }
            },
            {
                title: '商品数',
                dataIndex: 'count',
                key: 'count'
            },
            {
                title: '操作',
                key: 'actions',
                render: (text, record) => {
                    return <a href={{ javascript: 0 }}
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({ ...this.state,visible: true, order: record })
                            console.log(record.orderCode)
                        }}
                    >详情</a>
                }
            },
        ]
        const queryData = (values) => {
            const { orderCode, phone, dateRange } = values
            if (orderCode) {
                let arr = []
                let result = this.fetchedData.find(v => v.orderCode === orderCode)
                if (result) {
                    arr.push(result)
                }
                let data = arr
                this.setState({...this.state,data})
            }
            if (phone) {
                let result = this.fetchedData.filter(v => v.phone === phone)
                let data = result
                this.setState({...this.state,data})
            }
            if (dateRange) {
                let startDate = new Date(dateRange[0].format('YYYY/MM/DD')).getTime()
                let endDate = new Date(dateRange[1].format('YYYY/MM/DD')).getTime()
                let result = this.fetchedData.filter(v => {
                    let orderTime = new Date(v.orderTime).getTime()
                    return (orderTime <= endDate) && (orderTime >= startDate)

                })
                let data = result
                this.setState({...this.state,data})
            }
            if (!orderCode && !phone && !dateRange) {

                this.setState(this.fetchedData)
            }
        }
        return <div>
            <div >
                <Form
                    layout='inline'
                    onFinish={queryData}
                    initialValues={
                        formValues
                    }
                >
                    <Form.Item label="订单编号" name="orderCode">
                        <Input placeholder="请输入订单编号" allowClear />
                    </Form.Item>
                    <Form.Item label="用户账号" name="phone">
                        <Input placeholder="请输入用户账号" allowClear />
                    </Form.Item>
                    <Form.Item label="交易时间" name="dateRange">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
                <OrderDetail detailVisible={{visible:this.state.visible,order:this.state.order}} 
                setVisible={({visible})=>this.setState({...this.state,visible})} />
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