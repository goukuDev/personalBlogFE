import React from 'react';  
import {Row, Col, Form, Input, Button,message,Select} from 'antd';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import {createHashHistory} from 'history';
import style from './index.scss';    
import {forget} from '@/api/user';

const {Option} = Select;
const history = createHashHistory();
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  
export default function Forget({backLogin}){  
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values) => {
    let {data} = await forget(values);
    if(data.code === 0){
      message.success(data.message);
      // history.push('/login');
      backLogin()
    }else{
      message.error(data.message);
    }
  };


  const goLogin = ()=>{
    // history.push('/login')
    backLogin()
  }
  return(  
      <Row>  
        <Col className={style.registerFormCol}>  
          <Form 
          initialValues={{
            prefix: '86',
          }}
          onFinish={onFinish}
          className={style.registerForm}>  
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
                name="phone"
                rules={[
                  { required: true, message: '填写电话号码!' },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || phoneReg.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('手机号格式不对!');
                    },
                  }),
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='电话号码' />
              </Form.Item> 
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入新密码!',
                  },
                ]}
                hasFeedback
              >  
                <Input.Password prefix={<LockOutlined/>} placeholder="新密码" />  
              </Form.Item>  
              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '确认新密码!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('两次密码输入不一致!');
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined/>} placeholder='确认新密码'/>
              </Form.Item>
              <Form.Item>  
                  <a onClick={goLogin} style={{width:'50%',textAlign:'left',display:'inline-block',color:'#fff'}}>已有账号，直接登录</a> 
              </Form.Item>  
              <Form.Item>  
                  <Button type="primary" htmlType="submit" className={style.registerBtn}>修改密码</Button>  
              </Form.Item>  
          </Form>  
        </Col>  
      </Row>  
  )  
}  