import React, { Component } from 'react';
import { Button, Table, Tag, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import staff from '../api/staff'

const columns = [
    {
        title: '账户',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '角色',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status => {
            return <Tag color={status ? "green" : "red"}>
                {status ? '已启用' : '未启用'}
            </Tag>
        }
    },
]

export default class Staffs extends Component {
    constructor(){
        super()
        this.state = {
            data:[]
        }
        this.fethedData =[]
        this.loadData = ()=>{
            staff.getAllStaff((data)=>{
                // console.log(data)
                let result = data.map(v=>{
                    let {id,phone,name,role,status} = v
                    let key = id
                    return {phone,name,role,status,key}
                })
                this.setState({
                    data:result
                })
                
            })
        }
    }
    componentDidMount(){
        this.loadData()
    }
    render() {
        const addStaff = () => {
            Modal.warning(
                {
                    title: '新增工作人员',
                    content: '该功能暂未实现'
                }
            )
        }
        return <div>
            <div style={{ marginBottom: '20px' }}>
                <Button type='primary' onClick={addStaff}><PlusOutlined />新增账号</Button>
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