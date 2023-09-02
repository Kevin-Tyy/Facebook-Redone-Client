import { useStyles } from "../../hooks/mui";
import { Button, CircularProgress } from "@mui/material";

interface Props {
	activeStep: number;
	handleBack: (value: any) => void;
	handleNext: (value: any) => void;
	isLoading: boolean;
	steps: Array<string>;
}

const RegButton = ({isLoading,activeStep,handleBack,handleNext,steps}: Props) => {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.buttonContainer}>
				{activeStep !== 0 && (
					<Button
						disabled={isLoading}
						className={classes.myButton}
						onClick={handleBack}
						sx={{
							color: "white",
							backgroundColor: "rgb(180, 44, 250)",
							borderRadius: "9px",
							textTransform: "capitalize",
							p: "12px",
							"&:hover": { backgroundColor: "rgb(211, 44, 220)" },
							"&:focus": { backgroundColor: "rgb(211, 44, 211)" },
						}}>
						Back
					</Button>
				)}
				{activeStep !== steps.length - 1 && (
					<Button
						className={classes.myButton}
						variant="contained"
						color="primary"
						onClick={handleNext}
						sx={{
							color: "white",
							backgroundColor: "#0C88EF",
							borderRadius: "9px",
							textTransform: "capitalize",
							p: "12px",
							"&:hover": { backgroundColor: "#3293e3" },
							"&:focus": { backgroundColor: "rgb(40 , 58 , 138" },
						}}>
						Next
					</Button>
				)}
				{activeStep === steps.length - 1 && (
					<Button
						disabled={isLoading}
						className={classes.myButton}
						type="submit"
						sx={{
							color: "white",
							backgroundColor: "#0C88EF",
							borderRadius: "9px",
							textTransform: "capitalize",
							p: "12px",
							"&:hover": { backgroundColor: "#3293e3" },
							"&:focus": { backgroundColor: "rgb(40 , 58 , 138" },
						}}>
						{isLoading ? (
							<CircularProgress size={20} sx={{ color : '#fff'}} />
						) : (
							"Submit"
						)}
					</Button>
				)}
			</div>
		</div>
	);
};

export default RegButton;
