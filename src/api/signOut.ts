import { getAuth, signOut } from 'firebase/auth';

const handleSignOut = async () => {
	const auth = getAuth();

	try {
		await signOut(auth);
		return {
			message: '로그아웃 되었습니다.',
		};
	} catch (err) {
		console.error(err);
		return {
			message: err,
		};
	}
};

export { handleSignOut };
