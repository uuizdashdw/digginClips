import { create } from 'zustand';
import { UserData } from '../types';

export interface Store {
	user: UserData | null;
	setUser: (user: UserData | null) => void;
}

const useStore = create<Store>(set => ({
	user: null,
	setUser: user => set({ user }),
}));

export default useStore;
