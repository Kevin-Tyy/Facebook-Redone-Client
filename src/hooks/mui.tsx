import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
	formContainer: {
		maxWidth: 400,
		margin: "0 auto",
		// padding: theme.spacing(2),
	},
	buttonContainer: {
		display: "flex",
		justifyContent: "flex-end",
		gap: "10px",
		// marginTop: theme.,
	},
	myButton: {
		width: "100%",
	},
}));