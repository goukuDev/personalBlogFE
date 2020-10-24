import React from 'react';
import { Carousel } from 'antd';
import style from './noadmin.scss';


export default function Index(){
  return(
    <div className={style.noadmin}>
      <div className={style.banner}>
        <Carousel effect="fade" autoplay autoplaySpeed={10000}>
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
        <h1>哈哈哈哈哈，还没想好这里写一些什么东西。</h1>
      </div>
    </div>
  )
}