// import bgImage from "../../assets/bg-cover.jpg";
import { useState, FC , useEffect } from "react";
import RegButtons from "../../components/Buttons/RegButtons";
import { Stepper, Step, StepLabel } from "@mui/material";
import gmailImage from "../../assets/gmail.png";
import StepOne from "../../components/Registration/StepOne";
import StepTwo from "../../components/Registration/StepTwo";
import { Link } from "react-router-dom";
import { FormData } from "../../types/Types";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/AuthSlice";
import { decodeToken } from "../../utils/decodeToken";

const RegisterForm: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const [activeStep, setActiveStep] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [profileImage , setProfileImage ] = useState<string>("")

	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		phoneNumber: "",
		password: "",
	});
	useEffect(()=> {
		document.title= "Facebook | Register"
	}, [])
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleInputChange = (event: any) => {
		const { name, value} = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};


	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			console.log(formData)
			setIsLoading(true);
			const { data } = await axios.post(`${BaseURL}/user/register`, {
				...formData,
				profileimage : profileImage
			});
			console.log(data);
			setIsLoading(false);
			if (!data?.success) {
				toast.error(data?.msg);
				return;
			} else {
				toast.success(data?.msg);
				const userInfo = decodeToken(data?.token);
				dispatch(login(userInfo))
				setTimeout(()=> {
					navigate("/home");
					
				}, 1500)
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong, Try again later")
		}
	};

	const steps = ["Personal Information", "Account Information"];

	const renderStepContent = (step: any) => {
		switch (step) {
			case 0:
				return (
					<StepOne formData={formData} handleInputChange={handleInputChange}  />
				);
			case 1:
				return (
					<StepTwo formData={formData} handleInputChange={handleInputChange} setProfileImage={setProfileImage}/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="relative">
			<div className="fixed bottom-0 z-[-1] h-screen w-full bg-gradient-to-br from-gray-800 bg-gray-950 flex justify-center items-center">
				<form
					onSubmit={handleSubmit}
					className="w-[350px] md:w-[430px] flex flex-col gap-7">
					
					<h1 className="text-white text-center text-4xl mb-4">Sign up</h1>
					<hr />
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((label , index) => (
							<Step key={label}>
								<StepLabel>
									<p className={`${index == activeStep ? 'text-white' : 'text-gray-600'}`}>{label}</p>
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
					<div className="flex flex-col gap-4">
						<p className="text-white text-center">Or</p>
						<button className=" w-full flex items-center justify-center gap-2 border border-neutral-600 p-3 rounded-full hover:bg-gray-950/20">
							<img src={gmailImage} className="w-6" />
							<p className="text-white">Sign up with google</p>
						</button>
					</div>
					<div className="text-center">
						<p className="text-white">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-blue-500 cursor-pointer hover:underline">
								Sign in
							</Link>
						</p>
					</div>
				</form>
			</div>
			<Toaster toastOptions={{
				style : {
					padding : '10px',
					fontWeight : 500,
					textAlign : 'center',
				}
			}}/>
		</div>
	);
};

export default RegisterForm;
