import React from 'react';
import Home from '@/view/home';
import Movie from '@/view/movie';
import Chat from '@/view/chat';
import Message from '@/view/message';
import {outRouter} from './router.config';
import Layout from '@/layout/layout';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

function AuthRoute({ roleName, component: Component, ...rest }) {
  return (
      <Route
          {...rest}
          render={props => {
              return localStorage.getItem('token') && ['home','movie','chat','message'].includes(roleName) ? (
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

export default function Index(){
  return(
    <HashRouter>
      <Switch>
        { outRouter.map(item => <Route path={item.path}  component={item.component} key={item.path}/>) }
        <AuthRoute exact roleName='home' path='/' component={Home}/>
        <AuthRoute roleName='home' path='/home' component={Home}/>
        <AuthRoute roleName='movie' path='/movie' component={Movie}/>
        <AuthRoute roleName='chat' path='/chat' component={Chat}/>
        <AuthRoute roleName='message' path='/message' component={Message}/>
        <Redirect to='/404'/>
      </Switch>
    </HashRouter>
  )
}