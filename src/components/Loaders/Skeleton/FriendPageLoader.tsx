import Skeleton from "react-loading-skeleton";

const friendSkeleton = () => {
	const loadercount = 5;
	const loaderArray = Array(loadercount).fill(null);

	return (
		<div className="flex flex-col gap-6">
			{loaderArray.map((_, index) => (
				<div
					className="bg-gray-300 dark:bg-[#1a1b2b9d] p-4 flex flex-col gap-4 rounded-lg"
					key={index}>
					<div className="flex w-full gap-4">
						<Skeleton circle width={100} height={100} />
						<div className="w-full flex flex-col gap-2">
							<Skeleton width={200} />
							<Skeleton width={140} />
							<div className="flex gap-3 w-full">
								<div className="w-full">
									<Skeleton height={40} />
								</div>
								<div className="w-full">
									<Skeleton height={40} />
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default friendSkeleton;
