import { useEffect, useState } from "react";
import CreateModal from "./components/CreateModal.jsx";
import axios from "axios";
import { BaseURL } from "../../utils/Link.js";
import { GroupType, UserInfo } from "../../types/Types.js";
import Sidebar from "../../components/SideBar/SideLeft.js";
import useDateFormatter from "../../hooks/useDate.js";
import SideRight from "../../components/SideBar/SideRight.js";
import Loading from "../../components/shared/loading.js";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice.js";
const Groups = () => {
	const [groups, setGroups] = useState<GroupType[] | null>(null);
	const [createGroup, setCreateGroup] = useState(false);
	const [limit, setLimit] = useState(5);
	const [globalLoading, setGlobalLoading] = useState(false);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const fetchGroups = () => {
		axios.get(`${BaseURL}/groups`).then((response) => {
			setGroups(response.data);
		});
	};
	useEffect(() => {
		fetchGroups();
	}, []);
	const joinGroup = (groupId: string) => {
		setGlobalLoading(true);
		axios
			.post(`${BaseURL}/groups/join/${groupId}`, { userId: userId })
			.then((response) => {
				toast.success(response.data.msg);
				setGlobalLoading(false);
			})
			.catch((error) => {
				toast.error(error.data.msg);
			});
	};

	return (
		<div className="min-h-screen bg-background-primary pb-20">
			<div className="p-2 md:p-10 2xl:p-0 flex 2xl:justify-center">
				<div className="w-full pt-6 flex justify-center gap-6">
					<Sidebar />
					<div className="w-full max-w-[800px]">
						<div className="p-8  flex justify-between items-center">
							<p className="text-white">
								Groups, a new way to organize your posts and discussions
							</p>
							<button
								onClick={() => setCreateGroup(true)}
								className="bg-white p-4 rounded-full">
								Create a group
							</button>
						</div>
						<div className="flex flex-col gap-2">
							{groups?.slice(0, limit)?.map((group, index) => (
								<div
									key={index}
									className="text-white rounded-lg bg-primary-200 p-6">
									<div className="relative flex gap-5 items-center">
										<img
											src={group.groupImage}
											alt=""
											className="w-[120px] rounded-md h-[120px] object-cover"
										/>
										<div className="text-gray-400 space-y-2">
											<p className="text-white">{group.groupName}</p>
											<p>{group.groupDescription}</p>
											<div className="flex">
												<p>{group.groupMembers.length} members</p>
												<span>•</span>
												{group.groupMembers.some(
													(member) => member.userId === userId
												) && <p className="text-sm">You joined this group</p>}
											</div>
											<p className="absolute top-0 right-0">
												Created {useDateFormatter(new Date(group.createdAt))}{" "}
												ago
											</p>
										</div>
										<button
											onClick={() => joinGroup(group._id)}
											className="absolute bottom-0 right-0 py-3 px-4 bg-blue-base rounded-full hover:bg-blue-light transition">
											Join Group
										</button>
									</div>
								</div>
							))}
						</div>
						<button
							className="bg-white py-3 px-6 rounded-full m-4"
							onClick={() => setLimit(limit + 5)}>
							See more
						</button>
					</div>
					<SideRight />
				</div>
			</div>
			<CreateModal
				isOpen={createGroup}
				onClose={() => setCreateGroup(false)}
				fetchGroups={fetchGroups}
			/>
			{globalLoading && <Loading />}
		</div>
	);
};

export default Groups;
