import {
	CommentOutlined,
	ReplyOutlined,
	ThumbUpOutlined,	

} from "@mui/icons-material";

const CommentComponent = () => {
    const styleClass = `flex items-center justify-center w-full gap-2 text-light hover:bg-gray-700/30 py-2 transition duration-300 rounded-md hover:text-primary-100 cursor-pointer`
	return (
		<div className="flex w-full justify-between items-center gap-2 bg-primary-300/60 p-3 rounded-lg ">
			<div className={`${styleClass}`}>
				<ThumbUpOutlined />
				<span className="text-light">Like</span>
			</div>
			<div className="w-[1px] bg-light h-[30px]"></div>
			<div className={`${styleClass}`}>
				<CommentOutlined />
                <span className="text-white">Comment</span>
				
			</div>
			<div className="w-[1px] bg-light h-[30px]"></div>
			<div className={`${styleClass}`}>
				<ReplyOutlined/>
                <span className="text-white">Share</span>
				
			</div>
		</div>
	);
};

export default CommentComponent;
