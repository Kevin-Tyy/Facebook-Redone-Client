import Skeleton from "react-loading-skeleton";

const GroupLoader = () => {
	const loadercount = 5;
	const loaderArray = Array(loadercount).fill(null);

	return (
		<div className="flex flex-col gap-6">
			{loaderArray.map((_, index) => (
				<div
					className="bg-[#1a1b2b9d] p-4 flex flex-col gap-4 rounded-lg"
					key={index}>
					<div className="flex w-full gap-4">
						<Skeleton borderRadius={10} width={100} height={100} />
						<div className="w-full flex flex-col gap-2">
							<Skeleton width={200} />
							<Skeleton width={140} />

							<div className="self-end w-full max-w-[120px]">
								<Skeleton borderRadius={50} height={40} />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default GroupLoader;
