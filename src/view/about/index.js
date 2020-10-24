import React from 'react';
import {Card} from 'antd';
import style from './index.scss';

export default function Index(){
  return(
    <div className={style.about}>
      <Card title='关于我' className={style.card}>
        <div>我是一名前端开发，俗称码农，在这个行业摸爬滚打了三年了。自己也从刚毕业时少年郎变成现在的开发大叔。</div>
        <div>但我不想仅仅只限于做前端开发，我喜欢编程，喜欢探索跟多未知的事情。这个网站也算是我学习的一个表现，我会持续完善这个网站，有喜欢的朋友可以一起交流学习。可以留言，也可以加我的微信。</div>
      </Card>
    </div>
  )
}