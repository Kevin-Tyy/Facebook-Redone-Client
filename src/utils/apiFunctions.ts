// export const AddFriend

import { Userdata } from "../types/types";

export const __findMutualFriends = (
	loggedInUserFriendList: Array<Userdata>,
	otherUserFriendList: Array<Userdata>
) => {
	const mutualFriends = [];

	for (const loggedInUserfriend of loggedInUserFriendList) {
		for (const otherUserFriend of otherUserFriendList) {
			if (loggedInUserfriend.userId === otherUserFriend.userId) {
				mutualFriends.push(loggedInUserfriend);
			}
		}
	}

	return mutualFriends;
};
