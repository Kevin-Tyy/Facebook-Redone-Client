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
				"&:hover": { backgroundColor: `${color}` },
				textTransform: "capitalize",
				px: 2,
				py: 1,
				borderRadius : '5px',
				display: "flex",
				whiteSpace: "nowrap",
				gap: "5px",
				width : "100%",
			}}
			className="flex items-center justify-center">
                {children}
		</Button>
	);
};

export default ButtonComp;
