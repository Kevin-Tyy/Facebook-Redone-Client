import {
	HiOutlineCamera,
} from "react-icons/hi2";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import placeholderAvatar from "../../../assets/avatar.webp";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { GroupType, UserInfo } from "../../../types/types";
import GrpPostModal from "./GrpPostModal";
interface Props {
	groupData: GroupType;
	fetchGroupData: () => void;
}
const ShareComponent: React.FC<Props> = ({ groupData, fetchGroupData }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const {
		user: {
			userInfo: { profileimage, username },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	return (
		<div className="">
			<div className="flex flex-col bg-slate-200 dark:bg-primary-200 rounded-2xl p-4 md:p-6 gap-6">
				<div className="flex items-center gap-2 sm:gap-6">
					<div className="bg-slate-300 dark:bg-primary-100 p-[3px] rounded-full w-full max-w-fit">
						<img
							src={profileimage || placeholderAvatar}
							className="w-14 h-12  rounded-full object-cover"
						/>
					</div>
					<p
						className=" bg-slate-100 dark:bg-primary-100/30 whitespace-nowrap overflow-hidden text-ellipsis text-slate-400 dark:text-light/60 hover:bg-slate-400/30 dark:hover:bg-primary-100 rounded-full transition duration-300 cursor-pointer  w-full p-4"
						onClick={() => setIsModalOpen(true)}>
						<span className="capitalize">{username}</span>, Share your thoughts in this group
					</p>
					<div
						className="flex flex-col rounded-md hover:bg-slate-400/40 dark:hover:bg-primary-100/40 transition text-blue-base cursor-pointer px-3 py-1 items-center"
						onClick={() => setIsModalOpen(true)}>
						<HiOutlineCamera size={25} />
						<p className="text-sm">Photo</p>
					</div>
				</div>

				{groupData && (
					<GrpPostModal
						onClose={() => setIsModalOpen(false)}
						isOpen={isModalOpen}
						groupData={groupData}
						fetchGroupData={fetchGroupData}
					/>
				)}
			</div>
		</div>
	);
};
export default ShareComponent;
