// export const AddFriend

import { Userdata } from "../types/types";

export const findMutualFriends = (
	friendsList1: Array<Userdata>,
	friendsList2: Array<Userdata>
) => {
	const mutualFriends = [];

	for (const user1 of friendsList1) {
		for (const user2 of friendsList2) {
			if (user1.userId === user2.userId) {
				mutualFriends.push(user1);
				break; // No need to continue checking for this user in friendsList2
			}
		}
	}

	return mutualFriends;
};
