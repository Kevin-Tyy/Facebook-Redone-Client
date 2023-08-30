import React from "react";
import { CircularProgress } from "@mui/material";
// import "./Loading.css";

const Loading: React.FC = () => {
	return (
		<div className="h-screen w-full bg-background-primary flex items-center justify-center pb-[5vh]">
			<CircularProgress color="primary" size={40}/>
		</div>
	);
};

export default Loading;
