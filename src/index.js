import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import style from './index.scss';
import Router from './router';

ReactDOM.render(<div className={style.nodebox}>
  <ConfigProvider locale={zhCN}>
    <Router/>
  </ConfigProvider>
</div>,document.getElementById('root'));
serviceWorker.unregister();
