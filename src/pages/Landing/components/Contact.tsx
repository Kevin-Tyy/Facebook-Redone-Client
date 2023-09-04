import { BsBug, BsSend, BsTwitter } from "react-icons/bs";
const Contact = () => {
	return (
		<div className="flex justify-center w-full text-light bg-primary-100 py-10 lg:py-32 gap-10 lg:gap-20 px-4 xl:px-0 ">
			<div className="max-w-screen-lg flex flex-col md:flex-row gap-10 ">
				<div className="w-full">
					<p className="text-light mb-5">
						Do you want to learn or teach any languages or technologies that we
						haven’t covered? Let us know!
					</p>
					<form className="flex flex-col">
						<input
							type="email"
							required={true}
							placeholder="Email address"
							className="w-full h-10 mb-2 border text-white border-neutral-400 bg-gray-500 p-2 text-sm outline-none"
						/>
						<textarea
							required={true}
							placeholder="Your feedback"
							className="w-full h-24 border resize-none text-white border-neutral-400 bg-gray-500 p-3 outline-none mb-3"
						/>
						<p>
							By submitting this form, I agree that JetBrains s.r.o.
							("JetBrains") may use my name, email address, phone number, and
							country of residence to provide support. I agree that JetBrains
							may process said data using{" "}
							<span className="underline cursor-pointer hover:text-blue-500">
								third-party services
							</span>{" "}
							for this purpose in accordance with the{" "}
							<span className="underline cursor-pointer hover:text-blue-500">
								JetBrains Privacy Policy.
							</span>
						</p>
						<button
							type="submit"
							className="!bg-blue-base text-sm hover:bg-neutral-800 mt-7 text-white py-4 rounded-full">
							Submit
						</button>
					</form>
				</div>
				<div className="w-full sm:w-[500px] text-gray-300">
					<p className="text-black font-bold mb-5">Follow us</p>
					<div className="flex flex-col">
						<div className="flex flex-row gap-3 mb-5">
							<BsSend />
							<p className="border-b border-neutral-300 hover:border-gray-400 hover:text-gray-400 cursor-pointer">
								The Facebook inc blog
							</p>
						</div>
						<div className="flex flex-row gap-3 mb-5">
							<BsTwitter />
							<p className="border-b border-neutral-300 hover:border-neutragray-400 hover:text-gray-00 cursor-pointer">
								@facebook_inc on Twitter
							</p>
						</div>
						<div className="flex flex-row gap-3">
							<BsBug />
							<p className="border-b border-neutral-300 hover:border-neutragray-400 hover:text-gray-400  cursor-pointer">
								Our bug and issue tracker
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
