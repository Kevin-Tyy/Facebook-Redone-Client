import { Avatar, Button } from "@mui/material";
import image from "../../assets/bg-cover.jpg";
const SideRight = () => {
	return (
		<div className="bg-primary-200  p-4 rounded-lg w-[500px] flex flex-col gap-4">
			<div className="flex flex-col gap-3">
				<div className="flex justify-between items-center">
					<h1 className="text-lg text-light font-semibold">Friend Requests</h1>
					<span className="text-primary-100 font-semibold">30</span>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex gap-2">
						<Avatar className="cursor-pointer">P</Avatar>
						<div className="flex flex-col">
							<p className="text-lg font-semibold text-light cursor-pointer">
								Paulo Mora
							</p>
							<p className="text-xs text-light">12 mutual friends</p>
						</div>
					</div>
					<span className="text-gray-400 font-bold text-xs">4h</span>
				</div>
				<div className=" flex gap-2">
					<Button
						sx={{
							backgroundColor: "#0C88EF",
							p: 1,
							"&:hover": { backgroundColor: "#0C88EF" },
							textTransform: "capitalize",
							fontWeight: "bold",
							borderRadius: "7px",
                            color : '#D8D8D8'
						}}
						className="  w-full">
						See more
					</Button>
					<Button
						sx={{
							backgroundColor: "#010a13",
							p: 1.2,
							"&:hover": { backgroundColor: "#010a13" },
							textTransform: "capitalize",
							fontWeight: "bold",
							borderRadius: "7px",
						}}
						className="w-full text-primary-100 ">
						Delete
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-lg text-light font-semibold">Birthdays</h1>
				<div className="flex gap-2 items-center">
					<Avatar src={image} className="cursor-pointer"></Avatar>
					<div className="text-light text-sm">
						<span className="font-semibold cursor-pointer">Musk </span>and 7
						others have birthdays today
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<h1 className="text-lg text-light font-semibold">Active</h1>
				<div className="flex gap-2 items-center">
					<Avatar src={image} className="cursor-pointer"></Avatar>
					<p className="text-light cursor-pointer">Musk E.</p>
				</div>
				<div className="flex gap-2 items-center">
					<Avatar
						className="cursor-pointer"
						sx={{ backgroundColor: "#6cc46c" }}>
						R
					</Avatar>
					<p className="text-light cursor-pointer">John R.</p>
				</div>
				<div className="flex gap-2 items-center">
					<Avatar
						className="cursor-pointer"
						sx={{ backgroundColor: "#6cb0c4" }}>
						V
					</Avatar>
					<p className="text-light cursor-pointer">Vini Jr.</p>
				</div>
				<div className="flex gap-2 items-center">
					<Avatar
						className="cursor-pointer"
						sx={{ backgroundColor: "#c46c6c" }}>
						T
					</Avatar>
					<p className="text-light cursor-pointer">Tyrion T.</p>
				</div>
				<div className="flex gap-2 items-center">
					<Avatar
						className="cursor-pointer"
						sx={{ backgroundColor: "#a14dda" }}>
						J
					</Avatar>
					<p className="text-light cursor-pointer">Joe Smith</p>
				</div>
			</div>
			<Button
				sx={{
					backgroundColor: "#010a13",
					p: 1.5,
					"&:hover": { backgroundColor: "#010a13" },
					textTransform: "capitalize",
					fontWeight: "bold",
					borderRadius: "7px",
				}}
				className=" text-primary-100 ">
				See more
			</Button>
		</div>
	);
};

export default SideRight;
