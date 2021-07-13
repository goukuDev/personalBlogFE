import React, { Component, createElement, useState, useEffect } from 'react';
import { Comment, Tooltip, List, Card, Form, Input, Button, message, Pagination, Row, Col } from 'antd';
import moment from 'moment';
import style from './index.scss';
import { msgList, addmsg, giveStart } from '@/api/message';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { getUser, islogin } from '@/utils/util';

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, onPressEnter, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} onPressEnter={onPressEnter} placeholder='发送/回车提交' />
		</Form.Item>
		<Form.Item>
			<Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary' disabled={!value}>
				留言
			</Button>
		</Form.Item>
	</>
);
export default function Index() {
	const [data, setdata] = useState([]);
	const [submitting, setsubmitting] = useState(false);
	const [value, setvalue] = useState('');
	const [pagination, setpagination] = useState({
		total: 0,
		pageNum: 1,
		pageSize: 10,
		pageSizeOptions: ['1', '10', '20', '50', '100']
	});

	useEffect(() => {
		getMsgList(pagination);
	}, []);

	const like = async (e, type) => {
		if (!(await islogin())) return message.error('请先登录');

		const num = type === 'like' ? (e.like += 1) : (e.dislike += 1);
		let options = {
			type: type,
			like: num,
			id: e._id
		};
		let { data } = await giveStart(options);
		if (data.code === 0) {
			getMsgList(pagination);
		}
	};

	//获取历史留言数据
	const getMsgList = async ({ pageNum, pageSize }) => {
		let { data } = await msgList({ page: pageNum, pageSize });
		if (data.code === 0) {
			const localDate = (v) => {
				const d = new Date(v || Date.now());
				d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
				return d.toISOString();
			};

			let dataMsg = data.data.map((item) =>
				Object.assign(
					{},
					{
						actions: [
							<span onClick={() => like(item, 'like')}>
								{createElement(LikeOutlined)}
								<span className='comment-action'>{item.like}</span>
							</span>,
							<span onClick={() => like(item, 'dislike')}>
								{createElement(DislikeOutlined)}
								<span className='comment-action'>{item.dislike}</span>
							</span>
						],
						author: item.username,
						avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
						content: item.content,
						datetime: (
							<Tooltip title={moment(localDate(item.date)).format('YYYY-MM-DD HH:mm:ss')}>
								<span>{moment(localDate(item.date)).fromNow()}</span>
							</Tooltip>
						)
					}
				)
			);
			let paginations = Object.assign({}, pagination, {
				total: data.total
			});
			setvalue('');
			setdata([...dataMsg]);
			setpagination(paginations);
		}
	};

	//发布留言
	const handleSubmit = async () => {
		if (!(await islogin())) return message.error('请先登录');
		setsubmitting(true);

		let { data } = await addmsg({
			username: getUser().username,
			content: value,
			date: new Date()
		});
		if (data.code === 0) {
			message.success('新增成功');
			setsubmitting(false);
			getMsgList(pagination);
		}
	};

	const onChange = (pageNum, pageSize) => {
		let paginations = Object.assign({}, pagination, { pageNum, pageSize });
		setpagination(paginations);
		getMsgList(paginations);
	};

	const handleKeyPress = (e) => {
		if (e.key == 'Enter') {
			handleSubmit();
		}
		return false;
	};
	return (
		<div className={style.messagebox}>
			<Card title='留言板' className={style.card}>
				<Row>
					<Col xs={24} sm={24} md={18} lg={14} xl={10}>
						<div className={style.left}>
							<List
								itemLayout='horizontal'
								dataSource={data}
								renderItem={(item) => (
									<li>
										<Comment
											actions={item.actions}
											author={item.author}
											avatar={item.avatar}
											content={item.content}
											datetime={item.datetime}
										/>
									</li>
								)}
							/>
							<Pagination
								style={{ textAlign: 'left', marginTop: '15px' }}
								showSizeChanger
								showTotal={(total) => `共${total}条`}
								total={pagination.total}
								current={pagination.pageNum}
								defaultPageSize={pagination.pageSize}
								pageSizeOptions={pagination.pageSizeOptions}
								onChange={onChange}
							/>
						</div>
					</Col>
					<Col xs={24} sm={18} md={14} lg={9} xl={6}>
						<Comment
							content={
								<Editor
									onChange={(e) => setvalue(e.target.value)}
									onSubmit={handleSubmit}
									onPressEnter={handleKeyPress}
									submitting={submitting}
									value={value}
								/>
							}
						/>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
