import InputOutput from "./input-output-cases";

const OutputStatus = () => {
    return (
        <>
            <div className="w-full h-full mb-3">
                <div className="flex justify-between py-1 items-center mb-3">
                    <div className="flex items-center gap-4">
                        <h3 className="text-red-500 text-xl font-semibold">Runtime Error</h3>
                        {/* <h3 className="text-green-500 text-xl font-semibold">Accepted</h3>
                        <p className="text-sm">Runtime: 34ms</p> */}
                    </div>

                    <h3 className="text-sm">Passed test cases: 2/4</h3>
                </div>
                <div className="w-full px-3 py-6 h-auto bg-red-100 rounded-md error-box">
                    <p className="text-red-500 text-sm">
                        File &quot;/box/script.py&quot;, line 24
                        def parseInput(s):
                        IndentationError: expected an indented block after function definition on line 21
                    </p>
                </div>
                <div className="last-exec-input flex flex-col"></div>
            </div>

            <InputOutput />
        </>
    );
}

export default OutputStatus;