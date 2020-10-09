import React from 'react';
import { Modal,Form,Input } from 'antd';
import style from './index.scss';

const {TextArea} = Input;
export default function CollectionCreateForm ({ show, onCancel, onReply }) {
  const [form] = Form.useForm();
  return (
    <Modal
      getContainer={false}
      visible={show}
      title="回复信息"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onReply(Object.assign({},values));
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
        <Form.Item name="content">
          <TextArea/>
        </Form.Item>
      </Form>
    </Modal>
  );
};