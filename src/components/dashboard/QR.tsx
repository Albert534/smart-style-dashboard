import { Space, Button } from 'antd';
import logo from '../../assets/smartstyle.png';
import './QR.css';

const QR = () => {
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
