// import React from 'react'
import {
	Person2Outlined,
	KeyOutlined,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from "@mui/icons-material";
import bgCover from "../../assets/bg-cover.jpg";
import gmailImage from "../../assets/gmail.png";
import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// type Props = {};

const Login = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	if (isPasswordVisible) {
		setTimeout(() => {
			setIsPasswordVisible(false);
		}, 1500);
	}
	return (
		<div className="relative">
			<div className="absolute top-5 right-5 text-white text-4xl font-mono cursor-pointer">
				Logo
			</div>
			<img
				src={bgCover}
				className="fixed z-[-2] h-screen w-full top-0 left-0 right-0 bottom-0 object-cover"
			/>
			<div className="fixed bottom-0 z-[-1] h-screen w-full bg-gradient-to-b from-black/10 via-black/70 to-black"></div>
			<div className="bg-gradient-to-r from-gray-900/40 via-gray-900 to-gray-950 h-screen w-full flex justify-center items-center">
				<form className=" flex flex-col gap-7 p-3 w-[400px]">
					<h1 className="text-white text-center text-4xl mb-4">Login</h1>
					{/* <hr className='border-[1px] border-neutral-700'/> */}
					<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
						<Person2Outlined />
						<input
							type="text"
							className="bg-transparent outline-none w-full placeholder:text-neutral-400"
							placeholder="Username"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-white flex items-center gap-3  p-3 bg-gray-800 rounded-full transition duration-400 outline-1 focus-within:outline focus-within:outline-gray-500">
							<KeyOutlined />
							<input
								type={isPasswordVisible ? "text" : "password"}
								className="bg-transparent outline-none w-full placeholder:text-neutral-400"
								placeholder="Password"
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
							<p className="text-gray-400 cursor-pointer hover:underline -translate-x-3">Forgot password</p>
						</div>
					</div>
					<Button
						sx={{
							color: "white",
							backgroundColor: "rgb(30 , 58 , 138)",
							borderRadius: "9999px",
							textTransform: "lowercase",
							p: "12px",
							"&:hover": { backgroundColor: "rgb(40 , 58 , 138)" },
							"&:focus": { backgroundColor: "rgb(40 , 58 , 138" },
						}}>
						Sign in
					</Button>
					<button className=" flex items-center justify-center gap-2 border border-neutral-600 p-3 rounded-full hover:bg-neutral-950/20">
						<img src={gmailImage} className="w-6" />
						<p className="text-white">Continue with google</p>
					</button>
					<div className="text-center">
						<p className="text-white">
							Don't have an account?{" "}
							<Link to="/register"className="text-blue-500 cursor-pointer hover:underline">
								Register 
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
