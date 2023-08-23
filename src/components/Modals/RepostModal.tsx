import React from "react";
import { Posts, UserInfo } from "../../types/Types";
import Modal from ".";
import { LoaderIcon, toast } from "react-hot-toast";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { CloseRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
interface RepostModalProps {
	post: Posts;
	onClose: (value: any) => void;
}
const RepostModal: React.FC<RepostModalProps> = ({ post, onClose }) => {
	const {
		user: {
			userInfo: { userId  },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	const [loading, setLoading] = React.useState(false);

  console.log(post);
  
	const handleSubmit = (e: any) => {
		e.preventDefault();
		axios
			.post(`${BaseURL}/post/repost`, {
        postId : post.postId,
        repostedBy : userId
			})
			.then((response) => {
				toast.success(response.data.msg);
			})
			.catch((err) => toast.error(err.response.data.msg))
			.finally(() => setLoading(false));
	};
	return (
		<Modal onClose={onClose}>
			<div>
				<div className="p-3 border-b border-gray-700">
					<h1 className="text-2xl text-center font-bold text-light">
						Create a post
					</h1>

					<div
						onClick={onClose}
						className="hover:bg-gray-700 rounded-full p-1.5 absolute top-5 right-3 cursor-pointer ">
						<CloseRounded sx={{ color: "#fff" }} />
					</div>
				</div>
				<div className="flex flex-col items-center space-y-10">
					<p className="text-white">
						Are you sure you want to repost this to your timeline?
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
								px: "24px",
								py: "12px",
								"&:hover": { backgroundColor: "#3293e3" },
							}}>
							Repost 
						</Button>
						<div
							onClick={onClose}
							className={`text-red-600 ring-1 px-6 py-3 ring-red-700 rounded-full hover:bg-red-700/10 cursor-pointer ${
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