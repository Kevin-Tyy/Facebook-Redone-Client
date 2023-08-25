import { Add, CloseRounded, MoreHoriz } from "@mui/icons-material";
import { StoryType, UserInfo } from "../../../types/Types";
import useDateFormatter from "../../../hooks/useDate";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import { motion } from "framer-motion";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { useSelector } from "react-redux";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
interface Props {
	onClose: () => void;
	storyInView: StoryType | null;
	stories: Array<StoryType>;
	setStoryInView: (value: any) => void;
	toggleStoryModal: () => void;
}

const StoryPreview = ({
	onClose,
	storyInView,
	setStoryInView,
	stories,
	toggleStoryModal,
}: Props) => {
	const formattedDate = useDateFormatter(storyInView?.createdAt as Date);
	const renderDate = (rawDate: Date) => {
		const formattedDate = useDateFormatter(rawDate);
		return formattedDate;
	};
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const loggedInUserStory: StoryType[] = stories.filter(
		(story) => story.creator.userId === userId
	);
	const allStories = stories.filter((story) => story.creator.userId !== userId);
	return (
		<div className="h-screen w-full fixed top-0 right-0 left-0 bottom-0 bg-background-primary backdrop-blur-lg z-[10] flex justify-center">
			<div className="">
				<div
					onClick={onClose}
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
					className="relative max-w-[600px] bg-black h-full flex justify-center items-center ml-24">
					<div className="absolute top-0 left-0 flex w-full px-4 pt-2 items-center justify-between">
						<Link to={`/profile/${storyInView?.creator?.userId}`}>
							<div className="flex items-center gap-2">
								<div className="bg-gradient-to-r from-sky-500 to-violet-900 pt-[3px] p-[4px] rounded-full">
									<img
										src={storyInView?.creator?.profileimage}
										className="w-[50px] h-[50px] rounded-full object-cover"
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
					<button
						className="text-white relative right-4 bg-primary-100/50 p-2 rounded-full cursor-pointer transition hover:bg-primary-100 active:scale-110 "
						onClick={() => {}}>
						<HiChevronLeft size={27} />
					</button>
					<img src={storyInView?.storyMedia} className="w-full" />
					<div
						className="text-white relative left-4 bg-primary-100/50 p-2 rounded-full cursor-pointer transition hover:bg-primary-100 active:scale-110"
						onClick={() => {}}>
						<HiChevronRight size={27} />
					</div>
					<p className="text-white absolute bottom-10">
						{storyInView?.storyCaption}
					</p>
				</motion.div>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.2, delay: 0.5 }}
					variants={{
						hidden: { opacity: 0, y: -30 },
						visible: { opacity: 1, y: 0 },
					}}
					className="absolute h-screen top-0 left-0 bg-primary-200/60 p-2 md:p-4 flex flex-col gap-4 xl:min-w-[300px]">
					<div className="pl-6">
						<Logo />
					</div>
					<div className="border-t border-gray-600 pt-2">
						<div className="p-2">
							<p className="text-2xl text-light xl:block hidden">Your story</p>
							{loggedInUserStory ? (
								<div className="flex flex-col gap-3 mt-2">
									{loggedInUserStory.map((story, index) => (
										<div
											onClick={() => setStoryInView(story)}
											key={index}
											className={`h-full w-full rounded-lg relative bg-primary-100/40 p-2 flex items-center gap-2 ${
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
							) : (
								<div
									className="p-2 cursor-pointer active:bg-gray-600/10 transition rounded-lg"
									onClick={toggleStoryModal}>
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
							)}
						</div>
						{stories && (
							<div className="p-2">
								<p className="text-2xl text-light  xl:block hidden">
									All stories
								</p>
								<div className="flex flex-col gap-3 mt-4 cursor-pointer">
									{allStories.map((story, index) => (
										<div
											onClick={() => setStoryInView(story)}
											key={index}
											className={`h-full w-full rounded-lg relative bg-primary-100/40 p-2 flex items-center gap-2 ${
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
