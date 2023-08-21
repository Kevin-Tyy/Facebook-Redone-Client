import React from "react";
import { Link } from "react-router-dom";
import { Comment } from "../../../../types/Types";
interface CommentBoxProps {
	comment: Comment;
	userId: string;
}
const CommentBox: React.FC<CommentBoxProps> = ({ comment, userId }) => {
	return (
		<div className="flex gap-2 items-center">
			<Link to={`/profile/${userId}`}>
				<div className="bg-primary-100 p-1 rounded-full">
					<img
						src={comment?.user?.profileimage}
						className="w-12 h-[45px] object-cover rounded-full"
					/>
				</div>
			</Link>
			<div className="w-full bg-gray-800 my-1 px-3 py-3 rounded-lg hover:bg-gray-700/70 transition">
				{comment?.user?.userId == userId && (
					<p className="text-xs text-gray-500">You commented</p>
				)}
				<Link to={`/profile/${comment?.user?.userId}`}>
					<h1 className="text-lg font-semibold text-start text-white hover:underline capitalize inline">
						{comment?.user?.username}
					</h1>
				</Link>
				<p className="text-light">{comment.textContent}</p>
			</div>
		</div>
	);
};

export default CommentBox;
