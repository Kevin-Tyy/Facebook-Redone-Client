import React from "react";
import { CircularProgress } from "@mui/material";
// import "./Loading.css";

const Loading: React.FC = () => {
	return (
		<div className="loading-container">
			<CircularProgress color="inherit" />
		</div>
	);
};

export default Loading;
