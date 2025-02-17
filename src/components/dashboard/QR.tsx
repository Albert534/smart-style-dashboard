import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Button } from 'antd';
import logo from '../../assets/smartstyle.png';
import './QR.css';

const QR = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const storedExpire = localStorage.getItem('expire');
		const storedToken = localStorage.getItem('access_token');

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

	return (
		<div className='main'>
			<img
				src={logo}
				alt='Logo'
				className='downimg'
			/>
			<div
				className='name'
				style={{ marginBottom: 12 }}
			></div>
			<Space
				direction='vertical'
				align='center'
				size='large'
			>
				<div
					className='name'
					style={{ marginBottom: 12 }}
				>
					A place for your fashion , A place for your style 😎😎
				</div>
				<Button
					type='primary'
					href='../../../app-release.apk'
					download='SmartStyleApp.apk'
					className='download-button'
				>
					Download APK
				</Button>

				<div
					className='name'
					style={{ marginBottom: 12 }}
				>
					Download your app in mobile!!!
				</div>
			</Space>
		</div>
	);
};

export default QR;
