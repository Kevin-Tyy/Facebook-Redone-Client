import React from "react";
import { motion } from "framer-motion";
interface ModalProps {
	children: React.ReactNode;
	onClose: (value: any) => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
	return (
		<div
			className="backdrop-blur-sm bg-gray-950/50 h-screen w-full fixed top-0 right-0 bottom-0 left-0 z-[10] flex justify-center items-center "
			onClick={onClose}>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.2, delay: 0.2 }}
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}
				onClick={(e) => e.stopPropagation()}
				className="relative bg-primary-200 w-full ring-1 ring-inset ring-gray-700/50 max-w-[550px] p-3 rounded-lg ">
				{children}
			</motion.div>
		</div>
	);
};

export default Modal;
