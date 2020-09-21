import React, {useState}from 'react'
import { Form,Input,DatePicker,Button, Table, Tag, Space, Menu, Dropdown, Modal, message} from 'antd'
import './user.css'
// import moment from 'moment'
import {DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

const {RangePicker} = DatePicker;
const menu = (
    <Menu>
        <Menu.Item>
            <a target='_blank' rel="noopener noreferrer" href="http://localhost:3000/home/userOrders">
                用户订单
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target='_blank' rel="noopener noreferrer" href="http://localhost:3000/home/userProducts">
                用户商品
            </a>
        </Menu.Item>
    </Menu>
)
const data = [
    {
        key:'1',
        phone:'13221059354',
        storeName:'华星WOWO店',
        registerTime:'2020-09-08 14:20',
        status:true,
    },
    {
        key:'2',
        phone:'18700441020',
        storeName:'杨芳村百世邻里店',
        registerTime:'2020-10-08 14:20',
        status:false,
    },
    {
        key:'3',
        phone:'13221059354',
        storeName:'华星WOWO店',
        registerTime:'2020-09-08 14:20',
        status:true,
    },
    {
        key:'4',
        phone:'18700441020',
        storeName:'杨芳村百世邻里店',
        registerTime:'2020-10-08 14:20',
        status:false,
    },
    {
        key:'5',
        phone:'13221059354',
        storeName:'华星WOWO店',
        registerTime:'2020-09-08 14:20',
        status:true,
    },
    {
        key:'6',
        phone:'18700441020',
        storeName:'杨芳村百世邻里店',
        registerTime:'2020-10-08 14:20',
        status:false,
    },
    {
        key:'7',
        phone:'13221059354',
        storeName:'华星WOWO店',
        registerTime:'2020-09-08 14:20',
        status:true,
    },
    {
        key:'8',
        phone:'18700441020',
        storeName:'杨芳村百世邻里店',
        registerTime:'2020-10-08 14:20',
        status:false,
    },
    {
        key:'9',
        phone:'13221059354',
        storeName:'华星WOWO店',
        registerTime:'2020-09-08 14:20',
        status:true,
    },
    {
        key:'10',
        phone:'18700441020',
        storeName:'杨芳村百世邻里店',
        registerTime:'2020-10-08 14:20',
        status:false,
    },
    {
        key:'11',
        phone:'13221059354',
        storeName:'华星WOWO店',
        registerTime:'2020-09-08 14:20',
        status:true,
    },
    {
        key:'12',
        phone:'18700441020',
        storeName:'杨芳村百世邻里店',
        registerTime:'2020-10-08 14:20',
        status:false,
    },
    {
        key:'13',
        phone:'13221059354',
        storeName:'华星WOWO店',
        registerTime:'2020-09-08 14:20',
        status:true,
    },
    {
        key:'14',
        phone:'18700441020',
        storeName:'杨芳村百世邻里店',
        registerTime:'2020-10-08 14:20',
        status:false,
    },
]

export default function Users(props){
    // const [form] = Form.useForm();
   const [filtedData,setFilted] = useState(data);
    const columns = [
        {
            title:'账号',
            dataIndex:'phone',
            key:'phone',
        },
        {
            title:'店名',
            dataIndex:'storeName',
            key:'storeName',
        },
        {
            title:'注册时间',
            dataIndex:'registerTime',
            key:'registerTime',
        },
        {
            title:'状态',
            dataIndex:'status',
            key:'status',
            render:status=>(
                <Tag color = {status ? "green" : "red"}>
                    {status ? "已启用" : "未启用"}
                </Tag>
            )
        },
        {
            title:'操作',
            key:'actions',
            render:(text,record) => {
                return <Space>
                    <a onClick={
                        e=>{
                            e.preventDefault();
                            if(record.status){
                                Modal.confirm({
                                    title:'停用账户',
                                    icon:<ExclamationCircleOutlined/>,
                                    content:`确定要停用店铺${record.storeName}账户?`,
                                    okText:'停用账户',
                                    cancelText:'取消',
                                    onOk : ()=>{message.success('账户停用成功！')}
                                })
                            }else{
                                message.success('账户启用成功！')
                            }
                        }
                        
                    } href = {{javascript:0}}>
                        {record.status ? "停用" : "启用"}
                    </a>
                    <Dropdown overlay = {menu}>
                        <a className = 'ant-dropdown-link' onClick = {e => e.preventDefault()} href = {{javascript:0}}>
                            查看<DownOutlined/>
                        </a>
                    </Dropdown>
                </Space>
            }

        },      
    ]
    
    
    const queryData = (values)=>{
        const {phone,dateRange} = values
        // console.log(phone,"开始时间："+dateRange[0].format('YYYY/MM/DD'),"结束时间："+dateRange[1].format())
        if(phone){
            let result = data.find(v=>v.phone === phone)
            let arr = [];
            if(result){
                arr.push(result)
            }
            
            setFilted(arr)
        }
        if(dateRange){
            let startDate = new Date(dateRange[0].format('YYYY/MM/DD')).getTime()
            let endDate = new Date(dateRange[1].format('YYYY/MM/DD')).getTime()
            let result = data.filter(v=>{
                let register = new Date(v.registerTime).getTime()
                return (register<=endDate)&&(register>=startDate)
                    
            })
            setFilted(result)
        }
        if(!phone&&!dateRange){
            setFilted(data)
        }
    }

    return <div>
        <div className='query-panel'>
           <Form
            layout = 'inline'
            onFinish = {queryData}
            
           >
               <Form.Item label = "用户账号" name = "phone">
                   <Input placeholder = "请输入用户账号" allowClear/>
               </Form.Item>
                <Form.Item label = "注册时间" name = "dateRange">
                    <RangePicker/>
                </Form.Item>
                <Form.Item>
                    <Button type = "primary" htmlType = "submit">查询</Button>
                </Form.Item>
           </Form>
        </div>
        <div className='users-table'>
            <Table 
            columns = {columns} 
            dataSource = {filtedData}
            scroll = {{y:400,x:'80vw'}}
            />
        </div>
    </div>
}