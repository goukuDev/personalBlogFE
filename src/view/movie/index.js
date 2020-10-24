import React,{Component} from 'react';
import { Table,Modal,message,Divider,Button,Pagination,Card} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getMovieList,addmovie,removemovie,getMovieById,updateMovie} from '@/api/movie';
import CollectionCreateForm from './CollectionCreateForm';
import axios from 'axios';
import qs from 'qs';
import {getUser} from '@/utils/util';
import style from './index.scss';

const {confirm} = Modal;
const userId = getUser().userid;
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
    movieData:{}
  }
  componentDidMount(){
    this.getlist();
  }
  getmusic = async() => {
    // 获取音乐数据，暂时还没实现
    let data = {
      params:'42vJprhdMmJDraTyEiXXlWCQ0pwgVAFLOndgv0XPTGScsvHRFL+NOwo4TeET3j4zEjpjMd2r1LaeFCqAWOZe5X8+oeH4gTjea/Rvm00EmxM=',
      encSecKey:'a4bb666bb4f1195e89da9723eea38cde0a09f3ef62fdac90015d45b173f82fe5cb66fab6bceecb7f49b686a739121c4ed668f9c3a00969dead548223861b6246fa6b0d97f074547a196524ffe0cd5ac2463d8e249df3395e3edec4327b9e2f71b08f70e9bfe3357e801fd456710f2fa10c122a955b084127d7d34b223178ad3c'
    }
    const instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
    instance.post(`/music/weapi/song/enhance/player/url`,qs.stringify(data)).then(res => console.log(res));
  }
  //获取电影列表数据
  getlist = async () =>{
    let {pageNum,pageSize} = this.state.pagination;
    this.setState({
      loading:true
    });
    let {data} = await getMovieList({page:pageNum,pageSize:pageSize,userId});
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
    let movieData = Object.assign({},values,{
      ticketPrice: values.ticketPrice? values.ticketPrice : 40,
      highPraiseRate: values.highPraiseRate? values.highPraiseRate : 0.6,
      score: values.score? values.score : 60,
      userId
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