import React from "react";
import { GroupMedia } from "../../../types/types";
import { Link } from "react-router-dom";
import useDateFormatter from "../../../hooks/useDate";
import StyledHashtags from "../../../hooks/useHashTags";
import placeholderAvatar from "../../../assets/avatar.webp";
interface Props {
	item: GroupMedia;
}
const MediaComponent: React.FC<Props> = ({ item }) => {
	return (
		<div className="bg-slate-200 dark:bg-primary-200 p-4 rounded-lg mb-3">
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-start">
					<Link to={`/profile/${item?.creator?.userId}`}>
						<div className="flex gap-3 items-center py-3 ">
							<div className="bg-primary-100 p-[3px] rounded-full">
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
		</div>
	);
};

export default MediaComponent;
