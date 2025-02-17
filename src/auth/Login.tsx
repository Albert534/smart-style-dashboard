import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout } from 'antd';
import './login.css';
import { login, useAuthStore } from '../../store/authStore';
import Logo from '../assets/smartstyle.png';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
	const navigate = useNavigate();
	const { error } = useAuthStore();
	const access_token = localStorage.getItem('access_token');

	useEffect(() => {
		if (access_token) {
			navigate('/');
		}
	}, [access_token, navigate]);

	const onFinish = (values: { email: string; password: string }) => {
		console.log('Received values of form: ', values);
		console.log('Destructured Value', values.email);
		login(values.email, values.password);
		if (error) {
			return;
		}
	};
	return (
		<>
			<Layout
				style={{
					padding: '20px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					position: 'relative',
				}}
			>
				<Form
					name='login'
					initialValues={{ remember: true }}
					style={{
						maxWidth: 360,
						width: '100%', // Ensures the form doesn't overflow
						margin: '0 auto',
						padding: '70px 20px',
						borderRadius: '30px',
						backgroundColor: '#FEF9E1',
						boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
					}}
					onFinish={onFinish}
				>
					<div
						style={{
							margin: 'auto',
							justifyContent: 'center',
							display: 'flex',
						}}
					>
						<img
							src={Logo}
							alt='Smart Style Logo'
							style={{ width: '70px', height: '70px' }}
						></img>
					</div>

					<Form.Item
						name='email'
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Please enter a valid email!' },
						]}
						style={{ marginTop: 16 }}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder='Email'
							style={{ borderColor: '#A31D1D', height: '30px' }}
						/>
					</Form.Item>

					<Form.Item
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
							{
								min: 6,
								message: 'Password must be at least 6 characters',
							},
						]}
					>
						<Input
							prefix={<LockOutlined />}
							type='password'
							placeholder='Password'
							style={{ marginTop: 16, borderColor: '#A31D1D' }}
						/>
					</Form.Item>

					<Form.Item>
						<Button
							block
							type='primary'
							htmlType='submit'
							style={{ marginTop: 24, background: '#A31D1D' }}
						>
							Log in
						</Button>
						{error && (
							<div
								style={{
									textAlign: 'center',
									color: 'RED',
									fontSize: '12px',
									marginTop: 4,
								}}
							>
								{error}
							</div>
						)}
					</Form.Item>

					<Form.Item>
						<div style={{ textAlign: 'center' }}>
							Developed by
							<a
								href=''
								style={{ marginTop: 24, color: '#A31D1D', marginLeft: 4 }}
							>
								Thet Maung & Aung Paing Oo
							</a>
						</div>
					</Form.Item>
				</Form>
			</Layout>
		</>
	);
};

export default Login;
