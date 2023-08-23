import {
	BiComment,
	BiHeart,
	BiRepost,
	BiUpload,
} from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";

import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { toast } from "react-hot-toast";
import { Tooltip } from "@mui/material";
interface Props {
	userId: string;
	postId: string;
	setPostInView: any | { (value: any): void };
	likedByLoggedInUser: boolean;
	setLikedByLoggedInUser: (value: any) => void;
	setLikecount: (value: any) => void;
	likecount: number;
	commentCount: number;
}
const ReactionPallete = ({
	setPostInView,
	likedByLoggedInUser,
	userId,
	postId,
	setLikedByLoggedInUser,
	setLikecount,
	commentCount,
	likecount,
}: Props) => {
	const styleClass = `flex items-center justify-center cursor-pointer gap-2 font-bold`;
	const handleLike = async () => {
		setLikedByLoggedInUser(!likedByLoggedInUser);
		if (likedByLoggedInUser) {
			setLikecount(likecount - 1);
			const { data } = await axios.delete(`${BaseURL}/post/react/like`, {
				data: { userId, postId },
			});
			toast.success(data.msg);
		} else {
			setLikecount(likecount + 1);
			const { data } = await axios.post(`${BaseURL}/post/react/like`, {
				userId,
				postId,
			});
			toast.success(data.msg);
		}
	};

	return (
		<div className="flex justify-center">
			<div className="flex w-4/5 justify-between items-center gap-2 p-1 rounded-lg ">
				<Tooltip title={likedByLoggedInUser ? "Unlike" : "Like"}>
					<div
						className={` ${styleClass} text-gray-500 group  ${
							likedByLoggedInUser && "text-pink-800 shadow-2xl"
						}`}
						onClick={handleLike}>
						<div
							className={` group-hover:bg-pink-800/20 group-hover:text-pink-600 p-3 rounded-full group-active:animate-ping transition-all duration-500`}>
							{likedByLoggedInUser ? (
								<BsHeartFill size={20} />
							) : (
								<BiHeart size={20} />
							)}
						</div>
						<p className="group-hover:text-pink-600 transition-all duration-500">
							{likecount}
						</p>
					</div>
				</Tooltip>
				<Tooltip title="Comment">
					<div
						className={`${styleClass} text-gray-500 group`}
						onClick={() => setPostInView && setPostInView(true)}>
						<div
							className={`${styleClass} transition-all duration-500 text-gray-500 group-hover:bg-sky-800/20 p-3 rounded-full group-hover:text-sky-700`}>
							<BiComment size={20} />
						</div>
						<p className="group-hover:text-sky-600 transition-all duration-500">
							{commentCount}
						</p>
					</div>
				</Tooltip>
				<Tooltip title="Repost this">
					<div
						className={`${styleClass} transition-all duration-500 text-gray-500 hover:bg-orange-800/20 p-3 rounded-full hover:text-orange-700`}>
						<BiRepost size={25} />
					</div>
				</Tooltip>
				<Tooltip title="Views">
					<div
						className={`${styleClass}  transition-all duration-500 text-gray-500 hover:bg-green-800/20 p-3 rounded-full hover:text-green-700`}>
						<ImStatsBars size={20} />
					</div>
				</Tooltip>
				<Tooltip title="Download this post">
					<div
						className={`${styleClass}  transition-all duration-500 text-gray-500 hover:bg-purple-800/10 p-3 rounded-full hover:text-purple-500`}>
						<BiUpload size={25} />
					</div>
				</Tooltip>
			</div>
		</div>
	);
};

export default ReactionPallete;
