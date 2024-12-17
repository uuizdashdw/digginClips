import { db } from '../plugins/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { User } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
	const userCollection = collection(db, 'userList');
	const userSnapshot = await getDocs(userCollection);

	let users: User[] = [];

	userSnapshot.forEach(doc => {
		const data = doc.data();
		if (data.users) {
			users = data.users as User[];
		}
	});

	return users;
};
