export interface FormData {
	firstName: string;
	username: string;
	lastName: string;
	email: string;
	password: string;
}

export interface Userdata {
	firstname: string; //
	userId: string; //
	username: string; //
	lastname: string; //
	email: string; //
	password: string; //
	profileimage: string; //
	location: string; //
	education: string; //
	bio: string; //
	work: string; //
	friendList: Array<Userdata>; //
}

export interface UserInfo {
	userId: string;
	email: string;
	profileimage: string;
	friendList: Array<Userdata>;
	username: string;
	firstname: string;
	lastname: string;
	bio: string;
	location: string;
	work: string;
	education: string;
}
export interface StoryType {
	storyMedia: string;
	storyCaption?: string;
	creator: Userdata;
	createdAt: Date;
	storyId: string;
}

export interface Comment {
	textContent: string;
	user: UserInfo;
    createdAt: Date;
}
export interface Emoji {
	emoji: string;
}
export interface Posts {
	postId: string;
	postMedia: string;
	creator: Userdata;
	postText: string;
	isReposted: boolean;
	createdAt: Date;
	likes: Array<Userdata>;
	comments: Array<Comment>;
	repostedBy: Userdata;
	updatedAt: Date;
	taggedPeople: Array<Userdata>;
	views: Array<Userdata>;
}
