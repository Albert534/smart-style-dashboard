import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import DashBody from './components/dashboard/Body';
import Login from './auth/Login';
import QR from './components/dashboard/QR';
// Import useNgate } from 'react-router-dom';
const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/download'
						element={<QR />}
					></Route>

					<Route
						path='/'
						element={<Dashboard />}
					>
						<Route
							index
							element={<DashBody />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
