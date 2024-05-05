import { Badge } from "../ui/badge";

const ProblemDescription = () => {
    return (
        <div className="flex flex-col">
            <strong className=" text-xl tracking-normal">Find All Duplicates in an Array</strong>
            <div className="my-2">
                <Badge>Easy</Badge>
            </div>
            <div className="problem-prompt my-2">
                <p className="text-sm leading-loose">
                    Given an integer array <code className="bg-secondary p-1 text-xs rounded-sm w-fit h-auto">nums</code> of length n where all the integers of nums are in the range <code className="bg-secondary p-1 text-xs rounded-sm w-fit h-auto">[1, n]</code> and each integer appears once or twice, return an array of all the integers that appears twice.
                    <br></br>
                    <br></br>
                    You must write an algorithm that runs in O(n) time and uses only constant extra space.
                </p>
            </div>

            <div className="examples flex flex-col gap-y-2 my-4">
                <div className="flex flex-col gap-y-2">
                    <strong className="text-sm">Example 1:</strong>
                    <div className="my-1 w-full">

                        <pre className="text-sm bg-secondary p-3 rounded-sm w-full h-auto" >
                            <code className="p-2 break-all overflow-auto whitespace-pre-wrap">
                                {`4\niamlordvoldemort tommarvoloriddle\nb h\nstop post\nhi hey`}
                            </code>
                        </pre>

                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <strong className="text-sm">Example 2:</strong>
                    <div className="my-1 w-full">

                        <pre className="text-sm bg-secondary p-3 rounded-sm w-full h-auto" >
                            <code className="p-2 break-all overflow-auto whitespace-pre-wrap">
                                {`4\niamlordvoldemort tommarvoloriddle\nb h\nstop post\nhi hey`}
                            </code>
                        </pre>

                    </div>
                </div>
                <div className="flex flex-col gap-y-2 mt-4">
                    <strong className="text-sm">Constraints</strong>
                    <pre>
                        <code className="bg-secondary p-1 text-sm rounded-sm leading-loose w-fit h-auto">
                            {`0 <= m, n <= 200\n1 <= m + n <= 200\n-10^9 <= nums1[i], nums2[i] <= 10^9`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default ProblemDescription;