import React,{Component} from 'react';
import {Layout,Menu} from 'antd';
import Header from '@/layout/header';
import {createHashHistory} from 'history';
import style from './index.scss';
import {
  HomeOutlined,
  MenuOutlined,
  YoutubeOutlined,
  CommentOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const {Sider,Content,Footer} = Layout;
const history = createHashHistory();
const img = require('@/assets/img/logo.svg');
const pathname = history.location.pathname.split('/')[1];
const menuArray = [
  {key:"home",name:"首页",icon:HomeOutlined},
  {key:"about",name:"关于",icon:MenuOutlined},
  {key:"movie",name:"影视",icon:YoutubeOutlined},
  {key:"chat",name:"聊天",icon:TeamOutlined},
  {key:"message",name:"留言板",icon:CommentOutlined},
];

export default class Index extends Component{
  constructor(props){
    super(props);
    this.state = {
      current:pathname? pathname:'home',
      collapsed:false
    }
  }
  handleClick = e => {
    history.push({pathname:`/${e.key}`})
    this.setState({
      current:e.key
    })
  };
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
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* 内容显示区域 */}
            <React.Fragment>
              {this.props.children}
            </React.Fragment>
          </Content>
          <Footer style={{'textAlign':'center'}}>2015~2020@by shiyonghua</Footer>
        </Layout>
      </Layout>
    )
  }
}