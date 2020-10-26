import {isLogin} from '@/api/user';

export function getUser(){
  let user;
  localStorage.getItem('user')?
  user = JSON.parse(localStorage.getItem('user'))
  :
  user = '';
  return user;
}

export async function islogin (){
  let login;
  if(!getUser()){
    login = false;
    localStorage.clear();
  }else{
    let {data} = await isLogin({id:getUser().userid});
    if(!!data?.data[0]?.isLogin){
      login = true;
    }else{
      login = false;
      localStorage.clear();
    }
  }
  return login;
}