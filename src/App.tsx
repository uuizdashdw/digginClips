import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Header from './components/common/Header';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Clips from './pages/Clips';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';

// Hooks
import { useEffect, useState } from 'react';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Types
import { UserData } from './types';

// APIs
import { fetchUsers } from './api/getUsers';

// Private Routes
import PrivateServiceRoute from './components/route/PrivateServiceRoute';
import PrivateAuthRoute from './components/route/PrivateAuthRoute';
import AuthListener from './components/firebase/AuthListener';
import useStore from './store';

const App = () => {
	// const [user, setUser] = useState<UserData | null>(null);
	const user = useStore(state => state.user);
	const setUser = useStore(state => state.setUser);

	return (
		<Router>
			{/* Firebase 인증 상태 감시 */}
			<AuthListener />
			<Header user={user} />

			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					{/* 회원가입한 사용자만 접근할 수 있는 경로 */}
					<Route
						path="/clips"
						element={
							<PrivateServiceRoute
								user={user}
								element={<Clips />}
								requireSignUp={true}
							/>
						}
					/>
				</Route>
				<Route element={<AuthLayout />}>
					{/* 로그인한 사용자는 이 페이지에 접근하지 못하도록 설정 */}
					<Route
						path="/signUp"
						element={
							<PrivateAuthRoute
								user={user}
								element={<SignUp />}
								requireSignUp={false}
							/>
						}
					/>
					<Route
						path="/signIn"
						element={
							<PrivateAuthRoute
								user={user}
								element={<SignIn />}
								requireSignUp={false}
							/>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
