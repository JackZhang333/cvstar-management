import React from 'react'
import './home.css'
import { Layout, Menu, Typography } from 'antd';
import Users from './Users'
import Products from './Products';
import UserProducts from './UserProducts';
import UserOrders from './UserOrders';
import Staffs from './Staffs';
import { Route, Switch } from 'react-router-dom';

const { Title } = Typography
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;



export default function Home(props) {

    const menuClick = (e) => {
        props.history.push(`/home/${e.key}`)
    }
    return <Layout className='home-wrapper'>
        <Header className="header">
            <div className="logo" />
            <Title level={4} style={{ color: '#fff', marginTop: '18px' }}>便利星管理系统</Title>
        </Header>
        <Content style={{ padding: '20px' }} >

            <Layout className="site-layout-background content-wrapper" style={{ padding: '24px 0', minHeight: '70vh' }} >
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['users']}
                        style={{ height: '100%' }}
                        onClick={menuClick}
                        selectedKeys = {props.location.pathname}
                    >
                        <Menu.Item key="users">用户管理</Menu.Item>
                        <Menu.Item key="products">商品库</Menu.Item>

                        <SubMenu key="sub1" title="数据统计">
                            <Menu.Item key="userOrders" >用户订单</Menu.Item>
                            <Menu.Item key="userProducts" >用户商品</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="staffs">工作人员</Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Switch>

                        <Route path='/home/users' component={()=><Users />} />
                        <Route path='/home/products' component={Products} />
                        <Route path='/home/userProducts' component={UserProducts} />
                        <Route path='/home/userOrders' component={UserOrders} />
                        <Route path='/home/staffs' component={Staffs} />
                    </Switch>
                </Content>
            </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>copyright 2020 杭州便利星信息科技有限公司 浙ICP备19025640</Footer>
    </Layout>
}
