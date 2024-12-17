import { AddedClip, Clip } from './clips';

interface User {
	userId: number;
	userAccount: string;
	userName: string;
	userNickName?: string;
	userPassword: string;
	clips: Clip[];
	addedClips: AddedClip[];
}

export type { User };
