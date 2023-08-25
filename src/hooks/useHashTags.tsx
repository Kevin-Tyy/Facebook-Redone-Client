const StyledHashtags = ({ text }: { text: string }) => {
	// Regular expression to match hashtags

	const hashtagRegex = /(\#\w+)/g;

	// Split the text by hashtags and non-hashtags
	const parts = text.split(hashtagRegex);
	return (
		<p className="text-white">
			{parts.map((part, index) => {
				if (part.match(hashtagRegex)) {
					return (
						<span key={index} className="text-blue-light hover:underline">
							{part}
						</span>
					);
				}
				return part;
			})}
		</p>
	);
};

export default StyledHashtags;
