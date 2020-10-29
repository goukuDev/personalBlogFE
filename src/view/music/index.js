import React from 'react';
import { List, Avatar, Card} from 'antd';
import LazyLoad from 'react-lazyload';
import style from './index.scss';


export default function Index(props){
  const history = props.history;
  console.log(props)
  // 获取本地音乐数据
  const data = require('@/assets/json/music.json');
  return (
    <div className={style.musicbox}>
      <Card 
      title="音乐" 
      className={style.card}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item onClick={()=>{history.push({ pathname:'/musicDetail',state:{item} })}}>
              <List.Item.Meta
                avatar={
                  <LazyLoad 
                    scroll={true} 
                    overflow={true}
                    height={32}> 
                      <Avatar src={item?.al?.picUrl} />
                  </LazyLoad>
                }
                title={<span>{item.name}</span>}
                description={item.ar.map(o=>o.name)}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
};