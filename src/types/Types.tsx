export interface FormData {
    firstName: string;
    username : string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface Userdata {
    
    firstname: string;//
    userId : string;//
    username : string;//
    lastname: string;//
    email: string;//
    password: string;//
    phoneNumber: string;//
    profileimage : string;//
    location: string;//
    education : string;//
    bio : string;//
    work : string;//
    friendList : Array<object>;//
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
    friendList : Array<object>
    username : string;

}
export interface StoryType {
	storyMedia: string;
	storyCaption?: string;
	creator: Creator;
	createdAt: Date;
    storyId : string;
}
