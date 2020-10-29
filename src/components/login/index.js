import React,{ useState } from 'react';  
import {
  Row, 
  Col, 
  Form, 
  Input, 
  Button,
  message,
  Modal
} from 'antd';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import {createHashHistory} from 'history';
import style from './index.scss';    
import {login} from '@/api/user';
import encrypt from '@/utils/pubRAS';
import Forget from 'forget';
import Register from 'register';

const history = createHashHistory();

export default function Login({visible,onCancel}){  
  const [isLogin,setIsLogin] = useState(true);
  const [isForget,setIsForget] = useState(false);
  const [isRegister,setIsRegister] = useState(false);

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

  const onRegister = ()=>{
    setIsRegister(true);
    setIsLogin(false);
  }
  const onForget = ()=>{
    setIsForget(true);
    setIsLogin(false);
  }
  return(  
    <Modal
      className='loginbox'
      getContainer={false}
      title="有朋自远方来,不亦乐乎"
      visible={visible}
      onCancel={()=>{onCancel();setIsForget(false);setIsForget(false);setIsLogin(true);}}
      centered
      maskClosable={false}
      footer={false}
    >
      {
        isLogin?
          <Row>  
            <Col className={style.loginFormCol}> 
              <Form 
                onFinish={onFinish}
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
                    <a onClick={onForget} style={{width:'50%',textAlign:'left',display:'inline-block',color:'#fff'}}>忘记密码?</a> 
                    <a onClick={onRegister} style={{width:'50%',textAlign:'right',display:'inline-block',color:'#fff'}}>注册</a> 
                </Form.Item>  
                <Form.Item>  
                    <Button type="primary" htmlType="submit" className={style.loginBtn}>  
                        登录  
                    </Button>  
                </Form.Item>  
              </Form>  
            </Col>  
          </Row>
          :
          isForget?
            <Forget backLogin={()=>{setIsForget(false);setIsForget(false);setIsLogin(true);}}/>
            :
            isRegister?
              <Register backLogin={()=>{setIsRegister(false);setIsForget(false);setIsLogin(true);}}/>
              :
              null
      }  
    </Modal>
  )  
}  