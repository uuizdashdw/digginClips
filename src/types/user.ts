import { AddedClip, Clip } from './clips';
import { User as FirebaseUser, UserInfo, UserMetadata } from 'firebase/auth';

interface UserData {
	uid: string;
	email: string | null;
	displayName?: string | null;
	photoURL?: string | null;
	emailVerified?: boolean;
	providerData?: UserInfo[];
	refreshToken?: string;
	metadata: UserMetadata;
	clips?: Clip[];
	addedClips?: AddedClip[];
	createdAt?: string;
}

interface UserType {
	userId: number;
	userAccount: string;
	userName: string;
	userNickName?: string;
	userPassword: string;
	clips: Clip[];
	addedClips: AddedClip[];
}

export type { UserType, UserData };
