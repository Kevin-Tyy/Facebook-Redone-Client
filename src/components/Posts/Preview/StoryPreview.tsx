import { CloseRounded, MoreHoriz } from "@mui/icons-material";
import { StoryType } from "../../../types/Types";
import useDateFormatter from "../../../hooks/useDate";
import { Link } from "react-router-dom";
import Logo from "../../Logo";

interface Props {
	handleView: (value: any) => void;
	storyInView: StoryType;
	stories: Array<StoryType>;
}

const StoryPreview = ({ handleView, storyInView, stories }: Props) => {
	console.log(storyInView);
	// console.log(stories)
	const { formattedDate } = useDateFormatter(storyInView?.createdAt);
	return (
		<div
			className="h-screen w-full fixed top-0 right-0 left-0 bottom-0 bg-gray-950/60 backdrop-blur-lg z-[10] flex justify-center"
			onClick={handleView}>
			<div onClick={(e) => e.stopPropagation()} className="">
				<div
					onClick={handleView}
					className="absolute top-3 right-3 bg-gray-700 text-white rounded-full p-2 cursor-pointer hover:bg-gray-800 active:bg-gray-600">
					<CloseRounded sx={{ fontSize: 30 }} />
				</div>
				<div className="relative max-w-[600px] bg-black h-full flex justify-center items-center">
					<div className="absolute top-0 left-0 flex w-full px-4 pt-2 items-center justify-between">
						<Link to={`/profile/${storyInView?.creator?.userId}`}>
							<div className="flex items-center gap-2">
								<div className="bg-gradient-to-r from-sky-500 to-violet-900 pt-[3px] p-[4px] rounded-full">
									<img
										src={storyInView?.creator?.profileimage}
										className="w-[50px] h-[50px] rounded-full "
									/>
								</div>
								<div>
									<p className="text-light capitalize">
										{storyInView?.creator?.username}
									</p>
									<p className="text-gray-500">{formattedDate}</p>
								</div>
							</div>
						</Link>
						<div className="hover:bg-gray-700/60 transition p-2 cursor-pointer rounded-full">
							<MoreHoriz className="text-white" />
						</div>
					</div>
					<img src={storyInView?.storyMedia} className="w-full" />
				</div>
				<div className="absolute h-screen w-[300px] top-0 left-0 bg-gray-950/60 p-2">
					<Logo />
					<div>
            <div>
              <p>Your story</p>
            </div>
						{stories && (
							<div>
								{stories.map((story, index) => (
									<div
										key={index}
										className="h-full w-[130px] rounded-full relative">
										<div>
											<img src={story.storyMedia} />
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryPreview;
