import Skeleton from 'react-loading-skeleton'
const People = () => {
	const peoplecount = 5;
	const peopleArray = Array(peoplecount).fill(null);
	return (
		<div className='flex flex-col gap-2'>
			{peopleArray.map((person) => (
				<div className="flex gap-2">
                    <Skeleton circle width={40} height={40}/>
                    <div className='w-full'>
                        <Skeleton/>
                        <Skeleton width={150}/>
                    </div>   
                </div>
			))}
		</div>
	);
};

export default People;
