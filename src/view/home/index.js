import React,{useState,useEffect} from 'react';
import {getUserList} from '@/api/user';
import {Table,Pagination,Modal,message,Card} from 'antd';
import {
  ExclamationCircleOutlined
} from '@ant-design/icons';
import style from './index.scss';

const {confirm} = Modal;
export default function Index(){
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
  ]
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [pagination,setPagination] = useState({
    total: 0,
    pageNum: 1,
    pageSize: 10
  });

  const getData = async ()=>{
    setLoading(true);
    let {data} = await getUserList();
    if(data.code === '0'){
      setData(data.data);
      setLoading(false);
      setPagination({
        ...pagination,
        total:data.data.length
      })
    }
  };
  useEffect(()=>{
    getData()
  },[]);
  return(
    <div className={style.home}>
      <Card title='用户' className={style.card}>
        <div className={style.tablebox}>
          <Table 
            loading={loading}
            rowKey={(row) => row._id} 
            pagination={false}
            dataSource={data} 
            columns={columns}>
          </Table>
          <Pagination 
            style={{marginTop:15,textAlign:'right'}}
            showTotal={total => `共${total}条`}
            total={pagination.total} 
            current={pagination.pageNum}
            defaultPageSize={pagination.pageSize}
          />
        </div>
      </Card>
    </div>
  )
}