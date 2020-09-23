import React from 'react';
import {Button,Table,Tag,Modal} from 'antd';
import { PlusOutlined} from '@ant-design/icons'
const columns = [
    {
        title:'账户',
        dataIndex:'phone',
        key:'phone'
    },
    {
        title:'姓名',
        dataIndex:'name',
        key:'name'
    },
    {
        title:'角色',
        dataIndex:'role',
        key:'role'
    },
    {
        title:'状态',
        dataIndex:'status',
        key:'status',
        render:status =>{
            return <Tag color = {status ? "green" : "red"}>
                {status ? '已启用' : '未启用'}
            </Tag>
        }
    },
]
const data = [
    {
        key:'1',
        phone:'13221059343',
        status:true,
        name:'张小山',
        role:'管理员'
    }
]
export default function staffs(){
    const addStaff = ()=>{
        Modal.warning(
            {
                title:'新增工作人员',
                content:'该功能暂未实现'
            }
        )
    }
    return <div>
        <div style = {{marginBottom:'20px'}}>
            <Button type='primary' onClick = {addStaff}><PlusOutlined/>新增账号</Button>
        </div>
        <div>
            <Table 
                columns = {columns}
                dataSource = {data}
                scroll = {{y:'calc(100vh - 400px)',x:'80vw'}}
            />
        </div>
    </div>
}