import CommentComponent from "./CommentComponent";
import useDateFormatter from "../../../hooks/useDate";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import placeholderImage from "../../../assets/avatar.webp";
import { Link } from "react-router-dom";
import { Creator, UserInfo } from "../../../types/Types";
import PostPreview from "../Preview/PostPreview";
interface Props {
	postId: string;
	postMedia: string;
	postText: string;
	createdAt: Date;
	creator: Creator;
	likes: Array<Likes>;
	comments: Array<Comment>;
}
interface Likes {
	userId: string;
}

const Box = ({
	postId,
	postMedia,
	creator,
	postText,
	createdAt,
	likes,
	comments,
}: Props) => {
	const formattedDate = useDateFormatter(createdAt);
	const [isPostInView, setPostInView] = useState(false);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const [likedByLoggedInUser, setLikedByLoggedInUser] = useState(
		likes.some((like) => like?.userId === userId)
	);
	const [likecount, setlikecount] = useState(likes.length);
	const [commentcount, setcommentcount] = useState(comments.length)

	// const likedByLoggedInUser = ;
	// console.log();
	const viewPost = () => {
		setPostInView(!isPostInView);
	};
	return (
		<div className="bg-primary-200 rounded-2xl py-3 px-6 flex flex-col gap-4 border border-gray-800">
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
					<div className="relative cursor-pointer" onClick={viewPost}>
						<img
							src={postMedia}
							className="w-full max-h-[500px] object-cover rounded-xl "
						/>
						<div className="bg-black/30 absolute h-full w-full top-0 right-0 bottom-0 left-0 opacity-0 transition active:opacity-75"></div>
					</div>
					<div className="flex justify-between text-light px-4 ">
						<span className="hover:underline cursor-pointer">
							{likes && likecount} Like{likes.length !== 1 && "s"}
						</span>
						<span className="hover:underline cursor-pointer">
							{comments && commentcount} comment
							{commentcount !== 1 && "s"}
						</span>
					</div>
					<CommentComponent
						userId={userId}
						postId={postId}
						likedByLoggedInUser={likedByLoggedInUser}
						setLikedByLoggedInUser={setLikedByLoggedInUser}
						setLikecount={setlikecount}
						likecount={likecount}
					/>
				</div>
			</div>
			{isPostInView && (
				<PostPreview
					postMedia={postMedia}
					postText={postText}
					viewPost={viewPost}
					creator={creator}
					createdAt={createdAt}
					setlikecount={setlikecount}
					likecount={likecount}
					commentcount={commentcount}
					setcommentcount={setcommentcount}
					userId={userId}
					postId={postId}
					likedByLoggedInUser={likedByLoggedInUser}
					setLikedByLoggedInUser={setLikedByLoggedInUser}
					
				/>
			)}
		</div>
	);
};

export default Box;
