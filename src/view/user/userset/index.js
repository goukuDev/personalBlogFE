import React,{useState,useEffect} from 'react';
import {
  PageHeader,
  Form, 
  Input, 
  Select,
  Button, 
  message,
  Row, 
  Col,
  Spin
} from 'antd';
import axios from 'axios';
import {createHashHistory} from 'history';
import Tags from 'tags';
import Upload from 'upload';
import style from './index.scss';
import {getuser,update} from '@/api/user';


const {Option} = Select;
const history = createHashHistory();
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '请填写${label}!',
  types: {
    email: '邮箱格式不对!',
  }
};
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;


export default function Index(){
  const [form] = Form.useForm();

  const [province,setProvince] = useState([]);
  const [tags,setTags] = useState([]);
  const [loading,setLoading] = useState(true);




  const getUser = async () =>{
    let id = JSON.parse(localStorage.getItem('user')).userid;
    let {data} = await getuser({id});
    if(data.code === 0){
      form.setFieldsValue({
        ...data.data[0]
      });
      setLoading(false);
    }
  };
  const getProvince = () =>{
    axios.get('https://proapi.azurewebsites.net//api/geographic/province')
    .then(res=>{
      if(res.status === 200){
        setProvince(res.data);
      }
    })
  }
  useEffect(()=>{
    getProvince();
    getUser();
  },[]);



  const onFinish = async (values) => {
    let {admin,username} = form.getFieldValue();
    let d = Object.assign({},values,{
              admin,
              username,
              personalTags:tags,
              id:JSON.parse(localStorage.getItem('user')).userid
            })
    let {data} = await update(d);
    if(data.code === 0){
      message.success('更新成功');
      getUser();
    }
  };
  return(
    <Spin spinning={loading}>
      <PageHeader
        className={style.PageHeader}
        onBack={()=>{history.go(-1)}}
        title="返回"
      >
        <Row>
        <Col xs={24} sm={24} md={16} lg={16} xl={10}>
          <Form 
            form={form}
            {...layout} 
            layout="vertical" 
            name="nest-messages" 
            onFinish={onFinish} 
            validateMessages={validateMessages}
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  required:true
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              name="personalmsg" 
              label="个人简介"
              rules={[
                {
                  required:true
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="country"
              label="国家/地区"
              rules={[{ required: true, message: '请选择国家/地区!' }]}
            >
              <Select placeholder="请选择国家/地区" allowClear>
                <Option value="china">中国</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="province"
              label="所在省"
              rules={[{ required: true, message: '请选择所在省!' }]}
              className="province"
            >
              <Select 
                placeholder="请选择所在省" 
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {province.map(o=><Option value={o.name} key={o.name}>{o.name}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item
              name="location"
              label="详细地址"
              rules={[{ required: true, message: '请填写详细地址!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="phone"
              label="联系方式"
              rules={[
                { required: true },
                () => ({
                  validator(rule, value) {
                    if (!value || phoneReg.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('手机号格式不对!');
                  },
                }),
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新信息
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} className={style.col}>
          <Upload/>
          <div className={style.tag}>
            <Tags getTags={(e)=>setTags(e)}></Tags>
          </div>
        </Col>
        </Row>
      </PageHeader>
    </Spin>
  )
}