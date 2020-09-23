import React from 'react'
import {Result,Button} from 'antd'

export default function NotFound(props){
    return <Result
        status = '404'
        title = '该页面不存在！'
        subTitle = '你是不是迷路了，请返回首页吧'
        extra = {<Button type = 'primary' onClick = {()=>{props.history.push('/home/users')}}>返回首页</Button>}
    />
}