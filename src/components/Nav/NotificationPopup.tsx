import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { Notification, UserInfo } from "../../types/types";
import { useSelector } from "react-redux";
import useDateFormatter from "../../hooks/useDate";
import { useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
interface Props {
	onClose: () => void;
}
const NotificationPopup: FC<Props> = ({ onClose }) => {
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
	const handleOutSideClick = (e: any) => {
		if (componentRef.current && !componentRef.current.contains(e.target)) {
			onClose();
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleOutSideClick);
		return () => document.addEventListener("mousedown", handleOutSideClick);
	}, []);
	useEffect(() => {
		axios.get(`${BaseURL}/notifications/${userId}`).then((response) => {
			setTimeout(() => {
				setNotifications(response.data.notifications);
			}, 2000);
		});
	}, []);
	console.log(notifications);
	const navigate = useNavigate();
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.1 }}
			transition={{ duration: 0.15, delay: 0.2 }}
			variants={{
				hidden: { opacity: 0, y: -30 },
				visible: { opacity: 1, y: 0 },
			}}
			ref={componentRef}
			className="fixed top-20 right-10">
			<div className="h-[40vh] overflow-auto w-full max-w-[400px] sm:min-w-[400px] bg-primary-200 rounded-lg flex  ring-1 ring-gray-700">
				{!notifications && (
					<div className="grid place-content-center w-full">
						<CircularProgress size={20} sx={{ color: "white" }} />
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
						<section className="p-3 w-full">
							<div className="mt-3 group w-fit cursor-default ml-3">
								<h1 className="text-white text-xl mb-1 flex items-center gap-1">
									{" "}
									<BiBell size={20} />
									Notifications
								</h1>
								<div className="w-3/5 h-1 bg-blue-base rounded-full mt-2 group-hover:w-full transition-all duration-300"></div>
							</div>
							<div className="space-y-2 mt-3">
								{notifications.map((notification) => (
									<div
										onClick={() => navigate(notification?.link)}
										className="flex justify-between items-start gap-10 m-2 p-2 "
										key={notification._id}>
										<div className="flex items-start gap-2">
											{notification?.creator?.profileimage && (
												<img
													src={notification?.creator?.profileimage}
													className="w-8 h-8 object-cover rounded-full"
												/>
											)}
											<h1 className="text-gray-400 first-letter:capitalize">
												{notification.message}
											</h1>
										</div>
										<p className="text-gray-600 text-sm">
											{useDateFormatter(notification.dateTime)}
										</p>
									</div>
								))}
							</div>
						</section>
					))}
			</div>
		</motion.div>
	);
};

export default NotificationPopup;
