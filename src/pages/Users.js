import React from 'react'
import { Form, Input, DatePicker, Button, Table, Tag, Space, Menu, Dropdown, Modal, message } from 'antd'

import moment from 'moment'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import users from '../api/users'

const { RangePicker } = DatePicker;


export default class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
        this.fetchedData = []
        this.loadData = () => {
            users.getUsers((data) => {
                let userDatas = data.map((item, index) => {
                    const { userName: phone, storeName, createdAt, status, id } = item
                    let key = id
                    let registerTime = moment(new Date().setTime(createdAt)).format('YYYY-MM-DD hh:mm')
                    return { phone, registerTime, status, key, storeName }
                })

                this.setState({ data: userDatas })
                this.fetchedData = userDatas

            })
            // console.log('数据被重新加载了')
        }

    }


    componentDidMount() {
        this.loadData()
    }
    render() {
        const modifyUserStatus = (record) => {
            //调用api改变当前用户的状态
            let userName = record.phone

            users.modifyUserStatus({ userName, status: !record.status }, (res) => {
                let { code, msg } = res
                if (code === 1) {
                    message.success(msg)
                    //重新加载数据
                    this.loadData()
                }
            })
        }
        const menu = (phone) => {
            const url1 = `http://localhost:3030/home/userOrders/${phone}`
            const url2 = `http://localhost:3030/home/userProducts/${phone}`
            return (
                <Menu>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href={url1} target='_blank'>
                            用户订单
            </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href={url2} target='_blank'>
                            用户商品
            </a>
                    </Menu.Item>
                </Menu>
            )
        }
        const columns = [
            {
                title: '账号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '店名',
                dataIndex: 'storeName',
                key: 'storeName',
            },
            {
                title: '注册时间',
                dataIndex: 'registerTime',
                key: 'registerTime',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: status => (
                    <Tag color={status ? "green" : "red"}>
                        {status ? "已启用" : "未启用"}
                    </Tag>
                )
            },
            {
                title: '操作',
                key: 'actions',
                render: (text, record) => {
                    return <Space>
                        <a onClick={
                            e => {
                                e.preventDefault();
                                if (record.status) {
                                    Modal.confirm({
                                        title: '停用账户',
                                        icon: <ExclamationCircleOutlined />,
                                        content: `确定要停用店铺${record.storeName}账户?`,
                                        okText: '停用账户',
                                        cancelText: '取消',
                                        onOk: () => {
                                            modifyUserStatus(record)
                                        }
                                    })
                                } else {
                                    modifyUserStatus(record)
                                }
                            }

                        } href={{ javascript: 0 }}>
                            {record.status ? "停用" : "启用"}
                        </a>
                        <Dropdown overlay={() => menu(record.phone)}>
                            <a className='ant-dropdown-link' onClick={e => e.preventDefault()} href={{ javascript: 0 }}>
                                查看<DownOutlined />
                            </a>
                        </Dropdown>
                    </Space>
                }

            },
        ]


        const queryData = (values) => {
            const { phone, dateRange } = values
            // console.log(phone,"开始时间："+dateRange[0].format('YYYY/MM/DD'),"结束时间："+dateRange[1].format())
            if (phone) {
                let result = this.fetchedData.find(v => v.phone === phone)
                let arr = [];
                if (result) {
                    arr.push(result)
                }

                this.setState({ data: arr })
            }
            if (dateRange) {
                let startDate = new Date(dateRange[0].format('YYYY/MM/DD')).getTime()
                let endDate = new Date(dateRange[1].format('YYYY/MM/DD')).getTime()
                let result = this.fetchedData.filter(v => {
                    let register = new Date(v.registerTime).getTime()
                    return (register <= endDate) && (register >= startDate)

                })
                this.setState({ data: result })
            }
            if (!phone && !dateRange) {
                this.setState({ data: this.fetchedData })
            }
        }


        return <div>
            <div className='query-panel'>
                <Form
                    layout='inline'
                    onFinish={queryData}

                >
                    <Form.Item label="用户账号" name="phone">
                        <Input placeholder="请输入用户账号" allowClear />
                    </Form.Item>
                    <Form.Item label="注册时间" name="dateRange">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='users-table'>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    scroll={{ y: 'calc(100vh - 400px)', x: '80vw' }}
                />
            </div>
        </div>
    }

}