import Skeleton from "react-loading-skeleton";

const PostLoader = () => {
	const loaderCount = 5;
	const loaderArray = Array(loaderCount).fill(null);
	return (
		<div className="flex flex-col  gap-2">
			{loaderArray.map((_, index) => (
				<div
					className="bg-[#1a1b2b] p-4 rounded-lg flex flex-col gap-4"
					key={index}>
					<div className="flex gap-2">
						<Skeleton width={50} height={50} circle />

						<div className="flex flex-col gap-1 w-full">
							<Skeleton height={20} />
							<Skeleton height={20} width={250} />
						</div>
					</div>

					<div className="flex flex-col">
						<Skeleton />
						<Skeleton width={250} />
					</div>
					<Skeleton height={300} />
					<div className="flex gap-4">
						<div className="w-full"><Skeleton height={50}/></div>
						<div className="w-full"><Skeleton height={50}/></div>
						<div className="w-full"><Skeleton height={50}/></div>
					
					</div>
				</div>
			))}
		</div>
	);
};

export default PostLoader;
