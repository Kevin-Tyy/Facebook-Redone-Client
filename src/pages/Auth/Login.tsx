import { FC, useEffect } from "react";
import {
	PersonOutlined,
	KeyOutlined,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from "@mui/icons-material";
import gmailImage from "../../assets/gmail.png";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BaseURL } from "../../utils/Link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser, login } from "../../redux/features/AuthSlice";
import { decodeToken } from "../../utils/decodeToken";

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
				const userInfo = decodeToken(data.token);
				dispatch(login(userInfo));
				toast.success(data?.msg);

				navigate("/home");
			}
		} catch (error) {
			toast.error("Something went wrong, Try again later");
		}
		setIsLoading(false)
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
			<div className="bg-gradient-to-br from-gray-800 bg-gray-950  h-screen w-full flex justify-center items-center">
				<form
					onSubmit={handleSubmit}
					className=" flex flex-col gap-7 p-3 w-[400px]">
					<h1 className="text-white text-center text-4xl mb-4">Login</h1>
					<hr className="border-neutral-500" />
					<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
						<PersonOutlined />
						<input
							type="text"
							className="bg-transparent outline-none w-full placeholder:text-neutral-400"
							placeholder="Username"
							onChange={handleInputChange}
							name="username"
							value={formData.username}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
							<KeyOutlined />
							<input
								type={isPasswordVisible ? "text" : "password"}
								className="bg-transparent outline-none w-full placeholder:text-neutral-400"
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
							backgroundColor: "rgb(30 , 58 , 138)",
							borderRadius: "9999px",
							textTransform: "capitalize",
							p: "12px",
							"&:hover": { backgroundColor: "rgb(40 , 58 , 138)" },
							"&:focus": { backgroundColor: "rgb(40 , 58 , 138" },
						}}>
						{isLoading ? (
							<CircularProgress size={20} sx={{ color: "#fff" }} />
						) : (
							"Sign in"
						)}
					</Button>
					<button className=" flex items-center justify-center gap-2 border border-neutral-600 p-3 rounded-full hover:bg-neutral-950/20">
						<img src={gmailImage} className="w-6" />
						<p className="text-white">Continue with google</p>
					</button>
					<div className="text-center">
						<p className="text-white">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-blue-500 cursor-pointer hover:underline">
								Register
							</Link>
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
