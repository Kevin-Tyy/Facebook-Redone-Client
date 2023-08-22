import Skeleton from "react-loading-skeleton";

const PostLoader = () => {
	const loaderCount = 5;
	const loaderArray = Array(loaderCount).fill(null);
	return (
		<div className="flex flex-col gap-4">
			{loaderArray.map((_, index) => (
				<div
					className="bg-[#1a1b2b9d] p-4 rounded-3xl flex flex-col gap-4"
					key={index}>
					<div className="flex gap-2">
						<Skeleton width={50} height={50} circle />

						<div className="flex flex-col gap-1 w-full">
							<Skeleton height={15} borderRadius={10}/>
							<Skeleton height={15} width={250} borderRadius={10}/>
						</div>
					</div>

					<div className="flex flex-col">
						<Skeleton borderRadius={10}/>
						<Skeleton width={250} borderRadius={10}/>
					</div>
					<Skeleton height={300} borderRadius={20}/>
					<div className="flex gap-4">
						<div className="w-full"><Skeleton height={50} borderRadius={15}/></div>
						<div className="w-full"><Skeleton height={50} borderRadius={15}/></div>
						<div className="w-full"><Skeleton height={50} borderRadius={15}/></div>
					
					</div>
				</div>
			))}
		</div>
	);
};

export default PostLoader;
