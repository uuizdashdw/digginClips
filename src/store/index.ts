import { create } from 'zustand';
import { User } from '../types';
import { fetchUsers } from '../api/getUsers';

interface UserState {
	users: User[];
	loading: boolean;
	error: string | null;
	loadUsers: () => Promise<void>;
}

const useStore = create<UserState>(set => ({
	users: [] as User[],
	loading: false,
	error: null,
	loadUsers: async () => {
		set({ loading: true, error: null });
		try {
			const users = await fetchUsers();
			set({ users });
		} catch (error) {
			set({ error: 'Failed To Fetch Users' });
		} finally {
			set({ loading: false });
		}
	},
}));

export default useStore;
