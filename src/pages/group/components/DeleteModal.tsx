import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import Modal from "../../../components/Modals";
import { BaseURL } from "../../../utils/Link";
import { useNavigate } from "react-router-dom";
interface RepostModalProps {
	groupId: string;
	onClose: () => void;
	isOpen: boolean;
}
const RepostModal: React.FC<RepostModalProps> = ({
	groupId,
	onClose,
	isOpen,
}) => {
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		setLoading(true);
		axios
			.delete(`${BaseURL}/groups/${groupId}`)
			.then((response) => {
				toast.success(response.data?.msg);
				onClose();
				navigate("/i/groups");
			})
			.catch((err) => toast.error(err.response.data.msg))
			.finally(() => setLoading(false));
	};
	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<div className="relative bg-primary-200  ring-1 ring-inset ring-gray-700/50 w-full xs:w-[400px] sm:w-[500px] p-6 rounded-lg">
				<div className="p-3 border-b border-gray-700">
					<h1 className="text-2xl text-center font-bold text-light">
						Delete this group.
					</h1>
				</div>
				<div className="flex flex-col items-center space-y-10 mt-4">
					<p className=" text-light/50 text-center">
						Are you sure you want to delete this group? If so, click the delete
						button. You can cancel at any time by clicking the cancel button
					</p>
					<form onSubmit={handleSubmit} className="flex items-center gap-4">
						<Button
							type="submit"
							sx={{
								color: "white",
								backgroundColor: "rgb(220,38,38,0.2)",
								border: "1px solid rgb(220,38,38)",
								textTransform: "capitalize",
								borderRadius: "40px",
								alignSelf: "flex-start",
								width: "80px",
								height: "35px",
								"&:hover": { backgroundColor: "rgb(220,38,38, 0.4)" },
							}}>
							{loading ? (
								<CircularProgress size={15} sx={{ color: "white" }} />
							) : (
								"Delete"
							)}
						</Button>
						<div
							onClick={onClose}
							className={`bg-blue-base px-6 py-2 rounded-full hover:bg-blue-light text-white transition cursor-pointer ${
								loading && "opacity-50"
							}`}>
							Cancel
						</div>
					</form>
				</div>
			</div>
		</Modal>
	);
};

export default RepostModal;
