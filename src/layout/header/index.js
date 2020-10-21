import React,{useState,useEffect} from 'react';
import {Layout,Menu,Avatar,Dropdown,Modal} from 'antd';
import {createHashHistory} from 'history';
import {DownOutlined,ExclamationCircleOutlined} from '@ant-design/icons'; 
import style from './index.scss';


const {Header} = Layout;
const {confirm} = Modal;

const history = createHashHistory();
const img = require('@/assets/img/logo.jpg');
const menuArray = [
  {key:"home",name:"首页"},
  {key:"movie",name:"影视"},
  {key:"message",name:"留言板"},
];




export default function Index({props}){
  const [current,setCurrent] = useState('');

  useEffect(()=>{
    setCurrent(props.pathname.split('/')[1]? props.pathname.split('/')[1]:'home')
  },[props])

  const outLogin = () =>{
    confirm({
      title: '确定退出登录吗?',
      icon: <ExclamationCircleOutlined />,
      centered:true,
      maskClosable:true,
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=> {
        localStorage.clear();
        history.push('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  const handleClick = e => {
    history.push({pathname:`/${e.key}`});
    setCurrent(e.key)
  };
  const DropMenu = (
    <Menu>
      <Menu.Item key='usercenter'>
        <span onClick={()=>{history.push({pathname:'/usercenter'})}}>个人中心</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='userset'>
        <span onClick={()=>{history.push({pathname:'/userset'})}}>个人设置</span>
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
            {!!menuArray.filter(o=>o.key == current).length? menuArray.filter(o=>o.key == current)[0].name:''}
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