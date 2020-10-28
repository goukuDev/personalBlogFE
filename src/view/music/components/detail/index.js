import React,{useState,useEffect} from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import {
  Modal,
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
  const [params,setParams] = useState('');
  const [play,setPlay] = useState(false);
  const [mvUrl,setmvUrl] = useState(false);

  const getParams = () =>{
    setLoading(false);
    const {location}=props;
    if(location.state){//判断当前有参数
      setParams(location.state);
      sessionStorage.setItem('data',JSON.stringify(location.state));// 存入到sessionStorage中
    }else{
      setParams(JSON.parse(sessionStorage.getItem('data')));// 当state没有参数时，取sessionStorage中的参数
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

  // 音乐播放
  const onPlay = () =>{
    setPlay(true)
  }
  const onPause = () =>{
    setPlay(false)
  }
  //打开mv
  const openMv = () =>{
    setmvUrl(true)
  }
  const handleCancel = e => {
    const video = document.getElementById('video');
    video.pause();
    setmvUrl(false)
  };
  //打开mv后自动关闭音乐
  const onPlayMv = () =>{
    audio.pause();
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
              <Col xs={24} sm={24} md={14} lg={14} xl={10}>
                <Avatar src={params?.item?.al?.picUrl} className={play? 'play':''}/>
                {
                  !!params?.item?.mv?
                  <IconFont type="iconVideoClip-1" onClick={openMv}/>
                  :
                  <></>
                }
              </Col>
              <Col xs={24} sm={24} md={10} lg={10} xl={14}>
                {
                  params?
                  <h2>{params?.item?.name}</h2>
                  :
                  <></>
                }  
                <ReactAudioPlayer
                  onPlay={onPlay}
                  onPause={onPause}
                  id='audio'
                  src={`https://music.163.com/song/media/outer/url?id=${params?.item?.id}.mp3`}
                  autoPlay={false}
                  controls
                />
                <div>{params?.item?.ar.map(o=>o.name).join('、')}</div>
              </Col>
            </Row>
          </div>
          <div className={style.musicword}>
            ---暂时没有歌词---
          </div>
        </div>
        <Modal
          title="MV"
          centered
          getContainer={false}
          maskClosable={false}
          visible={mvUrl}
          onCancel={handleCancel}
          footer={null}
        >
          <Player
            playsInline
            onPlay={onPlayMv}
            videoId='video'
            src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
          />
        </Modal>
      </PageHeader>
    </Spin>
  )
}