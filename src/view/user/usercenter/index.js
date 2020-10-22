import React,{useState,useEffect} from 'react';
import {
  PageHeader,
  Row, 
  Col,
  Spin,
  Divider,
  Tag 
} from 'antd';
import {HomeOutlined,MobileOutlined,MailOutlined} from '@ant-design/icons';
import {createHashHistory} from 'history';
import style from './index.scss';
import {getuser} from '@/api/user';


const history = createHashHistory();


export default function Index(){
  const [loading,setLoading] = useState(true);
  const [avatarImg,setAvatarImg] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');
  const [Data,setData] = useState({});



  const getUser = async () =>{
    let id = JSON.parse(localStorage.getItem('user')).userid;
    let {data} = await getuser({id});
    if(data.code === 0){
      setData(data.data.length? data.data[0]:{})
      setLoading(false);
    }
  };
  useEffect(()=>{
    getUser();
  },[]);

  return(
    <Spin spinning={loading}>
      <PageHeader
        className={style.PageHeader}
        onBack={()=>{history.go(-1)}}
        title="返回"
      >
        <Row>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} className={style.col}>
            <img src={avatarImg} alt='avatar' className={style.avatarImg}></img>
            <h3>{Data.name}</h3>
            <div>{Data.personalmsg}</div>
            <div>
              <HomeOutlined />
              &nbsp;&nbsp;&nbsp;
              {`${Data.country}-${Data.location}`}
            </div>
            <div>
              <MobileOutlined />
              &nbsp;&nbsp;&nbsp;
              {Data.phone}
            </div>
            <div>
              <MailOutlined />
              &nbsp;&nbsp;&nbsp;
              {Data.email}
            </div>
            <Divider dashed={true}/>
            <h4>标签</h4>
            {Data.personalTags && Data.personalTags.map((o,index)=><Tag key={index}>{o}</Tag>)}
          </Col>
        </Row>
      </PageHeader>
    </Spin>
  )
}