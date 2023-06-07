import {
	CommentRounded,
	ShareRounded,
	ThumbUpRounded,
} from "@mui/icons-material";

const CommentComponent = () => {
    const styleClass = `flex items-center justify-center w-full gap-2 text-light hover:bg-gray-950 py-4 transition duration-300 rounded-full hover:text-primary-100 cursor-pointer`
	return (
		<div className="flex w-full justify-between items-center gap-2 bg-primary-300/60 p-3 rounded-b-lg ">
			<div className={`${styleClass}`}>
				<ThumbUpRounded />
				<span className="text-light">Like</span>
			</div>
			<div className="w-[1px] bg-light h-[40px]"></div>
			<div className={`${styleClass}`}>
				<CommentRounded />
                <span className="text-white">Comment</span>
				
			</div>
			<div className="w-[1px] bg-light h-[40px]"></div>
			<div className={`${styleClass}`}>
				<ShareRounded />
                <span className="text-white">Share</span>
				
			</div>
		</div>
	);
};

export default CommentComponent;
