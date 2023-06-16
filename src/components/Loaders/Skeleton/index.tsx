import ContentLoader from "react-content-loader";
const numLoaders = 10; // Number of loaders you want to generate

const loadersArray = Array(numLoaders).fill(null);
const Loader = () => {
	return (
		<div>
			{loadersArray.map((_, index) => (
				<ContentLoader
					key={index} // Provide a unique key for each loader component
					height={54}
					width={320}
					viewBox="0 0 320 54"
					backgroundColor="#333"
					foregroundColor="#ecebeb">
					{/* Define the SVG shapes for the loader */}
					<circle cx="27" cy="27" r="18" />
					<rect x="53" y="14" rx="3" ry="3" width="180" height="13" />
					<rect x="53" y="30" rx="3" ry="3" width="10" height="10" />
					<rect x="67" y="30" rx="3" ry="3" width="74" height="10" />
					<circle cx="305" cy="27" r="8" />
					<rect x="0" y="53" rx="0" ry="0" width="320" height="1" />
					<rect x="219" y="146" rx="0" ry="0" width="0" height="0" />
				</ContentLoader>
			))}
		</div>
	);
};

export default Loader;
