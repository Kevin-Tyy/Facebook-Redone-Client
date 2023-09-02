import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseRounded } from "@mui/icons-material";

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="backdrop-blur-md bg-neutral-950/50 h-screen w-full fixed top-0 right-0 bottom-0 left-0 z-[10] flex justify-center items-center" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-in-out duration-300"
							enterFrom="opacity-0 -translate-y-10 "
							enterTo="opacity-100 translate-y-0"
							leave="ease-out duration-300"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-10 ">
							<Dialog.Panel>
								<button
									onClick={onClose}
									className="text-slate-500 dark:text-white hover:bg-slate-300 dark:hover:bg-gray-700 rounded-full p-1.5 absolute top-5 right-3 cursor-pointer z-10">
									<CloseRounded  />
								</button>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
