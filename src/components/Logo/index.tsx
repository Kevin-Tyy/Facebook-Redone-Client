import { Link } from "react-router-dom";
import { FacebookRounded } from "@mui/icons-material";
interface Props {}

const Logo = ({}: Props) => {
	return (
		<Link to={"/"}>
      <FacebookRounded sx={{ fontSize : 40}} color={"primary"}/>
		</Link>
	);
};

export default Logo;
