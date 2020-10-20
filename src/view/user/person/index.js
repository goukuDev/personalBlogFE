import React from 'react';
import {PageHeader} from 'antd';
import {createHashHistory} from 'history';

const history = createHashHistory();

export default function Index(){
  const onBack = () => {
    history.go(-1)
  }
  return(
    <>
      <PageHeader
        className="site-page-header"
        onBack={onBack}
        title="返回"
      >
      关于我为什么要开发这个网站的原因
      </PageHeader>
    </>
  )
}