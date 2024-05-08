import { Badge } from "../ui/badge";

const ProblemDescription = () => {
    return (
        <div className="flex flex-col">
            <strong className=" text-xl tracking-normal">Find All Duplicates in an Array</strong>
            <div className="my-2">
                <Badge>Easy</Badge>
            </div>
            {/* Problem Statement(paragraphs) */}
            <div className='text-sm'>
                <p className='mt-3 text-sm leading-relaxed'>
                    Given an array of integers <code className="bg-secondary p-1 text-xs rounded-sm w-fit h-auto">nums</code> and an integer <code className="bg-secondary p-1 text-xs rounded-sm w-fit h-auto"> target</code>, return
                    indices of the two numbers such that they add up to target.
                </p>
                <p className='mt-3'>
                    You may assume that each input would have <strong>exactly one solution</strong>, and you
                    may not use the same element twice.
                </p>
                <p className='mt-3'>You can return the answer in any order.</p>
            </div>


            <div className="examples flex flex-col gap-y-2 my-4">

                <div className='mt-4'>
                    {/* Example 1 */}
                    <div>
                        <p className='font-semibold text-sm'>Example 1: </p>
                        <div className='example-card bg-secondary rounded-sm'>
                            <pre>
                                <strong className='text-sm'>Input: </strong> <span className="text-sm">nums = [2,7,11,15], target = 9{" "}</span>
                                <br />
                                <strong className='text-sm'>Output:</strong> <span className="text-sm">[0,1] </span><br />
                                <strong className='text-sm'>Explanation:</strong>
                                <span className="text-sm"> Because nums[0] + nums[1] == 9, we return [0, 1].</span>
                            </pre>
                        </div>
                    </div>

                    {/* Example 2 */}
                    <div>
                        <p className='font-semibold text-sm'>Example 2: </p>
                        <div className='example-card bg-secondary rounded-sm'>
                            <pre>
                                <strong className='text-sm'>Input: </strong>
                                <span className="text-sm">nums = [3,2,4], target = 6{" "}</span>
                                <br />
                                <strong className='text-sm'>Output:</strong>
                                <span className="text-sm"> [1,2]</span>
                                <br />
                                <strong className='text-sm'>Explanation:</strong>
                                <span className="text-sm"> Because nums[1] + nums[2] == 6, we return [1, 2].</span>
                            </pre>
                        </div>
                    </div>

                </div>


                {/* Constraints */}
                <div className='my-3'>
                    <div className=' text-sm font-semibold'>Constraints:</div>
                    <ul className=' ml-5 list-disc'>
                        <li className='mt-2 text-sm'>
                            <code>2 ≤ nums.length ≤ 10</code>
                        </li>

                        <li className='mt-2 text-sm'>
                            <code>-10 ≤ nums[i] ≤ 10</code>
                        </li>
                        <li className='mt-2 text-sm'>
                            <code>-10 ≤ target ≤ 10</code>
                        </li>
                        <li className='mt-2 text-sm'>
                            <strong>Only one valid answer exists.</strong>
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    );
}

export default ProblemDescription;