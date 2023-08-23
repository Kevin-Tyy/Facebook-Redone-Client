import {
	CommentOutlined,
	HeartBroken,
	HeartBrokenOutlined,
	ReplyOutlined,
	ThumbUpOutlined,
	ThumbUpRounded,
} from "@mui/icons-material";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { Toaster, toast } from "react-hot-toast";
interface Props {
	userId: string;
	postId: string;
	setPostInView: any | { (value: any): void };
	likedByLoggedInUser: boolean;
	setLikedByLoggedInUser: (value: any) => void;
	setLikecount: (value: any) => void;
	likecount: number;
}
const ReactionPallete = ({
	setPostInView,
	likedByLoggedInUser,
	userId,
	postId,
	setLikedByLoggedInUser,
	setLikecount,
	likecount,
}: Props) => {
	const styleClass = `flex items-center justify-center w-full gap-2 text-light hover:bg-gray-700/30 py-3 transition duration-300 rounded-md hover:text-primary-100 cursor-pointer`;
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
		<div className="flex w-full justify-between items-center gap-2 bg-primary-300/60 p-1 rounded-lg ">
			<div
				className={`${styleClass} ${likedByLoggedInUser && "text-blue-base"}`}
				onClick={handleLike}>
				{likedByLoggedInUser ? <HeartBroken /> : <HeartBrokenOutlined />}
				<span>{likedByLoggedInUser ? "Unlike" : "Like"}</span>
			</div>
			<div className="w-[1px] bg-light h-[30px]"></div>
			<div
				className={`${styleClass}`}
				onClick={() => setPostInView && setPostInView(true)}>
				<CommentOutlined />
				<span className="text-white">Comment</span>
			</div>
			<div className="w-[1px] bg-light h-[30px]"></div>
			<div className={`${styleClass}`}>
				<ReplyOutlined />
				<span className="text-white">Share</span>
			</div>
			<Toaster />
		</div>
	);
};

export default ReactionPallete;
