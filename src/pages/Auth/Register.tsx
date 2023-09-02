import { useState, FC, useEffect } from "react";
import RegButtons from "../../components/Buttons/RegButtons";
import { Stepper, Step, StepLabel } from "@mui/material";
import StepOne from "../../components/Register/StepOne";
import StepTwo from "../../components/Register/StepTwo";
import { Link } from "react-router-dom";
import { FormData } from "../../types/types";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/AuthSlice";
import { decodeToken } from "../../utils/decodeToken";
import Logo from "../../components/Logo";

const RegisterForm: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
	});
	useEffect(() => {
		document.title = "Facebook | Register";
	}, []);
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

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			const { data } = await axios.post(`${BaseURL}/user/register`, {
				...formData,
				profileimage: profileImage,
			});
			setIsLoading(false);
			if (!data?.success) {
				toast.error(data?.msg);
				return;
			} else {
				toast.success(data?.msg);
				const userInfo = decodeToken(data?.token);
				dispatch(login(userInfo));
				setTimeout(() => {
					navigate("/home");
				}, 1500);
			}
		} catch (error) {
			toast.error("Something went wrong, Try again later");
		}
		setIsLoading(false);
	};

	const steps = ["Personal Information", "Account Information"];

	const renderStepContent = (step: any) => {
		switch (step) {
			case 0:
				return (
					<StepOne formData={formData} handleInputChange={handleInputChange} />
				);
			case 1:
				return (
					<StepTwo
						formData={formData}
						handleInputChange={handleInputChange}
						setProfileImage={setProfileImage}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="relative">
			<div className="fixed bottom-0 z-[-1] h-screen w-full dark:bg-gradient-to-br bg-slate-100  from-gray-800 to-gray-950 flex justify-center items-center">
				<form
					onSubmit={handleSubmit}
					className="w-full sm:w-[400px] flex flex-col gap-7">
					<div className="flex flex-col gap-3 items-center">
						<Logo />
						<h1 className="text-slate-500 dark:text-white text-center text-3xl font-bold">
							Create a new account
						</h1>
					</div>
					<hr className="border-1 border-slate-400 dark:border-gray-700" />
					<Stepper activeStep={activeStep} alternativeLabel >
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>
									<p
										className={`${
											index == activeStep ? "text-slate-900 dark:text-white" : "text-gray-600"
										}`}>
										{label}
									</p>
								</StepLabel>
							</Step>
						))}
					</Stepper>
					{renderStepContent(activeStep)}
					<RegButtons
						isLoading={isLoading}
						activeStep={activeStep}
						handleBack={handleBack}
						handleNext={handleNext}
						steps={steps}
					/>
					<hr className="border-t border-gray-700" />
					<div className="text-center">
						<p className="text-slate-600 dark:text-white">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-blue-500 cursor-pointer hover:underline">
								Sign in
							</Link>
						</p>
						<p className="mt-5 text-slate-700 dark:text-gray-500 text-sm">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
							placeat perferendis exercitationem illum explicabo delectus?
						</p>
					</div>
				</form>
			</div>
			<Toaster
				toastOptions={{
					style: {
						padding: "10px",
						fontWeight: 500,
						textAlign: "center",
					},
				}}
			/>
		</div>
	);
};

export default RegisterForm;
