import React,{useState,useEffect} from 'react';
import {getuserMsg} from '@/api/user';
import Admin from 'admin';
import NoAdmin from 'noadmin';
import style from './index.scss';
import {getUser,islogin} from '@/utils/util';

export default function Index(){
  const [admin,setAdmin] = useState(false);

  const getData = async ()=>{
    let res = await getuserMsg({id:getUser().userid});
    if(res.data.code === 0 && !!res.data.data.length){
      setAdmin(res.data.data[0].admin);
    }
  };
  useEffect(()=>{
    async function iflogin(){
      if(!await islogin()) return;
      getData();
    }
    iflogin();
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