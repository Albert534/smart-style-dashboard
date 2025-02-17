import React, { useEffect, useState } from 'react';
import {
	PieChartOutlined,
	UserOutlined,
	BaiduOutlined,
	UploadOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Modal } from 'antd';

import { Outlet, useNavigate } from 'react-router-dom';
const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('Dashboard', 'dash', <PieChartOutlined />),
	getItem('Cloths', 'cloth', <UserOutlined />),
	getItem('Pet Cloths', 'petcloth', <BaiduOutlined />),
	getItem('Upload', 'upload', <UploadOutlined />),
	getItem('Logout', 'sub3', <LogoutOutlined />),
];

const Dashboard: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 600);
			if (isMobile) {
				setCollapsed(true);
			} // Adjust the threshold as needed
		};

		checkMobile();

		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, [isMobile]);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState(
		'Are you sure that you want to log out ?'
	);
	const navigate = useNavigate();

	useEffect(() => {
		const storedExpire = localStorage.getItem('expire');
		const storedToken = localStorage.getItem('access_token');

		// Ensure expire is a valid number
		const expireTime = storedExpire ? parseInt(storedExpire, 10) : NaN;
		const currentTime = Math.floor(Date.now() / 1000);

		console.log('Stored Expire:', storedExpire);
		console.log('Parsed Expire Time:', expireTime);
		console.log('Current Time:', currentTime);

		if (!storedToken || isNaN(expireTime) || currentTime >= expireTime) {
			console.log('Token expired or invalid. Redirecting to login...');
			localStorage.removeItem('access_token');
			localStorage.removeItem('expire');
			navigate('/login');
		}
	}, [navigate]);

	const handleClick = (info: unknown) => {
		console.log(info);
		if (info === 'sub3') {
			showModal();
		}

		if (info === 'dash') {
			return;
		}

		if (info === 'cloth') {
			return;
		}

		if (info === 'petcloth') {
			return;
		}
	};

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setModalText('The modal will be closed after two seconds');
		localStorage.removeItem('access_token');
		localStorage.removeItem('expire');
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
			navigate('/login');
		}, 2000);
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setOpen(false);
	};
	return (
		<div className='m-0 p-0'>
			{' '}
			<Layout style={{ minHeight: '100vh', padding: '0 0px 0', margin: '0' }}>
				<Modal
					title='Logout Confirmation'
					open={open}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
				>
					<p>{modalText}</p>
				</Modal>
				;
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={isMobile ? undefined : (value) => setCollapsed(value)}
					className='m-0 p-0'
					style={{ minHeight: '100vh' }}
				>
					<div className='demo-logo-vertical ml-0 p-0' />
					<Menu
						onClick={(e) => handleClick(e.key)}
						defaultSelectedKeys={['1']}
						// Pass the event object automatically
						mode='inline'
						items={items}
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						}}
					/>
				</Sider>
				<Layout>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>SmartStyle</Breadcrumb.Item>
							<span className='text-gray-400 font-light'>Dashboard</span>
						</Breadcrumb>

						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default Dashboard;
