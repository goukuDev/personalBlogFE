import React,{Component,createElement} from 'react';
import { Comment, Tooltip, List, Card, Form, Input, Button, message, Pagination, Row, Col } from 'antd';
import moment from 'moment';
import style from './index.scss';
import {msgList,addmsg,giveStart} from '@/api/message';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { getUser,islogin } from '@/utils/util';

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, onPressEnter, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} onPressEnter={onPressEnter} placeholder="发送/回车提交"/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" disabled={!value}>
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
    pagination:{
      total: 0,
      pageNum: 1,
      pageSize: 10,
      pageSizeOptions: ['1', '10', '20', '50', '100'],
    },
    likes:0,
    dislikes:0,
  };
  
  componentDidMount(){
    this.getMsgList();
  }
  

  like = async (e,type) => {
    if(!await islogin()) return message.error('请先登录');

    const num = type === 'like'? e.like+= 1 : e.dislike+= 1;
    let options = {
      type:type,
      like:num,
      id:e._id
    }
    let {data} = await giveStart(options);
    if(data.code === 0){
      this.getMsgList();
    }
  };


  //获取历史留言数据
  getMsgList = async() =>{
    let {pageNum,pageSize} = this.state.pagination;
    let {data} = await msgList({page:pageNum,pageSize:pageSize});
    if(data.code === 0){

      const localDate = (v) => {
        const d = new Date(v || Date.now());
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        return d.toISOString();
      };

      
      let dataMsg = data.data.map(item=>Object.assign({},{
        actions:[
            <span onClick={()=>this.like(item,'like')}>
              {createElement(LikeOutlined)}
              <span className="comment-action">{item.like}</span>
            </span>,
            <span onClick={()=>this.like(item,'dislike')}>
              {createElement(DislikeOutlined)}
              <span className="comment-action">{item.dislike}</span>
            </span>
        ],
        author: item.username,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (item.content),
        datetime: (
          <Tooltip title={moment(localDate(item.date)).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(localDate(item.date)).fromNow()}</span>
          </Tooltip>
        )
      }))
      let pagination = Object.assign({},this.state.pagination,{
        total:data.total
      });
      this.setState({
        value: '',
        data: [
          ...dataMsg,
        ],
        pagination
      });
    }
  }

  //发布留言
  handleSubmit = async() =>{
    if(!await islogin()) return message.error('请先登录');
    
    this.setState({
      submitting: true,
    });


    let {data} = await addmsg({
      username:getUser().username,
      content:this.state.value,
      date:new Date(),
    })
    if(data.code === 0){
      message.success('新增成功');
      this.setState({submitting:false})
      this.getMsgList();
    }
  }

  onChange = (page,pageSize)=>{
    let pagination = Object.assign({},this.state.pagination,{
      pageNum:page,
      pageSize:pageSize
    })
    this.setState({
      pagination:pagination
    },()=>{
      this.getMsgList();
    });
  }
  
  handleKeyPress = (e)=> {
    if (e.key == 'Enter') {
        this.handleSubmit()
    }
    return false;
  }

  render(){
    return(
      <div className={style.messagebox}>
        <Card title='留言板' className={style.card}>
          <Row>
            <Col xs={24} sm={24} md={18} lg={14} xl={10}>
              <div className={style.left}>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.data}
                  renderItem={item => (
                    <li>
                      <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                      />
                    </li>
                  )}
                />
                <Pagination 
                  style={{textAlign:'left',marginTop:'15px'}}
                  showSizeChanger
                  showTotal={total => `共${total}条`}
                  total={this.state.pagination.total} 
                  current={this.state.pagination.pageNum}
                  defaultPageSize={this.state.pagination.pageSize}
                  pageSizeOptions={this.state.pagination.pageSizeOptions}
                  onChange={this.onChange}
                />
              </div>
            </Col>
            <Col xs={24} sm={18} md={14} lg={9} xl={6}>
              <Comment
                content={
                  <Editor
                    onChange={(e)=>this.setState({value:e.target.value})}
                    onSubmit={this.handleSubmit}
                    onPressEnter={this.handleKeyPress}
                    submitting={this.state.submitting}
                    value={this.state.value}
                  />
                }
              />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}