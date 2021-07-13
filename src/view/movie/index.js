import React, { useState, useEffect } from 'react';
import { Table, Modal, message, Divider, Button, Pagination, Card } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getMovieList, addmovie, removemovie, getMovieById, updateMovie } from '@/api/movie';
import { getuserMsg } from '@/api/user';
import CollectionCreateForm from './CollectionCreateForm';
import { getUser, islogin } from '@/utils/util';
import style from './index.scss';

const { confirm } = Modal;
export default function Index() {
	const [data, setdata] = useState([]);
	const [loading, setloading] = useState(false);
	const [visible, setvisible] = useState(false);
	const [pagination, setpagination] = useState({
		total: 0,
		pageNum: 1,
		pageSize: 10,
		pageSizeOptions: ['1', '10', '20', '50', '100']
	});
	const [admin, setadmin] = useState(false);
	const [isLogin, setisLogin] = useState(false);
	const [movieData, setmovieData] = useState({});

	useEffect(() => {
		getUserAdmin();
		getlist(pagination);
	}, []);

	const getUserAdmin = async () => {
		if (!(await islogin())) return;

		let res = await getuserMsg({ id: getUser().userid });
		if (res.data.code === 0 && !!res.data.data.length) {
			setadmin(res.data.data[0].admin);
			setisLogin(true);
		}
	};
	//获取电影列表数据
	const getlist = async ({ pageNum, pageSize }) => {
		if (!(await islogin())) return;
		setloading(true);
		let { data } = await getMovieList({ page: pageNum, pageSize, userId: getUser().userid }).finally(() => {
			setloading(false);
		});
		if (data.code === 0) {
			let newData = data.data?.map((o) =>
				Object.assign({}, o, { id: o._id, highPraiseRate: `${(100 * o.highPraiseRate).toFixed(2)}%` })
			);
			setdata(newData);
			setpagination(
				Object.assign({}, pagination, {
					total: data.total,
					pageNum,
					pageSize
				})
			);
		}
	};
	//删除
	const deleteMovie = (row) => {
		confirm({
			title: `确定删除${row.movieName}吗?`,
			icon: <ExclamationCircleOutlined />,
			centered: true,
			maskClosable: true,
			content: '删除后数据不能恢复',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk: async () => {
				let { data } = await removemovie({ id: row.id });
				if (data.code === 0) {
					message.success('删除成功');
					getlist(pagination);
				}
			},
			onCancel() {
				console.log('Cancel');
			}
		});
	};
	//编辑
	const editMovie = async (row) => {
		let { data } = await getMovieById({ id: row.id });
		if (data.code === 0) {
			setvisible(true);
			setmovieData(data.data[0]);
		}
	};
	const onClickAdd = () => {
		setvisible(true);
		setmovieData([]);
	};
	//新增
	const onCreate = async (values) => {
		let movieData = Object.assign({}, values, {
			ticketPrice: values.ticketPrice ? values.ticketPrice : 40,
			highPraiseRate: values.highPraiseRate ? values.highPraiseRate : 0.6,
			score: values.score ? values.score : 60,
			userId: getUser().userid
		});
		let res;
		if (!!values.id) {
			res = await updateMovie(movieData);
		} else {
			res = await addmovie(movieData);
		}
		if (res.data.code === 0) {
			message.success(`${values.id ? '编辑成功' : '新增成功'}`);
			setvisible(false);
			setisLogin(true);
			getlist(pagination);
		}
	};
	const onCancel = () => {
		setvisible(false);
	};
	const onChange = (pageNum, pageSize) => {
		let paginations = Object.assign({}, pagination, { pageNum, pageSize });
		setpagination(paginations);
		getlist(paginations);
	};

	let columns = [
		{
			title: '电影名称',
			dataIndex: 'movieName'
		},
		{
			title: '上映时间',
			dataIndex: 'releaseTime'
		},
		{
			title: '票价（元）',
			dataIndex: 'ticketPrice'
		},
		{
			title: '评分',
			dataIndex: 'score'
		},
		{
			title: '好评率',
			dataIndex: 'highPraiseRate'
		}
	];
	!!admin
		? columns.push({
				title: '操作',
				align: 'center',
				render: (row) => {
					return (
						<>
							<a onClick={() => editMovie(row)}>编辑</a>
							<Divider type='vertical'></Divider>
							<a onClick={() => deleteMovie(row)}>删除</a>
						</>
					);
				}
		  })
		: null;
	return (
		<div className={style.moviebox}>
			<Card
				title='电影收集'
				extra={
					isLogin ? (
						<Button type='primary' onClick={onClickAdd}>
							新增
						</Button>
					) : (
						<></>
					)
				}
				className={style.card}
			>
				<div className={style.tablebox}>
					<Table
						loading={loading}
						rowKey={(row) => row.id}
						pagination={false}
						dataSource={data}
						columns={columns}
					></Table>
					<Pagination
						style={{ marginTop: 15, textAlign: 'right' }}
						showSizeChanger
						showTotal={(total) => `共${total}条`}
						total={pagination.total}
						current={pagination.pageNum}
						defaultPageSize={pagination.pageSize}
						pageSizeOptions={pagination.pageSizeOptions}
						onChange={onChange}
					/>
				</div>
				<CollectionCreateForm movieData={movieData} show={visible} onCreate={onCreate} onCancel={onCancel} />
			</Card>
		</div>
	);
}
