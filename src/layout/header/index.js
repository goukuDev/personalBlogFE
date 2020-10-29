import React,{useState,useEffect} from 'react';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Modal,
  Col,
  Row,
  Drawer
} from 'antd';
import {createHashHistory} from 'history';
import {MenuOutlined,ExclamationCircleOutlined} from '@ant-design/icons'; 
import style from './index.scss';
import {getUser,islogin} from '@/utils/util';
import {loginOut} from '@/api/user';
import Login from 'login';


const {Header} = Layout;
const {confirm} = Modal;

const history = createHashHistory();
const img = require('@/assets/img/logo.jpg');
const menuArray = [
  {key:"home",name:"首页"},
  {key:"music",name:"音乐"},
  {key:"movie",name:"影视"},
  {key:"message",name:"留言板"},
  {key:"about",name:"关于"},
];




export default function Index({props}){
  const [current,setCurrent] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleLogin,setVisibleLogin] = useState(false);

  useEffect(()=>{
    setCurrent(props.pathname.split('/')[1]? props.pathname.split('/')[1]:'home')
  },[props]);
  
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
      onOk:async()=> {
        let {data} = await loginOut({id:getUser().userid});
        if(data.code === 0){
          localStorage.clear();
          // history.push('/login');
          location.reload();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  const handleClick = e => {
    if(e.key === 'login'){
      setVisibleLogin(true)
    }else{
      history.push({pathname:`/${e.key}`});
      setCurrent(e.key)
    }
    setVisible(false);
  };
  const DropMenu = (
    getUser()?
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
      :
      <></>
  )

  return(
    <>
      <Header className={style.siteLayoutBackground}>
        <div className={style.logo}>
          <a href='/'>
            <img src={img} alt='logo'/>
          </a>
          <Row>
            {/* 小屏时候显示隐藏按钮 */}
            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
              <div className={style.DropdownRouter} onClick={()=>{setVisible(true)}}>
                <MenuOutlined />
              </div>
            </Col>
          </Row>
        </div>
        <div className={style.right}>
          {/* 大屏幕时候菜单 */}
          <Row>
            <Col xs={0} sm={0} md={24} lg={24} xl={24}>
              <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                {
                  getUser()?
                  menuArray.map(o=><Menu.Item key={o.key}>{o.name}</Menu.Item>)
                  :
                  (menuArray.concat({key:'login',name:'登录'})).map(o=><Menu.Item key={o.key}>{o.name}</Menu.Item>)
                }
              </Menu>
            </Col>
          </Row>
          <Drawer
            placement="left"
            closable={false}
            onClose={()=>{setVisible(false)}}
            visible={visible}
            getContainer={false}
          >
            <Menu onClick={handleClick} selectedKeys={[current]} >
              {
                getUser()?
                menuArray.map(o=><Menu.Item key={o.key}>{o.name}</Menu.Item>)
                :
                (menuArray.concat({key:'login',name:'登录'})).map(o=><Menu.Item key={o.key}>{o.name}</Menu.Item>)
              }
            </Menu>
          </Drawer>
          {/* 用户头部操作 */}
          <Dropdown overlay={DropMenu} placement="bottomCenter" trigger={['click']}>
            <div className={style.Dropdown}>
              <Avatar 
              className={style.avatar}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <span className={style.user}>{getUser().name}</span>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Login
        visible={visibleLogin}
        onCancel={()=>{setVisibleLogin(false)}}
      />
    </>
  )
}