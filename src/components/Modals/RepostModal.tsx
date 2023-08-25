import React from "react";
import { Posts, UserInfo } from "../../types/Types";
import Modal from ".";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Button, CircularProgress } from "@mui/material";
interface RepostModalProps {
	post: Posts;
	onClose: () => void;
	isOpen: boolean;
	fetchPosts: (url: string) => Promise<void>;
}
const RepostModal: React.FC<RepostModalProps> = ({
	post,
	onClose,
	isOpen,
	fetchPosts,
}) => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(`${BaseURL}/post/repost`, {
				postId: post.postId,
				repostedBy: userId,
			})
			.then((response) => {
				fetchPosts(`${BaseURL}/post/`).then(() => {
					toast.success(response.data.msg);
					onClose();
				});
			})
			.catch((err) => toast.error(err.response.data.msg))
			.finally(() => setLoading(false));
	};
	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<div className="relative bg-primary-200  ring-1 ring-inset ring-gray-700/50 w-full xs:w-[400px] sm:w-[500px] p-6 rounded-lg">
				<div className="p-3 border-b border-gray-700">
					<h1 className="text-2xl text-center font-bold text-light">
						Share this post.
					</h1>
				</div>
				<div className="flex flex-col items-center space-y-10 mt-4">
					<p className=" text-light/50 text-center">
						This post will be shared to your timeline and your friends will be
						notified about this
					</p>
					<form onSubmit={handleSubmit} className="flex items-center gap-4">
						<Button
							type="submit"
							sx={{
								color: "white",
								backgroundColor: "#0C88EF",
								textTransform: "capitalize",
								borderRadius: "40px",
								alignSelf: "flex-start",
								width : '95px',
								height : '35px',
								"&:hover": { backgroundColor: "#3293e3" },
							}}>
							{loading ? <CircularProgress size={15} sx={{ color : 'white' }} /> : "Repost"}
						</Button>
						<div
							onClick={onClose}
							className={`text-red-600 ring-1 px-6 py-2 ring-red-700 rounded-full hover:bg-red-700/10 cursor-pointer ${
								loading && "opacity-50"
							}`}>
							Cancel
						</div>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default RepostModal;
