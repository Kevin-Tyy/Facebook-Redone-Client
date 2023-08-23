const Policy = () => {
	const items = [
		"Terms of service",
		"Privacy Policy",
		"Cookie Policy",
		"Accessibility",
		"Mangage Ads",
		"Contact",
		"More",
	];
	return (
		<div className="space-y-3">
			<div className="flex flex-wrap gap-x-4 gap-y-1">
				{items.map((item, index) => (
					<p
						key={index}
						className="text-gray-500 hover:underline decoration-dotted cursor-pointer text-sm">
						{item}
					</p>
				))}
			</div>
				<p className="text-gray-500 text-sm">
          &copy; 2022 Facebook, inc
        </p>
		</div>
	);
};

export default Policy;
