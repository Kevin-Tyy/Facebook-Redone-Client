import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Notification, UserInfo } from "../../types/types";
import { useSelector } from "react-redux";
import useDateFormatter from "../../hooks/useDate";
import { useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { BsFillBellFill, BsTrash } from "react-icons/bs";
import { HiEye } from "react-icons/hi";
interface Props {
	updateBadge: () => void;
	onClose: () => void;
}
const NotificationPopup: FC<Props> = ({ onClose, updateBadge }) => {
	const [notifications, setNotifications] = useState<Notification[] | null>(
		null
	);
	const {
		user: {
			userInfo: { userId },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	const componentRef = useRef<HTMLDivElement>(null);

	//function to handle outside click events
	const handleOutSideClick = (e: any) => {
		if (componentRef.current && !componentRef.current.contains(e.target)) {
			onClose();
		}
	};

	//add event for clicks outside the component
	useEffect(() => {
		document.addEventListener("mousedown", handleOutSideClick);
		return () => document.addEventListener("mousedown", handleOutSideClick);
	}, []);

	//fetch notifications on component mount and mark them as read after being mounted
	useEffect(() => {
		__getNotifications();
		// axios.put(`${BaseURL}/notifications/${userId}`)
	}, []);

	//api function to fetch notifications from the server
	const __getNotifications = () => {
		axios.get(`${BaseURL}/notifications/${userId}`).then((response) => {
			setTimeout(() => {
				setNotifications(response.data.notifications);
			}, 1000);
		});
	};

	const navigate = useNavigate();

	//api to handle --mark all as read--
	const handleMarkAsRead = () => {
		axios.put(`${BaseURL}/notifications/${userId}`).then(() => {
			updateBadge()
			__getNotifications();
		});
	};
	//api to handle --delete all notifications--
	const deleteNotifications = () => {
		setNotifications(null);
		axios.delete(`${BaseURL}/notifications/${userId}`).then(() => {
			updateBadge()
			__getNotifications();
		});
	};

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.1 }}
			transition={{ duration: 0.3, delay: 0.1 }}
			variants={{
				hidden: { opacity: 0, y: -30 },
				visible: { opacity: 1, y: 0 },
			}}
			ref={componentRef}
			className="fixed top-20 right-10">
			<div className="h-[50vh] relative w-full max-w-[400px] sm:min-w-[400px] bg-slate-100 dark:bg-primary-200/70 backdrop-blur-2xl rounded-lg flex-col ring-1 ring-slate-300 dark:ring-gray-700 overflow-hidden">
				<div className="flex flex-1 h-full">
					{!notifications && (
						<div className="grid place-content-center w-full">
							<CircularProgress size={20} />
						</div>
					)}
					{notifications &&
						(notifications.length < 1 ? (
							<div className="grid place-content-center w-full">
								<h1 className="text-gray-500  mb-1 flex flex-col items-center gap-1">
									{" "}
									<BiBell size={30} />
									You have no notifications.
								</h1>
							</div>
						) : (
							<section className="p-1 w-full h-full pb-44 overflow-y-scroll">
								<div className="mt-3 p-2 group w-fit cursor-default ml-3">
									<h1 className="text-slate-500 dark:text-white text-xl mb-1 flex items-center gap-1 relative ">
										{" "}
										<BiBell size={20} />
										Notifications
										{notifications?.length !== 0 &&
											!notifications?.every((notification) =>
												notification.Seen.some((user) => user.userId === userId)
											) && (
												<span className="text-white bg-red-600 p-1 rounded-full w-6 h-6 text-sm absolute -top-3 grid place-content-center -right-5">
													{notifications.length}
												</span>
											)}
									</h1>
									<div className="w-3/5 h-1 bg-blue-base rounded-full mt-2 group-hover:w-full transition-all duration-300"></div>
								</div>
								<div className="space-y-3 mt-3 h-fit overflow-y-scroll">
									{notifications.map((notification) => (
										<div
											onClick={() => navigate(notification?.link)}
											className="relative flex justify-between items-start gap-10 m-2 p-3 bg-gradient-to-br bg-slate-200 dark:bg-primary-100/40 hover:bg-slate-300/60 dark:hover:bg-primary-100/70 rounded-lg cursor-pointer"
											key={notification._id}>
											<div className="flex items-start gap-4">
												{notification?.creator?.profileimage ? (
													<img
														src={notification?.creator?.profileimage}
														className="w-8 h-8 object-cover rounded-full"
													/>
												) : (
													<div className="bg-gradient-to-br  from-blue-700 to-blue-200 p-2 rounded-full">
														<BsFillBellFill size={15} className="text-white" />
													</div>
												)}
												<h1 className="text-slate-700 dark:text-gray-400 first-letter:capitalize w-3/4">
													{notification.message}
												</h1>
											</div>
											<p className="absolute top-1 right-3 text-gray-500 text-sm">
												{useDateFormatter(notification.dateTime)}
											</p>
											{notification.Seen.some(
												(seen) => seen.userId === userId
											) && (
												<HiEye className="text-gray-500 absolute bottom-1 right-3" />
											)}
										</div>
									))}
								</div>
							</section>
						))}
				</div>
				{notifications && notifications.length > 0 && (
					<div className="bg-gradient-to-b from-transparent via-gray-100 dark:via-[#1d1f27] to-slate-200 dark:to-[#191d25] absolute bottom-0 h-28  w-full flex items-end justify-between p-2">
						<button
							onClick={handleMarkAsRead}
							className=" w-fit text-blue-base m-1 hover:text-blue-light transition duration-500 hover:underline rounded-full">
							Mark all as read
						</button>
						<button
							disabled={!notifications || notifications.length < 1}
							onClick={deleteNotifications}>
							<Tooltip title="Delete notifications">
								<div className="text-gray-500 m-1 cursor-pointer hover:bg-slate-300 dark:hover:bg-primary-100 p-2 rounded-md transition dark:hover:text-white">
									<BsTrash size={21} />
								</div>
							</Tooltip>
						</button>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default NotificationPopup;
