// Hooks
import { useEffect } from 'react';

// Zustand Store
import useStore from '../../store';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// APIs
import { fetchUsers } from '../../api/getUsers';

const AuthListener = () => {
	const setUser = useStore(state => state.setUser);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
			if (firebaseUser) {
				const users = await fetchUsers();
				const currentUser = users.find(u => u.uid === firebaseUser.uid);

				currentUser && setUser(currentUser);
			} else {
				// 로그아웃 시 null 설정
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	return null;
};

export default AuthListener;
