/**
 * 
 * 配置路由页面
 * 
 */
import Home from '@/view/home';
import Movie from '@/view/movie';
// import Login from '@/view/user/login';
// import Register from '@/view/user/register';
// import Forget from '@/view/user/forget';
import noPath from '@/view/result/404';

const mainRouter = [
  {
    path:'/home',
    component:Home,
    roleName:'home',
  },
  {
    path:'/movie',
    component:Movie,
    roleName:'movie'
  }
];
const outRouter = [
  // {
  //   path:'/login',
  //   component:Login
  // },
  // {
  //   path:'/register',
  //   component:Register
  // },
  // {
  //   path:'/forget',
  //   component:Forget
  // },
  {
    path:'/404',
    component:noPath
  }
]

export {
  mainRouter,
  outRouter
}