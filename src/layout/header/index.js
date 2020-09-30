import React from 'react';
import {Layout,Menu,Avatar,Dropdown} from 'antd';
import {createHashHistory} from 'history';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

const history = createHashHistory();
const {Header} = Layout;

const outLogin = () =>{
  localStorage.clear();
  history.push('/login')
}

export default function Index(props){
  const {collapsed,changeCollapsed,changeCurrent} = props;

  const DropMenu = (
    <Menu>
      <Menu.Item key='user'>
        <span onClick={outLogin}>退出登录</span>
      </Menu.Item>
    </Menu>
  )
  return(
    <Header className="site-layout-background" style={{ padding: 0,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: ()=>{changeCollapsed(!collapsed)},
      })}
      <Dropdown overlay={DropMenu} placement="bottomCenter" arrow>
        <Avatar
          style={{
            backgroundColor: '#87d068',
            marginRight:'40px',
            cursor:'pointer'
          }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </Header>
  )
}