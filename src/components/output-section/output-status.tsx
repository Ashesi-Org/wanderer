import { Input } from '../ui/input';
import { Label } from '../ui/label';
import useCompilerStore from '@/store/editor-store';

const OutputStatus = () => {
    const { outputDetails } = useCompilerStore();
    const status = outputDetails?.status;

    const passedTestCases = () => {
        if (outputDetails) {
            return outputDetails.output_data.results.filter((result) => result.status.id === 3).length;
        }
        return 0;
    };

    const totalTestCases = () => {
        if (outputDetails) {
            return outputDetails.output_data.results.length;
        }
        return 0;
    };

    return (
        <>
            {
                outputDetails ? (
                    <>
                        <div className="w-full h-full mb-3">
                            <div className="flex justify-between py-1 items-center mb-3">
                                <div className="flex items-center gap-4">
                                    {outputDetails?.status === 'Success' ? (
                                        <h3 className="text-green-500 text-xl font-semibold">{status}</h3>
                                    ) : (
                                        <h3 className="text-red-500 text-xl font-semibold">Runtime Error</h3>
                                    )}
                                    <p className="text-sm">Runtime: {outputDetails.output_data.averageRuntime} ms</p>
                                </div>
                                <h3 className="text-sm">Passed test cases: {passedTestCases()} / {totalTestCases()}</h3>
                            </div>
                          
                        </div>

                        <div className="text-sm">
                            {outputDetails.output_data.results.map((result, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex items-center mb-2">
                                        <h4 className="text-lg font-semibold">Test {index + 1}</h4>
                                        <span className={`ml-2 px-2 py-1 rounded ${result.status.description === 'Accepted' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                            {result.status.description}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <Label className="">Input</Label>
                                        <Input readOnly type="text" className="w-full my-2" value={result.input} />
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <Label className="">Expected Output</Label>
                                        <Input readOnly type="text" className="w-full my-2" value={result.expectedOutput} />
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <Label className="">Output</Label>
                                        <Input readOnly type="text" className="w-full my-2" value={result.output} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-[50px]" />
                    </>
                ) : (
                    <div className='flex justify-center items-center h-full mt-20'>
                        <div className='text-center'>
                            <p className='text-gray-400'>You must run your code first</p>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default OutputStatus;
