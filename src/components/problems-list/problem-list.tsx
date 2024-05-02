import ProblemCard from './problem-card';

const ProblemList = () => {
  return (
    <>
      <div className='my-2'>
        {
          Array.from({ length: 4 }, (_, index) => {
            return (
              <ProblemCard key={index} />
            )
          })
        }
      </div>
    </>
  );
};

export default ProblemList;
