import React from 'react';
import { 
  Carousel,
  Col,
  Row,
  Card,
  Avatar,
  Tooltip, 
  Tag,
  Timeline
} from 'antd';
import { 
  EditOutlined, 
  GithubOutlined, 
  createFromIconfontCN,
  Html5Outlined
} from '@ant-design/icons';
import { createHashHistory } from 'history';
import style from './noadmin.scss';


const {Meta} = Card;
const history = createHashHistory();
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1620850_72i6hlneveh.js',
});


export default function Index(){
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return(
    <div className={style.noadmin}>
      <div className={style.banner}>
        <Carousel effect="fade" autoplay autoplaySpeed={10000} dots={false}>
          {[1,2,3,4,5].map((o,index)=>{
            return(
              <div key={index}>
                <div style={{
                  height: '600px',
                  color: '#fff',
                  lineHeight: '600px',
                  textAlign: 'center',
                  margin:0,
                  background: `url(${require(`@/assets/img/bg${o}.jpg`)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition:'50%',
                  backgroundSize: 'cover'
                }}></div>
              </div>
            )
          })}
        </Carousel>
        <h1>相信美好的事情即将发生</h1>
      </div>
      <div className={style.content}>
        <Row>
          <Col xs={24} sm={24} md={11} lg={14} xl={14} className='left'>
            <Card style={{ width: '95%', margin:'20px auto 0' }}></Card>
            <Card style={{ width: '95%', margin:'20px auto 0' }}></Card>
            <Card style={{ width: '95%', margin:'20px auto 0' }}></Card>
          </Col>
          <Col xs={24} sm={24} md={11} lg={8} xl={8} className='right'>
            <Card
              hoverable
              style={{ width: 300, margin:'auto' }}
              cover={
                <img
                  alt="example"
                  src={require('@/assets/img/home_avatar_1.jpg')}
                />
              }
              actions={[
                <Tooltip title="项目地址">
                  <a href="https://github.com/syhITMAN/personalBlogFE/tree/develop" target="_blank">                  
                    <GithubOutlined key="github" />
                  </a>
                </Tooltip>,
                <Tooltip title="留言">
                  <EditOutlined key="edit" onClick={()=>{history.push('/message')}}/>
                </Tooltip>,
                <Tooltip 
                title={
                  <img style={{width:100,height:100}} src={require('@/assets/img/wxxcx.jpg')}/>
                }
                trigger='[click]'
                >
                  <IconFont type="iconxiaochengxu"/>
                </Tooltip>,
                <Tooltip 
                title={
                  <img style={{width:100,height:100}} src={require('@/assets/img/wxgzh.jpg')}/>
                }
                trigger='[click]'
                >
                  <IconFont type="icongongzhonghao"/>
                </Tooltip>,
              ]}
            >
              <Meta
                avatar={<Avatar src={require('@/assets/img/home_avatar_1.jpg')} />}
                title="Shiyonghua"
                description="欢迎来到我的博客"
              />
            </Card>
            <Card style={{ width: 300, margin:'20px auto 0' }}>
              <Tag color="#198f27">
                javascript
              </Tag>
              <Tag color="#2db7f5">css</Tag>
              <Tag color="#edac5a" icon={<Html5Outlined />}>html5</Tag>
              <Tag color="#2762b9">
                <a href='https://cn.vuejs.org/v2/guide/' target="_blank">
                  vue
                </a>
              </Tag>
              <Tag color="#0b5f9a">
                <a href='https://react.docschina.org/' target="_blank">
                  react
                </a>
              </Tag>
              <Tag color="#52c41a">
                <a href='http://nodejs.cn/' target="_blank">
                  node
                </a>
              </Tag>
              <Tag color="#0d4b66">
                <a href='http://www.electronjs.org/' target="_blank">
                  electron
                </a>
              </Tag>
              <Tag color="#2db7f5">
                <a href='https://github.com/syhITMAN/uniappWeather' target="_blank">
                  小程序
                </a>
              </Tag>
              <Tag color="#000" icon={<GithubOutlined />}>
                <a href='https://github.com/syhITMAN/personalBlogFE/tree/develop' target="_blank">
                  git
                </a>
              </Tag>
            </Card>
            <Card style={{ width: 300, margin:'20px auto 0' }}>
              <Carousel dotPosition='right' autoplay autoplaySpeed={10000} dots={false}>
                {[1,2,3,4,5].map((o,index)=>{
                  return(
                    <div key={index}>
                      <div style={{
                        height: 240,
                        color: '#fff',
                        lineHeight: 240,
                        textAlign: 'center',
                        backgroundImage: `url(${require(`@/assets/img/bg${o}.jpg`)})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition:'50%',
                        backgroundSize: 'cover',
                        position:'relative'
                      }}>
                      </div>
                    </div>
                  )
                })}
              </Carousel>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}