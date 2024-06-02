import { useState, useEffect } from 'react';
import InputOutput from "./input-output-cases";
import { TestCase, TestCasesProps } from '@/types';

const TestCases = ({ testCases }: TestCasesProps) => {
    const [selectedCase, setSelectedCase] = useState<TestCase | null>(null);

    useEffect(() => {
        if (testCases && testCases.length > 0) {
            setSelectedCase(testCases[0]);
        }
    }, [testCases]);

    return (
        <>
            <div className='w-[350px] h-full flex flex-wrap gap-4 py-2 cursor-pointer'>
                {testCases?.map((testCase: TestCase, index) => (
                    <div
                        key={index}
                        className={`text-sm rounded-md flex justify-center w-[70px] p-2 ${selectedCase === testCase ? 'bg-blue-300 text-white' : 'bg-[#eee]'}`}
                        onClick={() => setSelectedCase(testCase)}
                    >
                        Case {index + 1}
                    </div>
                ))}
            </div>
            {selectedCase && <InputOutput input={selectedCase.input} output={selectedCase.output} />}
        </>
    );
}

export default TestCases;
