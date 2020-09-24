import React from 'react';
import { connect } from 'react-redux'
import './login.css'
import { message } from 'antd';
import env from '../envirenment'
import acount from '../api/acount'

const Login = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: 'hahah',
            verifyImage: env + '/api/login/verify_image'
        }
        this.verifyImage = React.createRef()
    }

    verifyImageClick = () => {
        //上传服务器时，需要手动修改请求的ip地址
        this.verifyImage.current.src = env + '/api/login/verify_image?time' + new Date()
    }
    submitHandler = (e) => {
        e.preventDefault()
        //保存当前实例对象，在后面的异步请求监听函数中可用
        // let self = this;
        let { name, password, verifyImage } = e.target;
        //校验数据的完整性，和正确性
        if (name.value !== '' && password.value !== '' && verifyImage.value !== '') {
            //校验name是否为手机
            const isPhone = /^1\d{10}$/.test(name.value)
            //校验密码的长度
            const okLength = /^\w{6,20}$/.test(password.value)
            const okVerify = /^\w{4}$/.test(verifyImage.value)

            if (isPhone && okLength && okVerify) {
                //去登录
                this.toLogin({ phone: name.value, password: password.value, verifyImage: verifyImage.value })
            } else if (!isPhone) {
                message.error("请填写正确的账号")
                return
            } else if (!okLength) {
                message.error("密码格式错误")
                return
            } else if (!okVerify) {
                message.error('验证码格式错误')
                return
            }

        } else {
            message.error('请填写完整的数据')
        }
    }
    toLogin = (data) => {

        //请求登录接口
        acount.toLogin(data, (res) => {
            console.log(res)
            if (res.code === 200) {
               
                localStorage.setItem('token', res.token)
                message.success(res.msg)

                //改变store的数据状态
                this.props.toLogin()
                this.props.history.push('/home/users')
            } else {
                message.warn(res.msg)
            }
        })

    }
    render() {
        return (<div className="login">
            <div className="login-container">
                <div className="cvs-logo"></div>
                <p className="cvs-words">简单好用的小店管理工具</p>
                <form onSubmit={this.submitHandler} className="login-form">
                    <div className="item-wrapper">
                        <span className="icon-phone input-icon"></span>
                        <input
                            type="number"
                            name="name"
                            className="item-input"
                            placeholder="请输入手机号"
                            autoComplete="off"
                        />
                    </div>
                    <div className="item-wrapper">
                        <span className="icon-pwd input-icon"></span>
                        <input
                            type="password"
                            name="password"
                            className="item-input"
                            placeholder="请输入密码"
                            autoComplete="off"
                        />

                    </div>
                    <div className="item-wrapper">
                        <span className="icon-verify input-icon"></span>
                        <input
                            type="text"
                            name="verifyImage"
                            className="verify-input"
                            placeholder="请输入图片验证码"
                            autoComplete="off"
                        />
                        <img
                            alt='图片验证码'
                            src={this.state.verifyImage}
                            onClick={this.verifyImageClick}
                            className="verify-image"
                            ref={this.verifyImage}
                        />
                    </div>
                    <input type="submit" value="登录" className="item-submit" />
                </form>

            </div>
            <p className="copy-right">copyright 2020 杭州便利星信息科技有限公司 浙ICP备19025640</p>
        </div>)
    }
}
const mapStateToProps = (state) => ({
    isLogin: state.isLogin
})
const mapDisptchToProps = (disptch) => {
    return {
        toLogin: () => disptch({ type: 'LOGIN' }),
        toLogout: () => disptch({ type: 'LOGOUT' }),
    }
}
export default connect(mapStateToProps, mapDisptchToProps)(Login);