import React, { Component } from 'react';
import Messages from 'Messages';
import ChatInput from 'ChatInput';
import {Card, List, Avatar} from 'antd';
import style from './index.scss';
const socket = require('socket.io-client')('http://127.0.0.1:9527')

export default class Index extends Component {
    constructor(props) {
        super();
        this.state = {
            username:JSON.parse(localStorage.getItem('user')).username,
            uid:JSON.parse(localStorage.getItem('user')).userid,
            messages:[],
            onlineUsers: {},
            onlineCount: 0,
            userhtml:'',
        }
    }
    componentDidMount(){
      socket.emit('login', {uid:this.state.uid, username:this.state.username});
      this.ready();
    }
    // 处理在线人数及用户名，即聊天室状态栏
    handleUsers() {
        const users = this.state.onlineUsers;
        let userhtml = '';
        let separator = '';
        for (let key in users) {
            if (users.hasOwnProperty(key)) {
                userhtml+= separator + users[key];
                separator = '、';
            }
        }
        this.setState({userhtml: userhtml})
    }

    // 生成消息id
    generateMsgId() {
        return Math.random().toString(12).slice(-10);
    }

    // 更新系统消息，，此处有个小坑，react中的array不能使用push，而需要concat添加元素，新增的消息有以下属性，
    // 类型type，用户名username，用户IDuid，用户行为action(即为登入登出)，消息ID msgId，时间time
    updateSysMsg(o, action) {
        let messages = this.state.messages;
        const newMsg = {type:'system', username:o.user.username, uid:o.user.uid, action:action, msgId: this.generateMsgId()}
        messages = messages.concat(newMsg)
        this.setState({
            onlineCount: o.onlineCount,
            onlineUsers: o.onlineUsers,
            messages: messages
        });
        this.handleUsers();
    }

    // 更新消息列表，此处有个小坑，React中的Array不能使用push，而需要concat添加元素，新增的消息有以下属性，
    // 类型type，用户名username，用户IDuid，消息内容（此处使用系统消息中的action），消息ID msgId，发送时间time
    updateMsg(obj) {
        let messages = this.state.messages;
        const newMsg = {type:'chat', username:obj.username, uid:obj.uid, action:obj.message, msgId:this.generateMsgId()};
        messages = messages.concat(newMsg);
        this.setState({messages:messages})
    }


    // 开始监控socket
    ready() {
        // 客户端监控登陆
        socket.on('login', (o)=>{
            this.updateSysMsg(o, 'login');
        })
        // 客户端监控登出
        socket.on('logout', (o)=>{
            this.updateSysMsg(o, 'logout');
        })
        // 客户端监控发送消息
        socket.on('message', (obj)=>{
            this.updateMsg(obj)
        })
    }

    render() {
      const data = Object.entries(this.state.onlineUsers).map(o=>Object.assign({},{userid:o[0],username:o[1]}));
      return (
        <div className={style.chatRoom}>
          <Card 
              title='来的都冒个泡吧' 
              className={style.card}
          >            
              <div className={style.left}>
                  <Messages messages={this.state.messages} />                     
                  <ChatInput/>                 
              </div> 
              <div className={style.right}>
                  <List
                      header={<div>在线人数: {this.state.onlineCount}</div>}
                      dataSource={data}
                      className={style.userlist}
                      renderItem={item => (
                          <List.Item className={item.userid == JSON.parse(localStorage.getItem('user')).userid ? 'own':''}>
                              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{marginRight:'10px'}}/>
                              {item.username}
                          </List.Item>
                      )}
                  />
              </div>  
          </Card>
        </div>
      )     
    }
}