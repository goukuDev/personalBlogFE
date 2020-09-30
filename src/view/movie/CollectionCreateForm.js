import React,{useEffect} from 'react';
import { Modal,Form,Input,InputNumber } from 'antd';
import style from './index.scss';

export default function CollectionCreateForm ({ movieData,show, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const showData = () =>{
    if(!Object.values(movieData).length){
      form.setFieldsValue({
        movieName: '',
        releaseTime: '',
        ticketPrice: '',
        score: '',
        highPraiseRate: '',
      });
    }else{
      form.setFieldsValue({
        ...movieData
      })
    }
  }
  useEffect(()=>{
    showData()
  },[movieData])
  return (
    <Modal
      getContainer={false}
      visible={show}
      title="新增电影信息"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(Object.assign({},values,{id:movieData._id}));
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      className={style.modalForm}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="movieName"
          label="电影名称"
          rules={[
            {
              required: true,
              message: '请填写电影名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="releaseTime" 
          label="上映时间"
          rules={[
            {
              required: true,
              message: '请填写上映时间!',
            },
          ]}
        >
          <InputNumber min={1970} max={9999} />
        </Form.Item>
        <Form.Item 
          name="ticketPrice" 
          label="票价"
        >
          <InputNumber min={0} max={100}  placeholder='票价默认是40'/>
        </Form.Item>
        <Form.Item 
          name="score" 
          label="评分"
        >
          <InputNumber min={0} max={100}  placeholder='评分0-100,默认是60'/>
        </Form.Item>
        <Form.Item 
          name="highPraiseRate" 
          label="好评率"
        >
          <InputNumber min={0} max={1}  placeholder='好评率0-1,默认是0.6'/>
        </Form.Item>
      </Form>
    </Modal>
  );
};