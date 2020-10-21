import React,{useState,useEffect} from 'react';
import {
  PageHeader,
  Form, 
  Input, 
  Select,
  Button, 
  Upload, 
  message,
  Row, 
  Col,
  Tag
} from 'antd';
import axios from 'axios';
import { UploadOutlined,PlusOutlined } from '@ant-design/icons';
import {createHashHistory} from 'history';
import style from './index.scss';


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
  const [province,setProvince] = useState([]);
  const [inputVisible,setInputVisible] = useState(false);
  const [inputValue,setInputValue] = useState('');
  const [tags,setTags] = useState(['开发攻城狮','有想法','爱看电影、旅游'])


  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const onBack = () => {
    history.go(-1)
  };
  const onFinish = (values) => {
    console.log(values);
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
  },[]);



  const handleInputChange = e => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };
  const showInput = () => {
    setInputVisible(true);
  };
  return(
    <>
      <PageHeader
        className={style.PageHeader}
        onBack={onBack}
        title="返回"
      >
        <Row>
        <Col xs={24} sm={24} md={16} lg={16} xl={10}>
          <Form 
            {...layout} 
            layout="vertical" 
            name="nest-messages" 
            onFinish={onFinish} 
            validateMessages={validateMessages}
            initialValues={{
              country:'china'
            }}
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
              name="personalProfile" 
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
              <Select placeholder="请选择所在省">
                {province.map(o=><Option value={o.id} key={o.id}>{o.name}</Option>)}
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
          <div className={style.uploadAvatar}>
            <div className={style.headerAvatar}>头像</div>
            <img src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' alt='avatar'></img>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </div>
          <div className={style.tag}>
            {tags.map((o,index)=><Tag key={index}>{o}</Tag>)}
            {/* <Tag color="#2db7f5">开发攻城狮</Tag>
            <Tag color="#87d068">有想法</Tag>
            <Tag color="#108ee9">爱看电影、旅游</Tag> */}
            {inputVisible && (
              <Input
                ref={saveInputRef}
                type="text"
                size="small"
                className="tag-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag className="site-tag-plus" onClick={showInput}>
                <PlusOutlined />
              </Tag>
            )}
          </div>
        </Col>
        </Row>
      </PageHeader>
    </>
  )
}