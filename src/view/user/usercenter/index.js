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
import {getuserMsg} from '@/api/user';
import {getUser} from '@/utils/util';


const history = createHashHistory();


export default function Index(){
  const [loading,setLoading] = useState(true);
  const [avatarImg,setAvatarImg] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');
  const [Data,setData] = useState({});



  const UserMsg = async () =>{
    let {userid} = getUser();
    let {data} = await getuserMsg({id:userid});
    if(data.code === 0){
      setData(data.data.length? data.data[0]:{})
      setLoading(false);
    }
  };
  useEffect(()=>{
    UserMsg();
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
            {
              Data.country?
              <div>
                <HomeOutlined />
                &nbsp;&nbsp;&nbsp;
                {`${Data.country}-${Data.location}`}
              </div>
              :
              null
            }
            <div>
              <MobileOutlined />
              &nbsp;&nbsp;&nbsp;
              {Data.phone}
            </div>
            {
              Data.email?
              <div>
                <MailOutlined />
                &nbsp;&nbsp;&nbsp;
                {Data.email}
              </div>
              :
              null
            }
            <Divider dashed={true}/>
            {
              Data.personalTags && !!Data.personalTags.length?
              <div>
                <h4>标签</h4>
                {Data.personalTags && Data.personalTags.map((o,index)=><Tag key={index}>{o}</Tag>)}
              </div>
              :
              null
            }
          </Col>
        </Row>
      </PageHeader>
    </Spin>
  )
}