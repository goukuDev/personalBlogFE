// ChatInput输入框
import React, {Component} from 'react';
import {Button,Input} from 'antd';
import style from './index.scss';
const socket = require('socket.io-client')('http://localhost:8080')

const { TextArea } = Input;
export default class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:'',
            myId: JSON.parse(localStorage.getItem('user')).userid,
            myName: JSON.parse(localStorage.getItem('user')).username,
        }
    }

    // 监控input变化
    handleChange = ({ target: { value } })=> {
        this.setState({message: value})
    }

    // 点击提交或按回车
    handleClick = (e)=> {
        e.preventDefault();
        this.sendMessage()
    }
    handleKeyPress = (e)=> {
        if (e.key == 'Enter') {
            this.sendMessage()
        }
        return false;
    }

    // 发送聊天信息
    sendMessage = ()=> {
        const message = this.state.message;
        if (message) {
            const obj = {
                uid: this.state.myId,
                username: this.state.myName,
                message: message
            }
            socket.emit('message', obj);
            // 发送消息后清空输入框
            this.setState({message:''})
        }
        return false
    }

    handleOut = ()=>{
        socket.disconnect();
    }
    render() {
        return(
            <div className={style.inputbox}>
                <div className={style.input}>
                    <TextArea 
                    type="text" 
                    maxLength="140" 
                    placeholder="发送/回车提交" 
                    bordered={false}
                    value={this.state.message}
                    onPressEnter={this.handleKeyPress}
                    onChange={this.handleChange}/>                 
                </div>                 
                <div className={style.button}>
                    <Button onClick={this.handleOut}>退出</Button>
                    &nbsp;&nbsp;
                    <Button onClick={this.handleClick} type="primary">发送</Button>
                    &nbsp;&nbsp;
                </div>             
            </div>             
        )
    }
}