import React from 'react';
import {Button} from 'antd'
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg:'hahah'
        }
    }
    toLogin = ()=>{
        console.log('跳转到home页')
        console.log(this.props)
        this.props.history.push('/home/users')
    }
    render(){
        return <div>this is Login page
            <p>{this.state.msg}</p>
            <Button onClick = {this.toLogin}>登录</Button>
        </div>
    }
}
 