// Messages消息列表
import React, { useState } from 'react';
import {Avatar } from 'antd';
import style from './index.scss';

export default function Index(props) {
    const [myId,setMyId] = useState(JSON.parse(localStorage.getItem('user')).userid)

    const Message = (props) => {
        if (props.msgType == 'system') {
            // 系统消息
            return (
                <div className="one-message system-message" style={{textAlign:'center',color:'red',marginBottom:'5px',fontSize:'12px'}}>
                    {props.msgUser} {(props.action=='login')? '进入了聊天室': '离开了聊天室'} 
                    <span className="time">&nbsp;{new Date().toLocaleString()}</span>                 
                </div>             
            )
        } else {
            // 聊天消息，判断是否是自己
            return (
                <div className={(props.isMe)? style.me:style.other}>
                    <Avatar style={{display:props.isMe? 'none':'block'}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <div>
                        <span>{props.msgUser}</span>
                        <div className={style.messageContent}>{props.action}</div>
                    </div>    
                    <Avatar style={{display:props.isMe? 'block':'none'}}src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />             
                </div>             
            )
        }
    }

    // 每条消息，判断是否是自己
    const oneMessage = props.messages.map((message)=>{
        return(
            <Message 
                key={message.msgId} 
                msgType={message.type} 
                msgUser={message.username} 
                action={message.action} 
                isMe={(myId == message.uid)? true : false} 
                time={message.time}
            />                 
        )
    })
    return(
        <div className={style.messages}>{oneMessage}</div>
    )   
}