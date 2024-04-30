const Console = () => {
    return (
        <div className="w-[calc(100vw-600px)] h-full">
            <div className="flex justify-between px-2 py-1 items-center">
                <h3 className="text-red-500 text-md font-semibold">Runtime Error</h3>
                <h3 className="text-sm">Passed test cases: 2/4</h3>
            </div>
            <div className="w-full p-3 h-auto bg-red-100 rounded-md error-box">
                <p className="text-red-500 text-sm">
                    File &quot;/box/script.py&quot;, line 24
                    def parseInput(s):
                    IndentationError: expected an indented block after function definition on line 21
                </p>
            </div>
            <div className="last-exec-input flex flex-col">


            </div>

        </div>
    );
}

export default Console;