import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserData } from '../types';
import { db } from '../plugins/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export const addUserToUserList = async (user: UserData) => {
	const userRef = doc(db, 'userList', 'users');

	try {
		const userDoc = await getDoc(userRef);

		if (userDoc.exists()) {
			await updateDoc(userRef, {
				users: arrayUnion(user),
			});
		} else {
			await setDoc(userRef, {
				users: [user],
			});
		}
	} catch (err) {
		console.error('Firestore 업데이트 실패:', err);
	}
};

export const registerUser = async (user: FirebaseUser, userName: string) => {
	const userData: UserData = {
		uid: user.uid,
		email: user.email,
		displayName: userName,
		metadata: user.metadata,
		clips: [],
		addedClips: [],
		createdAt: new Date().toISOString(),
	};

	await addUserToUserList(userData);
};
