import { Add, CloseRounded, MoreHoriz } from "@mui/icons-material";
import { StoryType } from "../../../types/Types";
import useDateFormatter from "../../../hooks/useDate";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import { motion } from "framer-motion";

interface Props {
	handleView: (value: any) => void;
	storyInView: StoryType | null;
	stories: Array<StoryType>;
	setStoryInView: (value: any) => void;
	handleStoryToggle: (value: any) => void;
}

const StoryPreview = ({
	handleView,
	storyInView,
	setStoryInView,
	stories,
	handleStoryToggle,
}: Props) => {
	const formattedDate = useDateFormatter(storyInView?.createdAt as Date);
	const renderDate = (rawDate: Date) => {
		const formattedDate = useDateFormatter(rawDate);
		return formattedDate;
	};
	const handleStoryButtonClick = () => {
		handleView(false);
		handleStoryToggle(true);
	};
	return (
		<div
			className="h-screen w-full fixed top-0 right-0 left-0 bottom-0 bg-gray-950/60 backdrop-blur-lg z-[10] flex justify-center"
			onClick={handleView}>
			<div onClick={(e) => e.stopPropagation()} className="">
				<div
					onClick={handleView}
					className="absolute top-3 right-3 bg-gray-700 text-white rounded-full p-2 cursor-pointer hover:bg-gray-800 active:bg-gray-600 z-10">
					<CloseRounded sx={{ fontSize: 30 }} />
				</div>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.2 }}
					variants={{
						hidden: { opacity: 0, y: -30 },
						visible: { opacity: 1, y: 0 },
					}}
					className="relative max-w-[600px] bg-black/80 h-full flex justify-center items-center ml-24">
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
					<p className="text-white absolute bottom-10">
						{storyInView?.storyCaption}
					</p>
				</motion.div>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.2, delay: 0.4 }}
					variants={{
						hidden: { opacity: 0, y: -30 },
						visible: { opacity: 1, y: 0 },
					}}
					className="absolute h-screen top-0 left-0 bg-gray-950/60 p-2 md:p-4 flex flex-col  gap-4">
					<div className="xl:block hidden">
						<Logo />
					</div>
					<div className="border-t border-gray-600 pt-2">
						<div className="p-2">
							<p className="text-2xl text-light xl:block hidden">Your story</p>
							<div
								className="p-2 cursor-pointer active:bg-gray-600/10 transition rounded-lg"
								onClick={handleStoryButtonClick}>
								<div className="flex gap-2 w-full  md:py-3 items-center">
									<div className="bg-gray-800 p-1 md:p-2 rounded-full">
										<Add sx={{ fontSize: 40 }} className="text-white" />
									</div>
									<div className="text-light  xl:block hidden">
										<p>Create a story</p>
										<p className="whitespace-nowrap text-sm text-gray-600">
											Share a photo or write something
										</p>
									</div>
								</div>
							</div>
						</div>
						{stories && (
							<div className="p-2">
								<p className="text-2xl text-light  xl:block hidden">
									All stories
								</p>
								<div className="flex flex-col gap-3 mt-4 cursor-pointer">
									{stories.map((story, index) => (
										<div
											onClick={() => setStoryInView(story)}
											key={index}
											className={`h-full w-full rounded-lg relative bg-gray-900 p-2 flex items-center gap-2 ${
												storyInView?.storyId == story.storyId &&
												"border border-gray-700"
											}`}>
											<div className="bg-primary-100 rounded-full p-0.5">
												<img
													src={story?.creator?.profileimage}
													className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
												/>
											</div>
											<div className="xl:block hidden">
												<p className="text-light text-lg capitalize">
													{story?.creator?.username}
												</p>
												<p className="text-xs text-gray-500">
													{renderDate(story?.createdAt)}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default StoryPreview;
