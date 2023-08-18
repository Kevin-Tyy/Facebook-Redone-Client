import React from "react";
import { CircularProgress } from "@mui/material";
// import "./Loading.css";

const Loading: React.FC = () => {
	return (
		<div className="h-screen w-full bg-gray-950 flex items-center justify-center">
			<CircularProgress color="secondary" size={30}/>
		</div>
	);
};

export default Loading;
