import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Userdata } from "../../../types/types";
import { Link } from "react-router-dom";

interface LikesPopupProps {
	likes: Userdata[];
	onClose: () => void;
}
const LikesPopup: React.FC<LikesPopupProps> = ({ likes, onClose }) => {
	const toggleRef = useRef<HTMLDivElement | null>(null);

	const handleOutsideClick = (e: any) => {
		if (toggleRef.current && !toggleRef.current.contains(e.target)) {
			onClose();
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.addEventListener("mousedown", handleOutsideClick);
		};
	}, []);
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
			ref={toggleRef}
			className="absolute top-6 -right- bg-slate-200/10 dark:bg-primary-200/10 backdrop-blur-md ring-1 rounded-md ring-slate-400 dark:ring-gray-700 p-1 z-50 w-32">
			<ul className=" text-slate-700 dark:text-white flex flex-col gap-2 p-2 ">
				{likes.map((person, index) => (
					<li
						key={index}
						className="hover:underline decoration-dotted whitespace-nowrap">
						<Link to={`/profile/${person.userId}`}>
							<span>
								{person.firstname} {person.lastname}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</motion.div>
	);
};

export default LikesPopup;
