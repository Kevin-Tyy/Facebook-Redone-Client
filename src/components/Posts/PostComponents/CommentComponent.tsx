import {
	CommentOutlined,
	ReplyOutlined,
	ThumbUpOutlined,
	ThumbUpRounded,
} from "@mui/icons-material";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
interface Props {
	userId: string;
	postId: string;
	likedByLoggedInUser : boolean;
	setLikedByLoggedInUser: (value: any) => void 
}
const CommentComponent = ({ likedByLoggedInUser, userId, postId ,setLikedByLoggedInUser}: Props) => {
	// const [isPostLiked, setIsPostLiked] = useState(false)

	const styleClass = `flex items-center justify-center w-full gap-2 text-light hover:bg-gray-700/30 py-3 transition duration-300 rounded-md hover:text-primary-100 cursor-pointer`;
	const handleLike = async () => {
		setLikedByLoggedInUser(!likedByLoggedInUser);
		if (likedByLoggedInUser) {
			const { data } = await axios.delete(`${BaseURL}/post/react/like` , { data : { userId , postId}});
			console.log(data);
		} else {
			const { data } = await axios.post(`${BaseURL}/post/react/like` , {userId , postId});
			console.log(data);
		}
	};

	return (
		<div className="flex w-full justify-between items-center gap-2 bg-primary-300/60 p-1 rounded-lg ">
			<div className={`${styleClass} ${likedByLoggedInUser && 'text-primary-100'}`} onClick={handleLike}>
				{likedByLoggedInUser ? <ThumbUpRounded /> : <ThumbUpOutlined />}
				<span>{likedByLoggedInUser ? "Unlike" : "Like"}</span>
			</div>
			<div className="w-[1px] bg-light h-[30px]"></div>
			<div className={`${styleClass}`}>
				<CommentOutlined />
				<span className="text-white">Comment</span>
			</div>
			<div className="w-[1px] bg-light h-[30px]"></div>
			<div className={`${styleClass}`}>
				<ReplyOutlined />
				<span className="text-white">Share</span>
			</div>
		</div>
	);
};

export default CommentComponent;
