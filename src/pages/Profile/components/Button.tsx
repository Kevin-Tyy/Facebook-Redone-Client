import {
	PersonAddAlt1Outlined,
	PersonRemoveAlt1Outlined,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React from "react";
import { BaseURL } from "../../../utils/Link";
import { Add, Edit } from "@mui/icons-material";
import ButtonComp from "../../../components/Buttons/Button";
import { toast } from "react-hot-toast";
import { Userdata } from "../../../types/types";
interface ButtonProps {
	pending: boolean;
	isFriend: boolean;
	setPending: (value: any) => void;
	userData: Userdata;
	userId: string;
	setIsFriend: (value: any) => void;
	setFriendCount: (value: any) => void;
	friendCount: number;
	toggleStory: () => void;
	setIsOpen: (value: boolean) => void;
}
const Button: React.FC<ButtonProps> = ({
	pending,
	isFriend,
	setIsFriend,
	userData,
	userId,
	setFriendCount,
	friendCount,
	setPending,
	setIsOpen,
	toggleStory,
}) => {
	const submitFriendRequest = async () => {
		setPending(true);
		if (isFriend) {
			const { data } = await axios.delete(`${BaseURL}/user/${userId}/friends`, {
				data: {
					friendId: userData?.userId,
				},
			});
			if (data?.success) {
				setIsFriend(false);
				setFriendCount((friendCount as number) - 1);
			} else {
				toast.error(data?.msg);
			}
		} else {
			const { data } = await axios.post(`${BaseURL}/user/${userId}/friends`, {
				friendId: userData?.userId,
			});
			if (data?.success) {
				setIsFriend(true);
				setFriendCount((friendCount as number) + 1);
			} else {
				toast.error(data?.msg);
			}
		}
		setPending(false);
	};
	return (
		<div>
			{userData?.userId == userId ? (
				<div className="absolute right-4 bottom-4 flex justify-center gap-2">
					<div onClick={toggleStory}>
						<ButtonComp color={"#0C88EF"}>
							<Add />
							Add to story
						</ButtonComp>
					</div>
					<div onClick={() => setIsOpen(true)}>
						<ButtonComp color={"#010A13"}>
							<Edit />
							Edit profile
						</ButtonComp>
					</div>
				</div>
			) : (
				<div
					className="absolute right-4 bottom-4 flex justify-center gap-2"
					onClick={submitFriendRequest}>
					<button
						className={`py-2 w-36 justify-center flex  text-white rounded-md transition  ${
							isFriend
								? "bg-red-500/50 dark:bg-red-500/10 ring-1 ring-red-600/80 hover:bg-red-600/20"
								: "bg-blue-base hover:bg-blue-light"
						}`}>
						{pending ? (
							<CircularProgress size={20} sx={{ color: "white" }} />
						) : isFriend ? (
							<span className="flex gap-2 items-center">
								<PersonRemoveAlt1Outlined />
								Remove friend
							</span>
						) : (
							<span className="flex gap-2 items-center">
								<PersonAddAlt1Outlined />
								Add friend
							</span>
						)}
					</button>
				</div>
			)}
		</div>
	);
};
{
}

export default Button;
