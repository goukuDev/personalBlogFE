import React, {Component} from 'react';
import {Card,Table} from 'antd';
import {getUserList} from '@/api/user';
import style from './admin.scss';

export default class Index extends Component{
  state = {
    loading:false,
    data:[]
  }


  componentDidMount(){
    this.getData();
  };
  getData = async ()=>{
    this.setState({
      loading:true
    })
    let {data} = await getUserList();
    if(data.code === 0){
      this.setState({
        loading:false,
        data:data.data
      });
    }
  };
  render(){
    const columns = [
      {
        title: '姓名',
        align:'center',
        dataIndex: 'name',
      },
      {
        title: '用户名',
        align:'center',
        dataIndex: 'username',
      },
      {
        title: '手机号',
        align:'center',
        dataIndex: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      }
    ];
    return(
      <>
        <Card title='用户' className={style.card}>
          <div className={style.tablebox}>
            <Table 
              loading={this.state.loading}
              rowKey={(row) => row._id} 
              pagination={false}
              dataSource={this.state.data} 
              columns={columns}>
            </Table>
          </div>
        </Card>
        <div style={{height:600}}></div>
      </>
    )
  }
}