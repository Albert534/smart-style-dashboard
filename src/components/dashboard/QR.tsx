import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './QR.css';
import { QRCode, Space } from 'antd';
const QR = () => {
	const [text] = React.useState('https://ant.design/components/qr-code');

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
	return (
		<div>
			<Space
				direction='vertical'
				align='center'
			>
				<QRCode value={text || '-'} />
			</Space>
		</div>
	);
};

export default QR;
