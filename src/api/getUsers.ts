import { db } from '../plugins/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { UserData } from '../types';

export const fetchUsers = async (): Promise<UserData[]> => {
	const userCollection = collection(db, 'userList');
	const userSnapshot = await getDocs(userCollection);

	let users: UserData[] = [];

	userSnapshot.forEach(doc => {
		const data = doc.data();
		if (data.users) {
			users = data.users as UserData[];
		}
	});

	return users;
};
