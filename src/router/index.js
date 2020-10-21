import React from 'react';


import Layout from '@/layout/layout';
import Home from '@/view/home';
import Movie from '@/view/movie';
import UserSet from '@/view/user/userset';
import UserCenter from '@/view/user/usercenter';
import Message from '@/view/message';


import LoginLayout from '@/view/user';
import {outRouter} from './router.config';


import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';


/**
 * 判断是否应该进入登录页面
 * @param {*} param0 
 */
function AuthRoute({ roleName, component: Component, ...rest }) {
  return (
      <Route
          {...rest}
          render={props => {
              return localStorage.getItem('token') && ['home','movie','chat','message','userset','usercenter'].includes(roleName) ? (
                  <Layout>
                    <Component {...props} />
                  </Layout>
              ) : (
                  <Redirect
                      to={{
                          pathname: '/login',
                          state: { from: props.location }
                      }}
                  />
              );
          }}
      />
  );
}

/**
 * 登录组件公共模块
 * @param {*} param0 
 */
function LoginRoute({ component: Component, ...rest }) {
  return (
      <Route
          {...rest}
          render={props => {
              return (
                <LoginLayout>
                  <Component {...props} />
                </LoginLayout>
              )
          }}
      />
  );
}

export default function Index(){
  return(
    <HashRouter>
      <Switch>
        { outRouter.map(item => <LoginRoute path={item.path}  component={item.component} key={item.path}/>) }
        <AuthRoute exact roleName='home' path='/' component={Home}/>
        <AuthRoute roleName='home' path='/home' component={Home}/>
        <AuthRoute roleName='movie' path='/movie' component={Movie}/>
        <AuthRoute roleName='message' path='/message' component={Message}/>
        <AuthRoute roleName='userset' path='/userset' component={UserSet}/>
        <AuthRoute roleName='usercenter' path='/usercenter' component={UserCenter}/>
        <Redirect to='/404'/>
      </Switch>
    </HashRouter>
  )
}