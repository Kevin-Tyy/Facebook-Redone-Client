import {ReactNode} from "react";
import { Button } from "@mui/material";

interface Props {
    children : ReactNode
    color : string
}
const ButtonComp = ({children , color }: Props) => {
	return (
		<Button
			sx={{
				color: "white",
				backgroundColor: `${color}`,
				"&:hover": { backgroundColor: "#0C88EF" },
				textTransform: "capitalize",
				px: 2,
				py: 1,
				display: "flex",
				gap: "5px",
			}}
			className="flex items-center justify-center">
                {children}
		</Button>
	);
};

export default ButtonComp;