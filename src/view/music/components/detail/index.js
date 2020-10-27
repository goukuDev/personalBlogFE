import React,{useState,useEffect} from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import {
  Button,
  PageHeader,
  Spin,
  Avatar,
  Col,
  Row
} from 'antd';
import ReactAudioPlayer from 'react-audio-player';
import { Player } from 'video-react';
import style from './index.scss';


const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1620850_qa2fn6hbwp.js',
});
export default function Index(props){
  const audio = document.getElementById('audio');
  const history = props.history;

  const [loading,setLoading] = useState(false);
  const [recvParam,setRecvParam] = useState('');
  const [play,setPlay] = useState(false);
  const [mvUrl,setmvUrl] = useState('');

  const getParams = () =>{
    setLoading(false);
    const {location}=props;
    if(location.state){//判断当前有参数
      setRecvParam(location.state);
      sessionStorage.setItem('data',JSON.stringify(location.state));// 存入到sessionStorage中
    }else{
      setRecvParam(JSON.parse(sessionStorage.getItem('data')));// 当state没有参数时，取sessionStorage中的参数
    }
  }

  useEffect(()=>{
    setLoading(true);
    setTimeout(() => {
      getParams();
    }, 800);
  },[]);
  const onBack = () =>{
    history.go(-1);
    sessionStorage.clear();
  }

  const onPlay = () =>{
    setPlay(true)
  }
  const onPause = () =>{
    setPlay(false)
  }
  const openMv = ({mvUrl}) =>{
    setmvUrl(mvUrl);
  }
  const onPlayVideo = () =>{
    onPause();
    console.log(123456)
  }
  return(
    <Spin spinning={loading}>
      <PageHeader
        className={style.PageHeader}
        onBack={onBack}
        title="返回"
      >
        <div className={style.musicdetail}>
          <div className={style.title}>
            <Row>
              <Col xs={24} sm={24} md={16} lg={16} xl={10}>
                <Avatar src={recvParam?.item?.al?.picUrl} className={play? 'play':''}/>
                {
                  recvParam?.item?.mvUrl?
                  <IconFont type="iconVideoClip-1" onClick={()=>{openMv(recvParam.item)}}/>
                  :
                  <></>
                }
              </Col>
              <Col xs={24} sm={24} md={16} lg={16} xl={10}>
                {
                  recvParam?
                  <h2>{`《${recvParam?.item?.name}》`}</h2>
                  :
                  <></>
                }  
                <ReactAudioPlayer
                  onPlay={onPlay}
                  onPause={onPause}
                  id='audio'
                  src={`http://music.163.com/song/media/outer/url?id=${recvParam?.item?.id}.mp3`}
                  autoPlay={false}
                  controls
                />
                <div>{recvParam?.item?.ar.map(o=>o.name).join('、')}</div>
              </Col>
            </Row>
          </div>
          <div className={style.musicword}>
            ---暂时没有歌词---
          </div>
          <Row>
            <Col xs={24} sm={24} md={16} lg={16} xl={10} style={{margin:'30px auto 0'}}>
              {
                mvUrl?
                <Player
                  playsInline
                  Play={()=>{onPlayVideo}}
                  src={mvUrl}
                />
                :
                <></>
              }
            </Col>
          </Row>
        </div>
      </PageHeader>
    </Spin>
  )
}