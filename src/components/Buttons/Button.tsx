import { ReactNode } from "react";
import { Button } from "@mui/material";

interface Props {
	children: ReactNode;
	color: string;
}
const ButtonComp = ({ children, color }: Props) => {
	return (
		<Button
			sx={{
				color: "white",
				backgroundColor: `${color}`,
				"&:hover": { backgroundColor: `${color}9d` },
				textTransform: "capitalize",
				p: "8px",

				borderRadius: "7px",
				display: "flex",
				whiteSpace: "nowrap",
				gap: "5px",
				width: "100%",
			}}
			className="flex items-center justify-center">
			{children}
		</Button>
	);
};

export default ButtonComp;
