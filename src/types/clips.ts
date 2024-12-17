interface Clip {
	clipId: number;
	clipName: string;
	clipPath: string;
	description: string;
	isFavorite: boolean;
	favoriteLevel: string;
	createdAt: string;
}

interface AddedClip extends Clip {
	listId: string;
	listName: string;
	isAdded: boolean;
	addedAt: string;
}

export type { Clip, AddedClip };
