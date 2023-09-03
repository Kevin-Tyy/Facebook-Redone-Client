import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils/Link";
import { Userdata } from "../../types/types";
import { HiUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import placeholderAvatar from '../../assets/avatar.webp'
interface Props {
	searchKey: string;
	onClose: () => void;
}

const SearchPopup = ({ searchKey, onClose }: Props) => {
	const [peopleResults, setPeopleResults] = useState<Userdata[] | null>(null);
	const [loading, setLoading] = useState(false);
	//function to handle outside click events

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${BaseURL}/search?q=${searchKey}`)
			.then((response) => {
				setPeopleResults(response.data.people);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [searchKey]);

	const navigate = useNavigate();
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
			className="fixed top-20 left-10 z-50">
			<div className="h-[50vh] relative w-full max-w-[500px] min-w-[400px] bg-slate-100 dark:bg-primary-200/70 backdrop-blur-xl rounded-lg flex-col ring-1 ring-slate-300 dark:ring-gray-700 overflow-hidden">
				{loading && (
					<div className="grid place-content-center h-full">
						<CircularProgress size={20} />
					</div>
				)}
				{peopleResults && (
					<div className="p-3 space-y-4 h-full overflow-y-auto">
						<div className="flex justify-between items-start">
							<div className="mb-4 group w-fit cursor-default ml-3">
								<h1 className=" text-slate-700 dark:text-white text-lg mb-1">People</h1>
								<div className="w-10 h-1 bg-blue-base rounded-full mt-1 group-hover:w-full transition-all duration-300"></div>
							</div>
							<p className="text-gray-400 px-2">
								Results ({peopleResults.length})
							</p>
						</div>
						{peopleResults.length < 1 && (
							<div className="w-full h-4/5 grid place-content-center">
								<div className="flex space-x-2 items-center text-gray-300">
									<HiUserGroup size={24} />
									<p className="text-lg">No Results found</p>
								</div>
							</div>
						)}
						<div className="flex flex-col gap-2">
							{peopleResults.map((person, index) => (
								<div
									key={index}
									className="flex items-start justify-between  bg-slate-200 dark:bg-primary-100/30 py-4 px-3 rounded-md">
									<div className="flex w-full gap-3">
										<img
											src={person.profileimage || placeholderAvatar}
											className="w-12 h-12 object-cover rounded-full"
										/>
										<div className="w-4/5">
											<p className=" text-slate-700 dark:text-white capitalize">
												{person.firstname} {person.lastname}
											</p>
											<div className="flex items-center space-x-2 text-gray-400 overflow-hidden text-ellipsis">
												<p className="text-sm capitalize whitespace-nowrap">@{person.username}</p>
												<span>•</span>
												<p className="text-sm  w-full overflow-hidden text-ellipsis">{person.email}</p>
											</div>
										</div>
									</div>
									<Button
										onClick={() => {
											navigate(`/profile/${person.userId}`);
											onClose();
										}}
										sx={{
											color: "white",
											backgroundColor: "#0C88EF",
											textTransform: "capitalize",
											borderRadius: "5px",
											width: "fit-content",
											px: "15px",
											py: "8px",
											whiteSpace: "nowrap",
											"&:hover": { backgroundColor: "#3293e3" },
										}}>
										View profile
									</Button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default SearchPopup;
