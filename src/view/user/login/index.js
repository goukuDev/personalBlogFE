import React from 'react';  
import {Row, Col, Form, Input, Button,message} from 'antd';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import {createHashHistory} from 'history';
import style from './index.scss';    
import {login} from '@/api/user';
import encrypt from '@/utils/pubRAS';

const history = createHashHistory();

export default function Login(){  
  const onFinish = async (values) => {
    let jsonObj = {username:values.username,password:encrypt(values.password)}
    let {data} = await login(jsonObj);
    if(data.code === 0){
      message.success(data.message);
      localStorage.setItem('token',data.token);
      localStorage.setItem('user',JSON.stringify(data.data));
      location.href = '/'
    }else{
      message.error(data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };  

  const onRegister = ()=>{
    history.push('/register')
  }
  const onForget = ()=>{
    history.push('/forget')
  }
  return(  
    <>
      <Row>  
          <Col className={style.loginFormCol}> 
            <Form 
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className={style.loginForm}>  
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >  
                <Input prefix={<UserOutlined/>} placeholder="用户名" /> 
              </Form.Item>  
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ]}
              >  
                <Input.Password type='password' prefix={<LockOutlined/>} placeholder="密码" />  
              </Form.Item>  
              <Form.Item>  
                  <a onClick={onForget} style={{width:'50%',textAlign:'left',display:'inline-block'}}>忘记密码?</a> 
                  <a onClick={onRegister} style={{width:'50%',textAlign:'right',display:'inline-block'}}>注册账号</a> 
              </Form.Item>  
              <Form.Item>  
                  <Button type="primary" htmlType="submit" className={style.loginBtn}>  
                      登录  
                  </Button>  
              </Form.Item>  
            </Form>  
          </Col>  
      </Row>  
    </>
  )  
}  