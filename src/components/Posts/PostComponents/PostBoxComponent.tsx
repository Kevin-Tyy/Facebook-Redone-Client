import { Avatar } from "@mui/material";
import CommentComponent from "./CommentComponent";
import useDateFormatter from "../../../hooks/useDate";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import placeholderImage from "../../../assets/avatar.webp";
import { Link } from "react-router-dom";
interface Props {
	postId : string;
	postMedia: string;
	postText: string;
	createdAt: Date;
	creator: object;
	likes: Array<Likes>;
}
interface Likes {
	userId : string;
}

const Box = ({ postId, postMedia, creator, postText, createdAt, likes , comments }: Props) => {
	const { formattedDate } = useDateFormatter(createdAt);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser);
	const [likedByLoggedInUser , setLikedByLoggedInUser] = useState(likes.some(like => like?.userId === userId))
	
	// const likedByLoggedInUser = ;
	// console.log();

	return (
		<div className="bg-primary-200 rounded-lg py-3 px-6 flex flex-col gap-4 border border-gray-800">
			<div className="flex py-3 justify-between border-b border-gray-600">
				<Link to={`/profile/${creator?.userId}`}>
					<div className="flex gap-3 items-center">
						<div className="bg-primary-100 p-0.5 rounded-full">
							<img
								src={
									creator?.profileimage
										? creator?.profileimage
										: placeholderImage
								}
								className="w-12 h-12  rounded-full"
							/>
						</div>
						<div className="flex flex-col">
							<p className="text-light capitalize">{creator?.username}</p>
							<p className="text-xs text-light/60">{formattedDate}</p>
						</div>
					</div>
				</Link>
				<div className="text-primary-100 hover:bg-gray-950/80 rounded-full w-14 flex justify-center items-center cursor-pointer transition duration-300 active:bg-gray-950/50 p-2 ">
					<MoreVert />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-white">{postText}</h1>
				<div className="flex flex-col gap-2">
					<img
						src={postMedia}
						className="w-full max-h-[500px] object-cover rounded-xl"
					/>
					<div className="flex justify-between text-light px-4 ">
						<span className="hover:underline cursor-pointer">{likes && likes.length} Like{likes.length !== 1 && 's'}</span>
						<span className="hover:underline cursor-pointer">{comments && comments.length} comment{comments.length !== 1 && 's'}</span>
					</div>
					<CommentComponent userId={userId } postId={postId} likedByLoggedInUser={likedByLoggedInUser} setLikedByLoggedInUser={setLikedByLoggedInUser}/>
				</div>
			</div>
		</div>
	);
};

export default Box;
