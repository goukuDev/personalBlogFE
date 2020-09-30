import React,{useState,useEffect} from 'react';
import {getMockData} from '@/api/mock';
import {Table,Pagination,Modal,message} from 'antd';
import {
  ExclamationCircleOutlined
} from '@ant-design/icons';

const {confirm} = Modal;
export default function Index(){
  const columns = [
    {
      title: '姓名',
      align:'center',
      dataIndex: 'name',
    },
    {
      title: '地址',
      align:'center',
      dataIndex: 'address',
    },
    {
      title: '时间',
      align:'center',
      dataIndex: 'date',
    },
    {
      title: '文本',
      dataIndex: 'text',
    },
    {
      title: '性别',
      align:'center',
      dataIndex:'gender',
      render:(e)=>{
        return(
        <>{e? '男':'女'}</>
        )
      }
    },
    {
      title:'操作',
      align:'center',
      render:(row)=>{
        return(
          <a onClick={()=>deleted(row)}>删除</a>
        )
      }
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
    let res = await getMockData();
    if(res.status === 200){
      setData(res.data);
      setLoading(false);
      setPagination({
        ...pagination,
        total:res.data.length
      })
    }
  };
  useEffect(()=>{
    getData()
  },[]);

  const deleted = (e) =>{
    confirm({
      title: '确定删除数据吗?',
      icon: <ExclamationCircleOutlined />,
      centered:true,
      maskClosable:true,
      content: '删除后数据不能恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=> {
        setData(data.filter(o=>o.id !== e.id))
        message.success('删除成功');
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  };
  return(
    <>
      <Table 
        loading={loading}
        rowKey={(row) => row.id} 
        pagination={false}
        dataSource={data} 
        scroll={{y:600}}
        columns={columns}>
      </Table>
      <Pagination 
        style={{marginTop:15,textAlign:'right'}}
        showTotal={total => `共${total}条`}
        total={pagination.total} 
        current={pagination.pageNum}
        defaultPageSize={pagination.pageSize}
      />
    </>
  )
}