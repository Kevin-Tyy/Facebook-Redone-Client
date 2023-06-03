import { useStyles } from '../../hooks/mui';
import { Button } from '@mui/material'

interface Props {
	activeStep : number;
	handleBack : (value : any) => void;
	handleNext : (value : any) => void;
	steps : Array<string>
}

const RegButton = ({activeStep , handleBack , handleNext , steps}: Props) => {
	const classes = useStyles()
  return (
    <div>
        		<div className={classes.buttonContainer}>
						{activeStep !== 0 && (
						<Button
							className={classes.myButton}
							variant="contained"
							color="secondary"
							onClick={handleBack}
							style={{
								borderRadius: "999px",
								padding: "12px",
								textTransform: "capitalize",
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
								style={{
									marginLeft: 8,
									borderRadius: "999px",
									textTransform: "capitalize",
									padding: "12px",
								}}>
								Next
							</Button>
						)}
						{activeStep === steps.length - 1 && (
							<Button
								className={classes.myButton}
								variant="contained"
								color="primary"
								type="submit"
								style={{
									marginLeft: 8,
									borderRadius: "999px",
									padding: "12px",
									textTransform: "capitalize",
								}}>
								Submit
							</Button>
						)}
					</div>

    </div>
  )
}

export default RegButton