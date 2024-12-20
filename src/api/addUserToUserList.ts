import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserData } from '../types';
import { db } from '../plugins/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export const addUserToUserList = async (user: UserData) => {
	const userRef = doc(db, 'userList', 'users');

	try {
		const userDoc = await getDoc(userRef);

		const userNewData = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			emailVerified: user.emailVerified,
			metadata: {
				createdAt: user.metadata.creationTime,
				lastSignInTime: user.metadata.lastSignInTime,
			},
			clips: user.clips,
			addedClips: user.addedClips,
			createdAt: user.createdAt,
		};

		console.log('### user 기본값 :: ', user);
		console.log('### USER META DATA ==> ', userNewData);

		if (userDoc.exists()) {
			await updateDoc(userRef, {
				users: arrayUnion(userNewData),
			});
		} else {
			await setDoc(userRef, {
				users: [userNewData],
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
		emailVerified: user.emailVerified,
		clips: [],
		addedClips: [],
		createdAt: new Date().toISOString(),
	};

	await addUserToUserList(userData);
};
