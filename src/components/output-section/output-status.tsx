import { Input } from '../ui/input';
import { Label } from '../ui/label';
import useCompilerStore from '@/store/editor-store';

const OutputStatus = () => {
    const { outputDetails } = useCompilerStore();
    const statusId = outputDetails?.status?.id;

    return (
        <>
            {
                outputDetails ? <>
                    <div className="w-full h-full mb-3">
                        <div className="flex justify-between py-1 items-center mb-3">
                            <div className="flex items-center gap-4">
                                {outputDetails?.status?.description === 'Accepted' ? (
                                    <h3 className="text-green-500 text-xl font-semibold">Accepted</h3>
                                ) : (
                                    <h3 className="text-red-500 text-xl font-semibold">Runtime Error</h3>
                                )}

                                <p className="text-sm">Runtime: {outputDetails?.time} ms</p>
                            </div>

                            <h3 className="text-sm">Passed test cases: 4/4</h3>
                        </div>
                        {
                            statusId === 6 &&
                            <div className="w-full px-3 py-6 h-auto bg-red-100 rounded-md error-box">
                                <p className="text-red-500 text-sm">
                                    {outputDetails?.compile_output ? atob(outputDetails.compile_output) : null}
                                </p>
                            </div>
                        }
                        <div className="last-exec-input flex flex-col"></div>
                    </div>

                    <div className="text-sm">
                        <div className="">
                            <div className="flex flex-col">
                                <Label className="">Input</Label>
                                <Input readOnly type="text" className="w-full my-2" value="[2,3,4,5]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <Label className="">Expected Output</Label>
                                <Input readOnly type="text" className="w-full my-2" value={"True"} />
                            </div>
                        </div>
                    </div>
                    <div className="h-[50px]" />
                </>
                    : <div className='flex justify-center items-center h-full mt-20'>
                        <div className='text-center'>
                            <p className='text-gray-400'>You must run your code first</p>
                        </div>
                    </div>
            }
        </>
    );
};

export default OutputStatus;
