import React,{useState,useEffect} from 'react';
import { 
  Carousel,
  Col,
  Row,
  Card,
  Avatar,
  Tooltip, 
  Tag,
  DatePicker
} from 'antd';
import { 
  EditOutlined, 
  GithubOutlined, 
  createFromIconfontCN,
  Html5Outlined
} from '@ant-design/icons';
import { createHashHistory } from 'history';
import moment from 'moment';
import axios from 'axios';
import style from './noadmin.scss';


const {Meta} = Card;
const history = createHashHistory();
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1620850_72i6hlneveh.js',
});


export default function Index(){
  const [Constellation,setConstellation] = useState('');
  const [opendate,setOpendate] = useState('');
  const [location,setLocation] = useState('');
  const article = require('@/assets/json/article.json');

  useEffect(()=>{
     initGetConstellation();
     setInterval(()=>{
       getOpenDay();
     },1000);
     getLocaltion();
  },[])
  const initGetConstellation = () =>{
    getConstellation((new Date()).getMonth()+1,(new Date()).getDate());
  }
  // 星座
  const getConstellation = (m,d) => { 
      let s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      let arr = [20,19,21,21,21,22,23,23,23,23,22,22];
      return `${s.substr(m*2-(d<arr[m-1]?2:0),2)}座`;
  }
  // 改变时间后的星座
  const onChange = (d,dateString) => {
    setConstellation('');
    const getDate = new Date(dateString);
    const month = getDate.getMonth() + 1;
    const date = getDate.getDate();
    setConstellation(getConstellation(month,date));
  }
  //博客开通时间
  const getOpenDay = () => {
    let time=new Date();
    let opentime=new Date("2020/10/20");
    
    const dateDiff = time.getTime() - opentime.getTime();//时间差的毫秒数
    const days = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数

    const leave1 = dateDiff%(24*3600*1000) //计算天数后剩余的毫秒数
    const hours = Math.floor(leave1/(3600*1000))//计算出小时数

    //计算相差分钟数
    const leave2 = leave1%(3600*1000) //计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2/(60*1000))//计算相差分钟数

    //计算相差秒数
    const leave3 = leave2%(60*1000) //计算分钟数后剩余的毫秒数
    const seconds = Math.round(leave3/1000)
    setOpendate(`${days}天 ${hours}时 ${minutes}分 ${seconds}秒`);
  }
  //当地的天气
  const getLocaltion = () => {
    axios.get('https://restapi.amap.com/v3/ip?key=c336900aba752fc9549a670d19a93d4f')
    .then(({data})=>{
      if(data.status === '1'){
        axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${data.adcode}&key=c336900aba752fc9549a670d19a93d4f`)
        .then(({data})=>{
          if(data.status === '1'){
            setLocation(data?.lives[0])
          }
        })
      }
    })
  }
  return(
    <div className={style.noadmin}>
      <div className={style.banner}>
        <Carousel effect="fade" autoplay autoplaySpeed={6000} dots={false}>
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
            <Card style={{ width: '95%', margin:'20px auto 0' }}>
              <h3>
                今天是{`${(new Date()).getFullYear()}年${(new Date()).getMonth()+1}月${(new Date()).getDate()}日,属于${getConstellation((new Date()).getMonth()+1,(new Date()).getDate())}`}
              </h3>
              <div>
                <span style={{marginRight:10,marginBottom:10}}>选择你的生日,看看你的星座是什么吧.</span>
                <DatePicker 
                  showToday={false}
                  allowClear={false}
                  defaultValue={moment(`${(new Date()).getFullYear()}/${(new Date()).getMonth()+1}/${(new Date()).getDate()}`,'YYYY/MM/DD')}
                  onChange={onChange} 
                />
                <span style={{marginLeft:10,marginTop:10}}>{Constellation}</span>
              </div>
            </Card>
            {
              article.map((o,index)=>
                <Card style={{ width: '95%', margin:'20px auto 0', cursor:'pointer' }} key={index}>
                  <a href={o.url} target="_blank">
                    <h3 key={index}>{o.title}</h3>
                  </a>
                </Card>
              )
            }
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
              <div>博客已开通</div>
              <h3>{opendate}</h3>
              {location.province}{location.city}，{location.weather}，当前温度{location.temperature}℃
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}