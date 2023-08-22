import Skeleton from "react-loading-skeleton";
const Story = () => {
	const loaderCount = 5;
	const loaderArray = Array(loaderCount).fill(null);
	return (
		<div className="flex gap-4">
			{loaderArray.map((_, index) => (
				<div
					className="card-skeleton bg-[#1a1b2b9d] rounded-xl py-1 px-2.5 shadow-md w-[150px] h-[230px] flex flex-col gap-1"
					key={index}>
					<div className="flex items-center">
						<Skeleton circle width={30} height={30} className=" mr-2" />
						<div className="flex flex-col ">
							<Skeleton width={90} height={10} borderRadius={15} />
							<Skeleton width={50} height={10} borderRadius={15} />
						</div>
					</div>
					<Skeleton className="h-[170px]" borderRadius={10} />
				</div>
			))}
		</div>
	);
};

export default Story;
