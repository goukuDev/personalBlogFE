import React,{Component} from 'react';
import { Table,Modal,message,Divider,Button,Pagination,Card} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getMovieList,addmovie,removemovie,getMovieById,updateMovie} from '@/api/movie';
import CollectionCreateForm from './CollectionCreateForm';
import {getUser,islogin} from '@/utils/util';
import style from './index.scss';

const {confirm} = Modal;
export default class Index extends Component{
  state = {
    data:[],
    loading:false,
    visible:false,
    pagination:{
      total: 0,
      pageNum: 1,
      pageSize: 10,
      pageSizeOptions: ['1', '10', '20', '50', '100'],
    },
    movieData:{},
    musicData:[],
  }
  componentDidMount(){
    this.getlist();
  }
  //获取电影列表数据
  getlist = async () =>{
    if(!await islogin()) return;

    let {pageNum,pageSize} = this.state.pagination;
    this.setState({
      loading:true
    });
    let {data} = await getMovieList({page:pageNum,pageSize:pageSize,userId:getUser().userid});
    if(data.code === 0){
      let pagination = Object.assign({},this.state.pagination,{
        total:data.total
      });
      this.setState({
        loading:false,
        data:(data.data || []).map(o=>Object.assign({},o,{id:o._id,highPraiseRate:`${(100*o.highPraiseRate).toFixed(2)}%`})),
        pagination:pagination
      })
    }
  };
  //删除
  deleteMovie = (row) =>{
    confirm({
      title: `确定删除${row.movieName}吗?`,
      icon: <ExclamationCircleOutlined />,
      centered:true,
      maskClosable:true,
      content: '删除后数据不能恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk:async ()=> {
        if(!await islogin()) return message.error('请先登录');

        let {data} = await removemovie({id:row.id});
        if(data.code === 0){
          message.success('删除成功');
          this.getlist();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  };
  //编辑
  editMovie = async (row) =>{
    if(!await islogin()) return message.error('请先登录');

    let {data} = await getMovieById({id:row.id});
    if(data.code === 0){
      this.setState({
        visible:true,
        movieData:data.data[0]
      })
    }
  };
  //新增
  onCreate = async (values) => {
    if(!await islogin()) return message.error('请先登录');

    let movieData = Object.assign({},values,{
      ticketPrice: values.ticketPrice? values.ticketPrice : 40,
      highPraiseRate: values.highPraiseRate? values.highPraiseRate : 0.6,
      score: values.score? values.score : 60,
      userId:getUser().userid
    })
    let res;
    if(!!values.id){
      res = await updateMovie(movieData); 
    }else{
      res = await addmovie(movieData);
    }
    if(res.data.code === 0){
      message.success(`${values.id? '编辑成功':'新增成功'}`);
      this.setState({visible:false})
      this.getlist();
    }
  };
  onChange = (page,pageSize)=>{
    let pagination = Object.assign({},this.state.pagination,{
      pageNum:page,
      pageSize:pageSize
    })
    this.setState({
      pagination:pagination
    },()=>{
      this.getlist();
    });
  }
  render(){
    const columns = [
      {
        title: '电影名称',
        dataIndex: 'movieName',
      },
      {
        title: '上映时间',
        dataIndex: 'releaseTime',
      },
      {
        title: '票价（元）',
        dataIndex: 'ticketPrice',
      },
      {
        title: '评分',
        dataIndex: 'score',
      },
      {
        title: '好评率',
        dataIndex: 'highPraiseRate',
      },
      {
        title:'操作',
        align:'center',
        render:(row)=>{
          return(
              <>
              <a onClick={()=>this.editMovie(row)}>编辑</a>
              <Divider type='vertical'></Divider>            
              <a onClick={()=>this.deleteMovie(row)}>删除</a>
              </>
          )
        }
      }
    ];
    return (
      <div className={style.moviebox}>
        <Card 
        title="电影收集" 
        extra={
          <Button type="primary" onClick={()=>{this.setState({visible:true,movieData:{}})}}>新增</Button>
        } 
        className={style.card}>
          <div className={style.tablebox}>
            <Table 
              loading={this.state.loading}
              rowKey={(row) => row.id} 
              pagination={false}
              dataSource={this.state.data} 
              columns={columns}>
            </Table>
            <Pagination 
              style={{marginTop:15,textAlign:'right'}}
              showSizeChanger
              showTotal={total => `共${total}条`}
              total={this.state.pagination.total} 
              current={this.state.pagination.pageNum}
              defaultPageSize={this.state.pagination.pageSize}
              pageSizeOptions={this.state.pagination.pageSizeOptions}
              onChange={this.onChange}
            />
          </div>
          <CollectionCreateForm
            movieData={this.state.movieData}
            show={this.state.visible}
            onCreate={this.onCreate}
            onCancel={() => {this.setState({visible:false})}}
          />
        </Card>
      </div>
    )
  }
};