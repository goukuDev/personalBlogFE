import React, {Component} from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {uploadimg} from '@/api/user';
import style from './index.scss';
// import reqwest from 'reqwest';

class Index extends Component {
  state = {
    fileList: [],
    uploading: false,
    avatarImg:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };

  handleUpload = async () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div className={style.uploadAvatar}>
        <div className={style.headerAvatar}>头像</div>
        <img src={this.state.avatarImg} alt='avatar'></img>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>替换头像</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '上传中...' : '开始上传'}
        </Button>
      </div>
    );
  }
}

export default Index;