import React,{Component} from 'react';
import { Comment, Tooltip, List, Card, Form, Input, Button, message } from 'antd';
import moment from 'moment';
import style from './index.scss';
import {msgList,addmsg} from '@/api/message';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        留言
      </Button>
    </Form.Item>
  </>
);

export default class Index extends Component{
  state = {
    data: [],
    submitting: false,
    value: '',
  };
  
  componentDidMount(){
    this.getMsgList();
  }

  //获取历史留言数据
  getMsgList = async() =>{
    let {data} = await msgList();
    if(data.code === 0){
      
      const localDate = (v) => {
        const d = new Date(v || Date.now());
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        return d.toISOString();
      };

      let dataMsg = data.data.map(item=>Object.assign({},{
        author: item.username,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (item.content),
        datetime: (
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(localDate(item.date)).fromNow()}</span>
          </Tooltip>
        )
      }))
      this.setState({
        value: '',
        data: [
          ...dataMsg,
        ],
      });
    }
  }

  handleChange = (e) =>{
    this.setState({
      value:e.target.value
    })
  }
  //发布留言
  handleSubmit = async() =>{
    if (!this.state.value) return message.error('请输入留言内容');

    this.setState({
      submitting: true,
    });

    const sendDate = (v) => {
      const d = new Date(v || Date.now());
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString();
    };

    let {data} = await addmsg({
      username:JSON.parse(localStorage.getItem('user')).username,
      content:this.state.value,
      date:new Date()
    })
    if(data.code === 0){
      message.success('新增成功');
      this.setState({submitting:false})
      this.getMsgList();
    }
  }
  render(){
    return(
      <div className={style.messagebox}>
        <Card title='留言板' className={style.card}>
          <List
            className={style.commentlist}
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
              <li>
                <Comment
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
          <Comment
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={this.state.submitting}
                value={this.state.value}
              />
            }
          />
        </Card>
      </div>
    )
  }
}