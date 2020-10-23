import React,{useState,useEffect} from 'react';
import {getuser} from '@/api/user';
import Admin from 'admin';
import NoAdmin from 'noadmin';
import style from './index.scss';

export default function Index(){
  const [admin,setAdmin] = useState(false);

  const getData = async ()=>{
    let {userid} = JSON.parse(localStorage.getItem('user'));
    let res = await getuser({id:userid});
    if(res.data.code === 0){
      setAdmin(res.data.data[0].admin);
    }
  };
  useEffect(()=>{
    getData()
  },[]);
  return(
    <div className={style.home}>
      {admin? 
        <Admin/>
        :
        <NoAdmin/>
      }
    </div>
  )
}