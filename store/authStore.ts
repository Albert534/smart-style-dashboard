import { create } from 'zustand';
import supabase from '../utils/client';

type AuthStore = {
	access_token: string;
	error: string;
	expire: number;
	isAuthenticated: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
	setTokens: () => void;
};

const initialState: AuthStore = {
	access_token: '',
	error: '',
	expire: 0,
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
	setTokens: () => {},
};

export const useAuthStore = create<typeof initialState>()(() => initialState);

export const login = async (email: string, password: string) => {
	console.log(email, password);
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			console.log('Error while signing in', error.message);

			useAuthStore.setState((state) => {
				return {
					...state,
					error: error.message,
				};
			});
		} else {
			console.log('Successfully signed in', data);
			useAuthStore.setState((state) => {
				return {
					...state,
					access_token: data.session.access_token,
					expire: data.session.expires_at,
					isAuthenticated: true,
					error: '',
				};
			});
			setToken();
		}
	} catch (error) {
		console.log('Something went so wrong', error);
	}
};

const setToken = () => {
	const { access_token, expire } = useAuthStore.getState();
	localStorage.setItem('access_token', access_token);
	localStorage.setItem('expire', expire.toString());
};

export const logout = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log('logging out failed');
		} else {
			localStorage.removeItem('access_token');
			localStorage.removeItem('expire');
		}
	} catch (error) {
		console.log('Something got very wrong while logging out', error);
	}
};
