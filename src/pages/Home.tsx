import { useEffect } from 'react';
import useStore from '../store';

const Home = () => {
	const { users, loading, error, loadUsers } = useStore();

	useEffect(() => {
		const fetchUsers = async () => {
			await loadUsers();
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		console.log('## 유저 목록 :: ', users);
	}, [users]);

	if (loading) return <div>로딩중</div>;
	if (error) return <div>{error}</div>;
	return (
		<div>
			<div>홈</div>
		</div>
	);
};

export default Home;
