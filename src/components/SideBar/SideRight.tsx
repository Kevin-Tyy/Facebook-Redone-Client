import { LuSettings2 } from "react-icons/lu";
import { trendDummyData } from "../../utils/utilObjects";
const SideRight = () => {
	return (
		<div className="bg-primary-200 p-7 h-fit hidden xl:flex rounded-lg w-full 2xl:min-w-[400px] max-w-[400px] flex-col gap-4 sticky top-[100px]">
			<div className="flex justify-between text-white ">
				<h1 className="text-xl">Trends for you</h1>
				<LuSettings2 size={20} />
			</div>
			<div className="flex flex-col space-y-5">
				{trendDummyData.map((item, index) => (
					<div
						key={index}
						className="flex justify-between gap-12 items-end border-b-2 border-gray-700/70 p-2 font-">
						<div className="space-y-1">
							<h1 className="text-white">{item.title}</h1>
							<p className="text-gray-500 font-semibold text-[13px]">{item.subtitle}</p>
						</div>
						<p className="text-gray-500 font-semibold text-[13px]">{item.statistics}</p>
					</div>
				))}
			</div>
			<p className="text-blue-base hover:underline font-semibold my-4">
				Show more
			</p>
		</div>
	);
};

export default SideRight;
