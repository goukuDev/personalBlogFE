import React,{Component} from 'react';
import {Layout,Affix, Button, Modal, Input, message, Tooltip} from 'antd';
import {IssuesCloseOutlined,WechatOutlined} from '@ant-design/icons'
import Header from '@/layout/header';
import {addfeedback} from '@/api/feedback';
import {getUser,islogin} from '@/utils/util';
import style from './index.scss';

const {TextArea} = Input;
const {Content,Footer} = Layout;

export default class Index extends Component{
  state = {
    visible:false,
    value:''
  }
  onOk = async () =>{
    if(!await islogin()) return message.error('请先登录');
    
    let {data} = await addfeedback({
      content:this.state.value,
      username:getUser().username,
      date:new Date(),
    });
    if(data.code === 0){
      this.setState({
        visible:false,
        value:''
      })
      message.success('感谢提出宝贵的意见')
    }
  }
  onPressEnter = (e)=> {
    if (e.key == 'Enter') {
        this.onOk()
    }
    return false;
  }
  render(){
    return(
      <Layout className={style.layout}>
        <Header props={this.props.children.props.location}></Header>
        <div className={style.container}>
          <Content>
            <React.Fragment>
              {this.props.children}
            </React.Fragment>
            <Affix style={{ position: 'fixed', bottom: 88, right: 20 }}>
              <Tooltip placement="left" trigger='[click]' title={<img style={{width:100,height:100}} src={require('@/assets/img/wx.jpg')}></img>}>
                <Button 
                  type="primary" 
                  shape="circle"
                  icon={<WechatOutlined />}
                  >
                </Button>
              </Tooltip>
            </Affix>
            <Affix style={{ position: 'fixed', bottom: 48, right: 20 }}>
              <Tooltip placement="left" title='反馈'>
                <Button 
                  type="primary" 
                  shape="circle"
                  onClick={()=>this.setState({visible:true})} 
                  icon={<IssuesCloseOutlined/>}
                  >
                </Button>
              </Tooltip>
            </Affix>
          </Content>
          <Footer>
            Copyright &copy; {this.state.year} shiyh.top 版权所有 <a href='https://beian.miit.gov.cn' target='_blank'>浙ICP备2020037581号</a>
          </Footer>
        </div>
        <Modal
          title="反馈意见"
          centered
          maskClosable={false}
          visible={this.state.visible}
          onOk={this.onOk}
          okButtonProps={{ disabled: !this.state.value }}
          onCancel={() => this.setState({visible:false,value:''})}
        >
          <TextArea 
            onPressEnter={(e)=>this.onPressEnter(e)} 
            placeholder='回车/确定发送消息' 
            style={{resize:'none',height:'100px'}} 
            onChange={(e)=>this.setState({value:e.target.value})} 
            value={this.state.value}
          />
        </Modal>
      </Layout>
    )
  }
}