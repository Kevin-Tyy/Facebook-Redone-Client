import bgImage from "../../assets/bg-cover.jpg";
import { useState, FC } from "react";
import RegButtons from '../../components/Buttons/RegButtons'
import { Stepper, Step, StepLabel } from "@mui/material";
import gmailImage from "../../assets/gmail.png";
import StepOne from "../../components/Registration/StepOne";
import StepTwo from "../../components/Registration/StepTwo";
import { Link } from "react-router-dom";

const RegisterForm: FC = () => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		phoneNumber: "",
		password: "",
		passwordConf: "",
	});

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(formData); // You can submit the form data to the server here
	};

	const steps = ["Step 1: Personal Information", "Step 2: Account Information"];

	const renderStepContent = (step: any) => {
		switch (step) {
			case 0:
				return (
					<StepOne formData={formData} handleInputChange={handleInputChange}/>
				);
			case 1:
				return (
					<StepTwo formData={formData} handleInputChange={handleInputChange}/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="relative">
			{/* <img
				src={bgImage}
				alt=""
				className="hidden md:block fixed h-screen w-full object-cover top-0 right-0 bottom-0 left-0 z-[-3]"
			/> */}
			{/* <div className="fixed top-0 right-0 left-0 bottom-0 h-screen w-full bg-gradient-to-b from-black/10 via-black/70 to-black z-[-2]"></div> */}
			<div className="fixed bottom-0 z-[-1] h-screen w-full bg-gray-900 flex justify-center items-center">
				<form onSubmit={handleSubmit} className="w-[350px] md:w-[430px] flex flex-col gap-7">
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel >{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					{renderStepContent(activeStep)}

					<RegButtons activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} steps={steps}/>
					<div className="flex flex-col gap-4">
						<p className="text-white text-center">Or</p>
						<button className=" w-full flex items-center justify-center gap-2 border border-neutral-600 p-3 rounded-full hover:bg-gray-950/20">
							<img src={gmailImage} className="w-6" />
							<p className="text-white">Continue with google</p>
						</button>
					</div>
					<div className="text-center">
						<p className="text-white">
							Already have an account?{" "}
							<Link to="/login" className="text-blue-500 cursor-pointer hover:underline">
								Sign in
							</Link >
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
