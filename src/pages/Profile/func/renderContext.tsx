import { ReactNode } from "react";
import { Userdata } from "../../../types/types";
import FriendLayout from "../layout/FriendLayout";
import GroupLayout from "../layout/GroupLayout";
import PostLayout from "../layout/Posts";

type Function = (...args: any) => ReactNode;

export const renderContent: Function = (
	activeTab,
	loading,
	userData,
	userId,
	isOpen,
	setIsOpen,
	posts,
	setPosts,
	loggedInUserData
) => {
	switch (activeTab) {
		case "posts":
			return (
				<PostLayout
					loading={loading}
					userData={userData}
					userId={userId}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					posts={posts}
					setPosts={setPosts}
				/>
			);

		case "friends":
			return (
				<FriendLayout
					loggedInUserData={loggedInUserData as Userdata}
					userData={userData as Userdata}
				/>
			);
		case "groups":
			return <GroupLayout userData={userData as Userdata} />;

		default:
			return (
				<PostLayout
					loading={loading}
					userData={userData}
					userId={userId}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					posts={posts}
					setPosts={setPosts}
				/>
			);
	}
};
