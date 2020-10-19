import React,{useState} from 'react';
import {Layout,Menu,Avatar,Dropdown} from 'antd';
import {createHashHistory} from 'history';
import {DownOutlined} from '@ant-design/icons'; 
import style from './index.scss';


const {Header} = Layout;

const history = createHashHistory();
const pathname = history.location.pathname.split('/')[1];
const img = require('@/assets/img/logo.jpg');
const menuArray = [
  {key:"home",name:"首页"},
  {key:"movie",name:"影视"},
  {key:"message",name:"留言板"},
];




export default function Index(){
  const [current,setCurrent] = useState(pathname? pathname:'home');
  const outLogin = () =>{
    localStorage.clear();
    history.push('/login')
  }
  const handleClick = e => {
    history.push({pathname:`/${e.key}`});
    setCurrent(e.key)
  };

  const DropMenu = (
    <Menu>
      <Menu.Item key='user'>
        <span>用户中心</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='out'>
        <span onClick={outLogin}>退出登录</span>
      </Menu.Item>
    </Menu>
  )
  const DropMenuRouter = (
    <Menu onClick={handleClick} selectedKeys={[current]} >
      {menuArray.map(o=><Menu.Item key={o.key}>{o.name}</Menu.Item>)}
    </Menu>
  )
  return(
    <Header className={style.siteLayoutBackground}>
      <div className={style.logo}>
        <img src={img} alt='logo'/>
        咖啡屋
        <Dropdown overlay={DropMenuRouter} placement="bottomCenter">
          <div className={style.DropdownRouter}>
            {menuArray.filter(o=>o.key == current)[0].name}
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <Dropdown overlay={DropMenu} placement="bottomCenter">
        <div className={style.Dropdown}>
          <Avatar 
          className={style.avatar}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span className={style.user}>{JSON.parse(localStorage.getItem('user')).name}</span>
        </div>
      </Dropdown>
    </Header>
  )
}