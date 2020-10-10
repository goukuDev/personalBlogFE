import React,{Component} from 'react';
import {Layout,Menu,Affix, Button, Modal, Input, message} from 'antd';
import Header from '@/layout/header';
import {createHashHistory} from 'history';
import style from './index.scss';
import {
  HomeOutlined,
  YoutubeOutlined,
  CommentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {addfeedback} from '@/api/feedback';

const {TextArea} = Input;
const {Sider,Content} = Layout;
const history = createHashHistory();
const img = require('@/assets/img/logo.svg');
const pathname = history.location.pathname.split('/')[1];
const menuArray = [
  {key:"home",name:"首页",icon:HomeOutlined},
  {key:"movie",name:"影视",icon:YoutubeOutlined},
  {key:"chat",name:"聊天",icon:TeamOutlined},
  {key:"message",name:"留言板",icon:CommentOutlined},
];

export default class Index extends Component{
  state = {
    current:pathname? pathname:'home',
    collapsed:false,
    visible:false,
    value:''
  }
  handleClick = e => {
    history.push({pathname:`/${e.key}`})
    this.setState({
      current:e.key
    })
  };
  onOk = async () =>{
    if (!this.state.value) return message.error('请填写反馈内容');
    let {data} = await addfeedback({
      content:this.state.value,
      username:JSON.parse(localStorage.getItem('user')).username,
      date:new Date(),
    });
    if(data.code === 0){
      this.setState({
        visible:false,
        value:''
      })
      message.success('感谢提出宝贵的意见')
    }
  }
  onPressEnter = (e)=> {
    if (e.key == 'Enter') {
        this.onOk()
    }
    return false;
  }
  render(){
    return(
      <Layout>
        <Sider 
        trigger={null} 
        collapsible 
        collapsed={this.state.collapsed} 
        className={style.sider}
        >
          <div className="logo">
            <img src={img} alt='logo'></img>
          </div>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="inline" theme="dark">
            {menuArray.map(o=><Menu.Item key={o.key} icon={<o.icon />}>{o.name}</Menu.Item>)}
          </Menu>
        </Sider>
        <Layout className={style.siteLayout}>
          <Header collapsed={this.state.collapsed} changeCollapsed={(e)=> this.setState({collapsed:e})} changeCurrent={(e)=> this.setState({current:e})}></Header>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              minHeight: 280,
            }}
          >
            {/* 内容显示区域 */}
            <React.Fragment>
              {this.props.children}
            </React.Fragment>
            <Affix style={{ position: 'fixed', bottom: 120, right: 30 }}>
              <Button 
                shape="round" 
                type="primary" 
                onClick={()=>this.setState({visible:true})} 
                >
                  反馈
              </Button>
            </Affix>
          </Content>
          <Modal
            title="反馈意见"
            centered
            visible={this.state.visible}
            onOk={this.onOk}
            onCancel={() => this.setState({visible:false})}
          >
            <TextArea 
              onPressEnter={(e)=>this.onPressEnter(e)} 
              placeholder='回车/确定发送消息' 
              style={{resize:'none',height:'100px'}} 
              onChange={(e)=>this.setState({value:e.target.value})} 
              value={this.state.value}
            />
          </Modal>
        </Layout>
      </Layout>
    )
  }
}