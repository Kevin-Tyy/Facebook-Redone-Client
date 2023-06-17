import Skeleton from "react-loading-skeleton";
const Story = () => {
	const loaderCount = 5;
	const loaderArray = Array(loaderCount).fill(null);
	return (
		<div className="flex gap-6 h-60  overflow-x-scroll overflow-y-hidden pb-5">
			{loaderArray.map((_, index) => (
				<div
					className="card-skeleton bg-[#1a1b2b] rounded-lg p-2 shadow-md w-[350px] h-[230px] flex flex-col gap-1"
					key={index}>
					<div className="flex items-center">
						<Skeleton
							circle
							width={30}
							height={30}
							className=" mr-2"
						/>
						<Skeleton width={100} height={20} />
					</div>
					<Skeleton className="h-[170px]"/>
				</div>
			))}
		</div>
	);
};

export default Story;
