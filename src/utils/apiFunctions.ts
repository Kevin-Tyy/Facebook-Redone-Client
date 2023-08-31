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

// function findMutualElements(array1, array2) {
//   const set1 = new Set(array1);
//   const mutualElements = array2.filter(element => set1.has(element));
//   return mutualElements;
// }
// function findMutualElements(array1, array2) {
//   return array1.filter(element => array2.includes(element));
// }
