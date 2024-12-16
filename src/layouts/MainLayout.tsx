import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<main className="p-4">
			<Outlet />
		</main>
	);
};

export default MainLayout;
