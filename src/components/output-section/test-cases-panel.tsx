import InputOutput from "./input-output-cases";

const TestCases = () => {
    return (
        <>
            <div className='w-[350px] h-full flex items-center gap-4 py-2  cursor-pointer '>
                <div className="text-sm bg-[#eee] rounded-md flex justify-center w-[70px] p-2">
                    Case 1
                </div>
                <div className="text-sm bg-[#eee] rounded-md flex justify-center w-[70px] p-2">
                    Case 2
                </div>
                <div className="text-sm bg-[#eee] flex rounded-md justify-center w-[70px] p-2">
                    Case 3
                </div>
            </div>
            <InputOutput />
        </>
    );
}

export default TestCases;