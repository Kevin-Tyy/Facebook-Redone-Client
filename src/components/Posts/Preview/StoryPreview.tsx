import { Add, CloseRounded, MoreHoriz } from "@mui/icons-material";
import { StoryType, UserInfo } from "../../../types/types";
import useDateFormatter from "../../../hooks/useDate";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import { motion } from "framer-motion";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
interface Props {
	onClose: () => void;
	stories: Array<StoryType>;
	toggleStoryModal: () => void;
	currentCreatorIndex: number;
	setCurrentCreatorIndex: (args: any) => void;
}

const StoryPreview = ({
	onClose,
	stories,
	currentCreatorIndex,
	setCurrentCreatorIndex,
	toggleStoryModal,
}: Props) => {
	//logged in user data from redux session
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

	//simple state to track the progress of the story progress timer
	const [progress, setProgress] = useState(0);

	//create a set of story creators as an array of userIds
	const creators = [...new Set(stories.map((story) => story.creator.userId))];

	//determine the current creator in view
	const currentCreator = creators[currentCreatorIndex];

	//find current stories array by their creator ie all stories of the current creator
	const currentStories = stories.filter(
		(story) => story.creator.userId === currentCreator
	);
	const currentStory = currentStories[currentStoryIndex];
	const renderDate = (rawDate: Date) => {
		const formattedDate = useDateFormatter(rawDate);
		return formattedDate;
	};

	//next creator by his index in creators set, update the current story to the first story in the creators' story list, and reset the story view progress
	const nextCreator = () => {
		setCurrentCreatorIndex(
			(prevIndex: any) => (prevIndex + 1) % creators.length
		);
		setCurrentStoryIndex(0);
		setProgress(0);
	};

	//next creator by his index in creators set, update the current story to the first story in the creators' story list, and reset the story view progress
	const previousCreator = () => {
		setCurrentCreatorIndex(
			(prevIndex: any) => (prevIndex - 1 + creators.length) % creators.length
		);
		setCurrentStoryIndex(0);
		setProgress(0);
	};

	//switch stories created by a same story creator ----->
	//next story in the current creator's story list by its index in the list, check if current story is last in the creator's story list, if so call nextCreator() function
	const playNextStory = () => {
		const nextIndex = (currentStoryIndex + 1) % currentStories.length;
		const lastIndex = currentStories.length - 1;
		const indexOfItem = currentStories.findIndex(
			(item) => item.storyId === currentStory.storyId
		);
		if (indexOfItem !== -1) {
			if (indexOfItem === lastIndex) {
				return nextCreator();
			}
		}
		setCurrentStoryIndex(nextIndex);
		setProgress(0);
	};
	//previous story ....
	const playPreviousStory = () => {
		const previousIndex =
			(currentStoryIndex - 1 + currentStories.length) % currentStories.length;
		const indexOfItem = currentStories.findIndex(
			(item) => item.storyId === currentStory.storyId
		);
		if (indexOfItem !== -1) {
			if (indexOfItem === 0) {
				return previousCreator();
			}
		}
		setCurrentStoryIndex(previousIndex);
		setProgress(0);
	};

	//a timer for the progress bar
	useEffect(() => {
		const timer = setInterval(() => {
			if (progress < 100) {
				setProgress(progress + 1);
			} else {
				playNextStory();
			}
		}, 30); // Adjust the interval as needed

		return () => clearInterval(timer);
	}, [progress]);

	return (
		<div className="h-screen w-full fixed top-0 right-0 left-0 bottom-0 bg-background-primary backdrop-blur-lg z-[10] flex justify-center">
			<div className="h-screen flex flex-col sm:flex-row-reverse justify-between w-full">
				<div
					onClick={onClose}
					className="absolute md:relative top-0 right-0 sm:self-start m-2 bg-gray-700 text-white rounded-full p-2 cursor-pointer hover:bg-gray-800 active:bg-gray-600 z-10">
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
					className="flex-1 relative w-full sm:max-w-[600px] bg-black h-full flex flex-col justify-between items-center lg:mr-24">
					<div className="flex w-full px-4 pt-2 items-center justify-between">
						<Link to={`/profile/${currentStory?.creator?.userId}`}>
							<div className="flex items-center mt-3 gap-2">
								<div className="bg-gradient-to-r from-sky-500 to-violet-900 p-[4px] rounded-full">
									<img
										src={currentStory?.creator?.profileimage}
										className="w-[50px] h-[50px] rounded-full object-cover"
									/>
								</div>
								<div>
									<div className="flex items-center gap-2">
										<p className="text-light capitalize text-xl">
											{currentStory?.creator?.username}
										</p>
										<p className="text-gray-500 text-sm">
											{currentStory?.creator?.userId === userId && "Your story"}
										</p>
									</div>
									<p className="text-gray-500">
										{renderDate(currentStory?.createdAt)}
									</p>
								</div>
							</div>
						</Link>
						<div className="hover:bg-gray-700/60 transition p-2 cursor-pointer rounded-full">
							<MoreHoriz className="text-white" />
						</div>
					</div>
					<div className="flex-1 mb-16 flex justify-center items-center">
						<div className="absolute top-0 right-0 left-0 flex gap-2 p-2">
							{Array(currentStories.length)
								.fill(null)
								.map((_, index) => (
									<div className="w-full bg-light h-1 rounded-full" key={index}>
										<div
											className="bg-gradient-to-r from-sky-500 via-pink-600 to-violet-900 h-full rounded-full transition-all duration-75"
											style={{
												width: `${
													index === currentStoryIndex
														? progress
														: index < currentStoryIndex
														? 100
														: 0
												}%`,
											}}></div>
									</div>
								))}
						</div>
						<div className="flex items-center ">
							<button
								className="text-white absolute left-4 top-[50%] bg-primary-100 p-2 rounded-full cursor-pointer transition hover:bg-primary-100 active:scale-110 "
								onClick={() => playPreviousStory()}>
								<HiChevronLeft size={27} />
							</button>
							<img
								src={currentStory?.storyMedia}
								className="w-full max-h-[70vh] sm:max-h-none"
							/>
							<div
								className="text-white absolute right-4 top-[50%] bg-primary-100 p-2 rounded-full cursor-pointer transition hover:bg-primary-100 active:scale-110"
								onClick={() => playNextStory()}>
								<HiChevronRight size={27} />
							</div>
						</div>
					</div>
					<p className="text-white absolute bottom-10">
						{currentStory?.storyCaption}
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
					className="h-[70px] sm:h-auto bg-primary-200/60 p-2 md:p-4 flex flex-row items-center sm:items-start sm:flex-col gap-4 xl:min-w-[300px] overflow-x-scroll">
					<div className="hidden sm:flex gap-2 items-center">
						<Logo />
						<p className="hidden xl:block text-blue-base text-2xl font-bold">
							Facebook
						</p>
					</div>

					<div className="sm:border-t flex sm:block sm:w-full items-center gap-3 sm:border-gray-600 pt-2">
						<p className="text-2xl text-light xl:block hidden">Your story</p>
						<div
							className=" cursor-pointer active:bg-gray-600/10 transition rounded-lg"
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
						{stories && (
							<div className="w-full">
								<p className="text-2xl text-light xl:block hidden">
									All stories
								</p>
								<p className="text-sm text-gray-400 xl:block: hidden">
									Tap to view a story
								</p>
								<div className="flex flex-row sm:flex-col gap-3 sm:mt-4 cursor-pointer">
									{creators.map((creatorId, index) => (
										<div
											onClick={() => {
												setProgress(0);
												setCurrentStoryIndex(0);
												setCurrentCreatorIndex(index);
											}}
											key={index}
											className={`h-full w-full min-w-fit rounded-lg relative bg-primary-100/40 p-2 flex items-center gap-2 ${
												currentStory?.creator.userId === creatorId &&
												"border border-gray-700"
											}`}>
											<div className="relative">
												<div className="bg-primary-100 rounded-full p-0.5">
													<img
														src={
															stories.find(
																(story) => story.creator.userId === creatorId
															)?.creator?.profileimage
														}
														className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
													/>
												</div>
												<div className="h-3 w-3 bg-blue-light rounded-full absolute top-1 right-1"></div>
											</div>
											<div className="xl:block hidden">
												<p className="text-light text-lg capitalize">
													{
														stories.find(
															(story) => story.creator.userId === creatorId
														)?.creator?.username
													}
												</p>
												<p className="text-xs text-gray-500">
													{renderDate(
														stories.find(
															(story) => story.creator.userId === creatorId
														)?.createdAt as Date
													)}
												</p>
												{creatorId === userId && (
													<p className="absolute top-3 right-3 text-gray-400">
														Your story
													</p>
												)}
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
