import { Comment, Posts, UserInfo } from "../../../types/types";

import { Link } from "react-router-dom";
import placeholderImage from "../../../assets/avatar.webp";
import useDateFormatter from "../../../hooks/useDate";
import ReactionPallete from "../common/ReactionPallete";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import Spinner from "../../Loaders/Spinner/Spinner";
import CommentBox from "./components/CommentBox";
import CommentForm from "./components/CommentForm";
import RepostModal from "../../Modals/RepostModal";
import Modal from "../../Modals";
import LikesPopup from "../common/LikesPopup";
import StyledHashtags from "../../../hooks/useHashTags";
interface Props {
	onClose: () => void;
	isOpen: boolean;
	setlikecount: (value: number) => void;
	likecount: number;
	post: Posts;
	likedByLoggedInUser: boolean;
	setLikedByLoggedInUser: (value: any) => void;
	commentcount: number;
	setcommentcount: (value: any) => any;
	fetchPosts: (value: string) => Promise<void>;
}
const PostPreview = ({
	post,
	onClose,
	isOpen,
	setlikecount,
	likecount,
	likedByLoggedInUser,
	setLikedByLoggedInUser,
	commentcount,
	setcommentcount,
	fetchPosts,
}: Props) => {
	const { postId, postMedia, creator, postText, createdAt } = post;
	const formattedDate = useDateFormatter(createdAt);
	const [viewlikes, setViewLikes] = useState(false);
	const [repostModal, setRepostModal] = useState(false);
	const [comments, setcomments] = useState<Comment[] | null>(null);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };

	const populateComments = async () => {
		const { data } = await axios.get(`${BaseURL}/post/react/comment/${postId}`);
		if (data.success) {
			setcomments(data?.data);
			setcommentcount(data?.data.length);
		}
	};
	if (isOpen) {
		axios.post(`${BaseURL}/post/view/${postId}/${userId}`);
	}

	useEffect(() => {
		populateComments();
	}, [commentcount]);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="relative bg-white dark:bg-primary-200 rounded-xl w-full xs:min-w-[500px] sm:w-[630px] flex flex-col gap-4 max-h-[90vh] border border-slate-400 dark:border-gray-700  overflow-y-scroll">
				<div className="sticky top-0 bg-white dark:bg-primary-200">
					<p className=" text-slate-700 dark:text-light text-2xl capitalize text-center p-6 border-b  border-slate-400 dark:border-gray-600">
						{creator?.username}'s post
					</p>
					<Link to={`/profile/${creator?.userId}`}>
						<div className="flex gap-3 px-5 py-2 items-center">
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
							<div className="flex items-start flex-col">
								<p className=" text-slate-700 dark:text-light capitalize">
									{creator?.firstname} {creator?.lastname}
								</p>
								<div className="flex gap-2 items-center text-gray-500">
									<p className="capitalize text-sm">@{creator?.username}</p>
									<span>•</span>
									<p className="text-sm ">{formattedDate}</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className="flex flex-col">
					<div>
						<p className="text-white text-start px-5 pb-5">
							<StyledHashtags text={postText} />
						</p>
						<img
							src={postMedia}
							className="min-w-[98vw] xs:min-w-full max-h-[640px] object-cover"
						/>
						<div className="flex mt-6 justify-between px-4 py-2  text-slate-400 dark:text-gray-500">
							<div className="relative">
								<p
									className=" hover:underline cursor-pointer"
									onClick={() => setViewLikes(true)}>
									{likecount} Like
									{likecount != 1 && "s"}
								</p>
								{viewlikes && (
									<LikesPopup
										likes={post.likes}
										onClose={() => setViewLikes(false)}
									/>
								)}
							</div>
							<div className="flex gap-3">
								<p className=" cursor-pointer hover:underline">
									{commentcount} Comment
									{commentcount != 1 && "s"}
								</p>
								<p className=" cursor-pointer hover:underline">
									{post.numberOfReposts} repost
									{post.numberOfReposts !== 1 && "s"}
								</p>
							</div>
						</div>
						<div className="p-2">
							<ReactionPallete
								userId={userId}
								postId={postId}
								likedByLoggedInUser={likedByLoggedInUser}
								setLikedByLoggedInUser={setLikedByLoggedInUser}
								setLikecount={setlikecount}
								likecount={likecount}
								setPostInView={null}
								commentCount={commentcount}
								viewCount={post.views.length}
								setRepostModal={() => setRepostModal(true)}
								post={post}
							/>
						</div>
						<div>
							{comments ? (
								<Fragment>
									{comments.length > 0 ? (
										<div className="p-2 flex flex-col gap-2">
											{comments.map((comment, index) => (
												<CommentBox
													comment={comment}
													userId={userId}
													key={index}
												/>
											))}
										</div>
									) : (
										<p className="text-center text-xl  text-slate-700 dark:text-light py-6 mx-2 border  border-slate-400 dark:border-primary-100 rounded-2xl">
											No comments yet
										</p>
									)}
								</Fragment>
							) : (
								<div className="border  border-slate-400 dark:border-gray-800 m-2">
									<Spinner />
								</div>
							)}
						</div>
					</div>
				</div>
				<CommentForm
					commentcount={commentcount}
					setcommentcount={setcommentcount}
					post={post}
				/>
				<RepostModal
					post={post}
					onClose={() => setRepostModal(false)}
					isOpen={repostModal}
					fetchPosts={fetchPosts}
				/>
			</div>
		</Modal>
	);
};

export default PostPreview;
