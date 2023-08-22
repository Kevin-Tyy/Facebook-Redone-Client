export interface FormData {
    firstName: string;
    username : string;
    lastName: string;
    email: string;
    password: string;
}

export interface Userdata {
    
    firstname: string;//
    userId : string;//
    username : string;//
    lastname: string;//
    email: string;//
    password: string;//
    profileimage : string;//
    location: string;//
    education : string;//
    bio : string;//
    work : string;//
    friendList : Array<Userdata>;//
}
export interface Creator {
	profileimage : string;
	username : string;
    userId : string;
    
}
export interface UserInfo {
    userId : string;
    email : string;
    profileimage : string;
    friendList : Array<Userdata>
    username : string;
    firstname : string
    lastname : string
    bio : string
    location : string
    work : string
    education : string
}
export interface StoryType {
	storyMedia: string;
	storyCaption?: string;
	creator: Creator;
	createdAt: Date;
    storyId : string;
}

export interface Comment {
    textContent: string;
    user : UserInfo
}
export interface Emoji {
    emoji : string
}
export interface Likes {
	userId: string;
}
export interface Posts {
	postId : string,
	postMedia : string,
	creator :   Creator,
	postText : string,
	createdAt : Date,
	likes : Array<Likes>,
	comments : Array<Comment>,
}