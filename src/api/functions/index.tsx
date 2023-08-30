import axios from "axios";
import { BaseURL } from "../../utils/Link";

export const removeFriend = async (friendId: string, userId: string) => {
	const { data } = await axios.delete(`${BaseURL}/user/${userId}/friends`, {
		data: {
			friendId: friendId,
		},
	});
  return data;
};

export const addFriend = async (friendId: string, userId: string) => {
	const { data } = await axios.post(`${BaseURL}/user/${userId}/friends`, {
		friendId: friendId,
	});
	return data;
	
};

export const fetchFriends = async (userId : string) => {
		const { data } = await axios.get(`${BaseURL}/user/${userId}/friends`);
		return data.data
}