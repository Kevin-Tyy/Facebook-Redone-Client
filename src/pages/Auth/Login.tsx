import { FC, useEffect } from "react";
import {
	PersonOutlined,
	KeyOutlined,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BaseURL } from "../../utils/Link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser, login } from "../../redux/features/AuthSlice";
import { decodeToken } from "../../utils/decodeToken";
import Logo from "../../components/Logo";

interface FormData {
	username: string;
	password: string;
}

const Login: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loggedIn } = useSelector(loggedInUser);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
	});
	useEffect(() => {
		document.title = "Facebook | Login";
		{
			loggedIn && navigate("/home");
		}
	}, []);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const { data } = await axios.post(`${BaseURL}/user/login`, {
				...formData,
			});
			setIsLoading(false);
			if (!data.success) {
				toast.error(data?.msg);
			} else {
				const userInfo = decodeToken(data?.token);
				dispatch(login(userInfo));
				toast.success(data?.msg);
				navigate("/home");
			}

		} catch (error) {
			toast.error("Something went wrong, Try again later");
		}
		setIsLoading(false);
	};
	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
	return (
		<div className="relative">
			{/* <div className="fixed bottom-0 z-[-1] h-screen w-full bg-gradient-to-b from-black/10 via-black/70 to-black"></div> */}
			<div className="bg-slate-100 dark:bg-gradient-to-br from-gray-800 dark:bg-gray-950  h-screen w-full flex justify-center items-center">
				<form
					onSubmit={handleSubmit}
					className=" flex flex-col gap-7 p-3 w-full sm:w-[400px]">
					<div className="flex flex-col gap-3 items-center">
						<Logo />
						<h1 className="text-slate-500 dark:text-white text-center text-3xl font-bold">
							Sign into your account
						</h1>
					</div>
					<hr className="border-t border-gray-700" />
					<div
						className={`text-slate-700 dark:text-white flex items-center gap-3  p-3 bg-gray-300 dark:bg-gray-800 rounded-md transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-400 dark:focus-within:outline-gray-500 ${
							isLoading && "opacity-60"
						}`}>
						<PersonOutlined />
						<input
							type="text"
							className="bg-transparent outline-none w-full placeholder:text-slate-500 dark:placeholder:text-neutral-400 text-black dark:text-white"
							placeholder="Email or username"
							disabled={isLoading}
							onChange={handleInputChange}
							name="username"
							value={formData.username}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div
							className={`text-slate-700 dark:text-white flex items-center gap-3  p-3 bg-gray-300 dark:bg-gray-800 rounded-md transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-400 dark:focus-within:outline-gray-500 ${
								isLoading && "opacity-60"
							}`}>
							<KeyOutlined />
							<input
								type={isPasswordVisible ? "text" : "password"}
								className="bg-transparent outline-none w-full placeholder:text-slate-500 dark:placeholder:text-neutral-400"
								disabled={isLoading}
								placeholder="Password"
								onChange={handleInputChange}
								name="password"
								value={formData.password}
							/>
							<button
								className="outline-none"
								onClick={(e) => {
									e.preventDefault();
									setIsPasswordVisible(!isPasswordVisible);
								}}>
								{isPasswordVisible ? (
									<VisibilityOffOutlined />
								) : (
									<VisibilityOutlined />
								)}
							</button>
						</div>
						<div className="text-right">
							<p className="text-gray-400 cursor-pointer hover:underline -translate-x-3">
								Forgot password
							</p>
						</div>
					</div>
					<Button
						type="submit"
						disabled={isLoading}
						sx={{
							color: "white",
							backgroundColor: "#0C88EF",
							borderRadius: "7px",
							textTransform: "capitalize",
							p: "12px",
							"&:hover": { backgroundColor: "#3293e3" },
							"&:focus": { backgroundColor: "rgb(40 , 58 , 138" },
						}}>
						{isLoading ? (
							<CircularProgress size={20} sx={{ color: "#fff" }} />
						) : (
							"Sign in"
						)}
					</Button>
					<hr className="border-t border-gray-700" />

					<div className="text-center">
						<p className="text-slate-700 dark:text-white">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-blue-500 cursor-pointer hover:underline">
								Register
							</Link>
						</p>{" "}
						<p className="mt-5 text-gray-500 text-sm">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
							placeat perferendis exercitationem illum explicabo delectus?
						</p>
					</div>
				</form>
			</div>
			<Toaster
				toastOptions={{
					style: {
						textAlign: "center",
						padding: "10px",
						fontWeight: 500,
					},
				}}
			/>
		</div>
	);
};

export default Login;
