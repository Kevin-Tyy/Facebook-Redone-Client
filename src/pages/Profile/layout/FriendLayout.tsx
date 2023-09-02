import { UserInfo, Userdata } from "../../../types/types";
import FriendLoader from "../../../components/Loaders/Skeleton/FriendPageLoader";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/features/AuthSlice";
import { Link } from "react-router-dom";
import placeholderimage from "../../../assets/avatar.webp";
import { Avatar, AvatarGroup } from "@mui/material";
import { __findMutualFriends } from "../../../utils/apiFunctions";
interface Props {
	userData: Userdata;
	loggedInUserData: Userdata;
}
const FriendLayout = ({ loggedInUserData, userData }: Props) => {
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as { user: { userInfo: UserInfo } };
	const friends = userData.friendList;
	return (
		<div>
			{friends ? (
				<div className="flex flex-col gap-4 bg-slate-100 dark:bg-primary-100/20 p-4 rounded-xl border dark:border-gray-800">
					<h1 className=" text-slate-700 dark:text-white text-2xl text-center capitalize">
						{userData?.userId == userId ? "Your " : userData?.username + "'s"}{" "}
						friends{" "}
						<span className="text-blue-light text-2xl">
							({friends?.length})
						</span>
					</h1>
					{friends.length > 0 ? (
						<div className="flex flex-col gap-6">
							{friends.map((user, index) => (
								<div
									className="bg-slate-200 dark:bg-primary-200 p-4 rounded-lg border dark:border-gray-800"
									key={index}>
									<div className="flex flex-col sm:flex-row items-center gap-4">
										<Link to={`/profile/${user?.userId}`}>
											<div className="bg-slate-100 dark:bg-primary-200 rounded-full p-1">
												<img
													src={user.profileimage || placeholderimage}
													className="w-32 h-32 min-h-[130px] min-w-[130px] object-cover rounded-full"
												/>
											</div>
										</Link>
										<div className="flex flex-col items-start gap-2 w-full">
											<Link to={`/profile/${user?.userId}`}>
												<p className="text-xl  text-slate-700 dark:text-white capitalize">
													{user.firstname} {user.lastname}
												</p>
												<div className="flex gap-2">
													<p className="text-gray-400">
														@{user.username.split(" ")[0]}
													</p>
													<span className=" text-slate-400 dark:text-white">
														•
													</span>
													<p className="text-gray-400">{user.email}</p>
												</div>
											</Link>
											<div className="flex gap-2 items-center">
												<AvatarGroup total={user?.friendList?.length}>
													{user?.friendList.slice(0, 4).map((friend, index) => (
														<Avatar
															key={index}
															src={friend?.profileimage}
															sx={{ width: 20, height: 20 }}
														/>
													))}
												</AvatarGroup>
												<p className="text-slate-500">
													<span className="text-sm">
														{user?.friendList?.length} friend
														{user?.friendList?.length !== 1 && "s"}
													</span>{" "}
													{user.userId === userId &&
													user.userId === loggedInUserData?.userId ? (
														<span className="text-sm">
															(you)
														</span>
													) : (
														<span className="text-sm">
															(
															{
																__findMutualFriends(
																	loggedInUserData?.friendList,
																	user?.friendList
																)?.length as any
															}{" "}
															mutual)
														</span>
													)}
												</p>
											</div>{" "}
											<div className="flex flex-col md:flex-row w-full gap-3">
												<Link
													to={`/profile/${user?.userId}`}
													className="w-full">
													<button className="text-white rounded-full p-3 max-w-[150px] w-full h-full bg-blue-base hover:bg-blue-light transition">
														View profile
													</button>
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-base text-center text-light/60 pb-6">
							{userData?.userId == userId
								? "You have"
								: `@${userData?.username.split(" ")[0]} has `}
							no friends!
						</div>
					)}
				</div>
			) : (
				<FriendLoader />
			)}
		</div>
	);
};

export default FriendLayout;
