export function getUser(){
  let user;
  localStorage.getItem('user')?
  user = JSON.parse(localStorage.getItem('user'))
  :
  user = '';
  return user;
}