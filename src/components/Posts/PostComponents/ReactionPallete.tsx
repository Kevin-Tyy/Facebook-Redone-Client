import { BsArrowRepeat } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { FaRegComment } from "react-icons/fa";
import {
	AiOutlineCloudUpload,
	AiFillHeart,
	AiOutlineHeart,
} from "react-icons/ai";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { toast } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { Posts } from "../../../types/Types";
interface Props {
	userId: string;
	postId: string;
	setPostInView: any | { (value: any): void };
	likedByLoggedInUser: boolean;
	setLikedByLoggedInUser: (value: any) => void;
	setLikecount: (value: any) => void;
	likecount: number;
	commentCount: number;
	setRepostModal: (value: any) => void;
	viewCount: number;
	post: Posts;
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
	viewCount,
	setRepostModal,
	post,
}: Props) => {
	console.log(post);

	const styleClass = `flex items-center justify-center cursor-pointer gap-[1px] font-bold`;
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
						className={` ${styleClass} text-pink-800 group  ${
							likedByLoggedInUser && "text-pink-800 shadow-2xl"
						}`}
						onClick={handleLike}>
						<div
							className={` group-hover:bg-pink-800/20 group-hover:text-pink-600 p-3 rounded-full group-active:animate-ping transition-all duration-500`}>
							{likedByLoggedInUser ? (
								<AiFillHeart size={20} />
							) : (
								<AiOutlineHeart size={20} />
							)}
						</div>
						<p className=" text-sm translate-y-[1px] group-hover:text-pink-600 transition-all duration-500">
							{likecount}
						</p>
					</div>
				</Tooltip>
				<Tooltip title="Comment">
					<div
						className={`${styleClass} text-sky-700 group`}
						onClick={() => setPostInView && setPostInView(true)}>
						<div
							className={`${styleClass} transition-all duration-500  group-hover:bg-sky-800/20 p-3 rounded-full group-hover:text-sky-700`}>
							<FaRegComment size={20} />
						</div>
						<p className=" text-sm translate-y-[1px] group-hover:text-sky-600 transition-all duration-500">
							{commentCount}
						</p>
					</div>
				</Tooltip>
				<Tooltip title="Repost this">
					<div className={`${styleClass} text-gray-500 group`}>
						<div
							onClick={setRepostModal}
							className={`${styleClass} transition-all duration-500 text-gray-500 hover:bg-orange-800/20 p-3 rounded-full hover:text-orange-700 ${
								post?.numberOfReposts !== 0 && "text-orange-700"
							}`}>
							<BsArrowRepeat size={25} />
						</div>
						{post?.numberOfReposts !== 0 && <p className="text-sm translate-y-[1px] text-orange-700 transition-all duration-500">{post?.numberOfReposts}</p>}
					</div>
				</Tooltip>
				<Tooltip title="Views">
					<div className={`${styleClass} text-gray-500 group`}>
						<div
							className={`${styleClass}  transition-all duration-500 text-gray-500 group-hover:bg-green-800/20 p-3 rounded-full group-hover:text-green-700`}>
							<ImStatsBars size={20} />
						</div>
						<p className=" text-sm translate-y-[1px] group-hover:text-green-700 transition-all duration-500">
							{viewCount}
						</p>
					</div>
				</Tooltip>
				<Tooltip title="Download this post">
					<div
						className={`${styleClass}  transition-all duration-500 text-gray-500 hover:bg-purple-800/10 p-3 rounded-full hover:text-purple-500`}>
						<AiOutlineCloudUpload size={25} />
					</div>
				</Tooltip>
			</div>
		</div>
	);
};

export default ReactionPallete;
