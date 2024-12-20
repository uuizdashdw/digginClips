import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<main className="px-32">
			<Outlet />
		</main>
	);
};

export default AuthLayout;
