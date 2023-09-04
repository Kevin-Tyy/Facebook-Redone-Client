import React, { useState } from "react";
import { GroupMedia, UserInfo } from "../../../types/types";
import { Link } from "react-router-dom";
import useDateFormatter from "../../../hooks/useDate";
import StyledHashtags from "../../../hooks/useHashTags";
import placeholderAvatar from "../../../assets/avatar.webp";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseURL } from "../../../utils/Link";
import { toast } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiEye } from "react-icons/hi";
import { BiShare } from "react-icons/bi";
import ReshareModal from "./ReshareModa";
import { FaRegComment } from "react-icons/fa";
interface Props {
	item: GroupMedia;
}
const MediaComponent: React.FC<Props> = ({ item }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { _id } = item;
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const [likedByLoggedInUser, setLikedByLoggedInUser] = useState(
		item.likes.some((item) => item.userId === userId)
	);
	const [likecount, setLikecount] = useState(item.likes.length);
	const handleLike = async () => {
		setLikedByLoggedInUser(!likedByLoggedInUser);
		if (likedByLoggedInUser) {
			setLikecount(likecount - 1);
			const { data } = await axios.delete(`${BaseURL}/groups/react/like`, {
				data: { userId, _id },
			});
			toast.success(data.msg);
		} else {
			setLikecount(likecount + 1);
			const { data } = await axios.post(`${BaseURL}/groups/react/like`, {
				userId,
				_id,
			});
			toast.success(data.msg);
		}
	};
	const styleClass = `flex items-center justify-center cursor-pointer gap-[1px] font-bold`;

	return (
		<div className="bg-slate-200 dark:bg-primary-200 p-4 rounded-lg mb-3">
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-start">
					<Link to={`/profile/${item?.creator?.userId}`}>
						<div className="flex gap-3 items-center py-3 ">
							<div className="bg-slate-400 dark:bg-primary-100 p-[3px] rounded-full">
								<img
									src={
										item?.creator?.profileimage
											? item?.creator?.profileimage
											: placeholderAvatar
									}
									className="w-12 h-12  rounded-full object-cover"
								/>
							</div>
							<div className="flex flex-col">
								<p className=" text-slate-700 dark:text-light capitalize">
									{item?.creator?.firstname} {item?.creator?.lastname}
								</p>
								<div className="flex items-center space-x-2 text-gray-500/80">
									<p className="text-sm capitalize">
										@{item?.creator?.username}
									</p>
									<span>•</span>
									<p className="text-sm">{useDateFormatter(item?.createdAt)}</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className=" text-slate-700 dark:text-white cursor-pointer inline">
						<StyledHashtags text={item?.text} />
					</h1>
					<div className="flex flex-col gap-2">
						<div className="relative cursor-pointer group">
							<img
								src={item?.image}
								className="w-auto mx-auto max-h-[700px] object-cover rounded-xl "
							/>
							<div className="bg-white absolute inset-0  h-full w-full opacity-0 group-hover:opacity-[0.02] transition group-active:opacity-5"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<div className="flex w-full sm:w-4/5 justify-between items-center gap-2 p-1 rounded-lg ">
					<Tooltip title={likedByLoggedInUser ? "Unlike" : "Like"}>
						<div
							className={` ${styleClass}  group  ${
								likecount !== 0 ? "text-pink-800" : "text-gray-500"
							}`}
							onClick={handleLike}>
							<div
								className={` group-hover:bg-pink-800/20 group-hover:text-pink-600 p-3 rounded-full group-active:animate-ping transition-all duration-500`}>
								{likedByLoggedInUser ? (
									<AiFillHeart size={20} />
								) : (
									<AiOutlineHeart size={20} />
								)}
							</div>
							<p className=" text-sm translate-y-[1px] group-hover:text-pink-600 transition-all duration-500">
								{likecount}
							</p>
						</div>
					</Tooltip>
					<Tooltip title="Comment">
						<div className={`${styleClass} text-gray-500 group`}>
							<div
								className={`${styleClass} transition-all duration-500  group-hover:bg-sky-800/20 p-3 rounded-full group-hover:text-sky-700`}>
								<FaRegComment size={20} />
							</div>
						</div>
					</Tooltip>
					<Tooltip title="Views">
						<div className={`${styleClass} text-gray-500 group`}>
							<div
								className={`${styleClass}  transition-all duration-500 text-gray-500 group-hover:bg-green-800/20 p-3 rounded-full group-hover:text-green-700`}>
								<HiEye size={20} />
							</div>
							<p className=" text-sm translate-y-[1px] group-hover:text-green-700 transition-all duration-500"></p>
						</div>
					</Tooltip>
					<Tooltip title="Share">
						<div
							className={`${styleClass} text-gray-500 group`}
							onClick={() => setIsModalOpen(true)}>
							<div
								className={`${styleClass}  transition-all duration-500 text-gray-500 group-hover:bg-green-800/20 p-3 rounded-full group-hover:text-green-700`}>
								<BiShare size={20} />
							</div>
							<p className=" text-sm translate-y-[1px] group-hover:text-green-700 transition-all duration-500">{item?.shares}</p>
						</div>
					</Tooltip>
				</div>
			</div>
			<ReshareModal
				post={item}
				isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
};

export default MediaComponent;
