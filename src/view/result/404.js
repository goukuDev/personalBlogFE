import React from 'react';
import { Result, Button } from 'antd';
import style from './index.scss';

export default function Index(){
  const back = () =>{
    history.go(-1);
  }
  return(
    <Result
      className={style.box}
      status="404"
      title="404"
      subTitle="页面迷路了，请返回"
      extra={<Button type="primary" onClick={back}>返回</Button>}
    />
  )
}