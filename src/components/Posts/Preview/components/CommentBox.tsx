import React from "react";
import { Link } from "react-router-dom";
import { Comment } from "../../../../types/types";
import useDateFormatter from "../../../../hooks/useDate";
import placeholderImage from "../../../../assets/avatar.webp";

interface CommentBoxProps {
	comment: Comment;
	userId: string;
}
const CommentBox: React.FC<CommentBoxProps> = ({ comment, userId }) => {
	const formattedDate = useDateFormatter(comment.createdAt);
	return (
		<div className="flex gap-2 items-start">
			<Link to={`/profile/${userId}`} className="max-w-full w-[50px] h-[45px]">
				<div className="bg-primary-100 p-1 rounded-full h-full w-full">
					<img
						src={comment?.user?.profileimage || placeholderImage}
						className="w-full h-full object-cover rounded-full"
					/>
				</div>
			</Link>
			<div className="w-full bg-primary-100/60 my-1 px-3 py-3 rounded-lg hover:bg-primary-100 transition relative">
				{comment?.user?.userId == userId && (
					<p className="text-xs text-gray-500 absolute right-2 top-2">
						You commented
					</p>
				)}
				<Link
					to={`/profile/${comment?.user?.userId}`}
					className="flex  items-center gap-2">
					<h1 className="text-lg font-semibold text-start text-white hover:underline capitalize inline">
						{comment?.user?.username}
					</h1>
					<p className="text-gray-400 text-sm">{formattedDate}</p>
				</Link>
				<p className="text-light text-start">{comment.textContent}</p>
			</div>
		</div>
	);
};

export default CommentBox;
