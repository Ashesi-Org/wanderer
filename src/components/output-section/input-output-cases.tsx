import { TestCase } from "@/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const InputOutput = ({input, output}: TestCase) => {

    return (
        <>
            <div className="">
                <div className="flex flex-col">
                    <Label className="">Input</Label>
                    <Input readOnly type="text" className="w-full my-2" value={input} />
                </div>
            </div>
            <div>
                <div className="flex flex-col">
                    <Label className="">Output</Label>
                    <Input readOnly type="text" className="w-full my-2" value={output} />
                </div>
            </div>
            <div className="h-[50px]" />
        </>
    );
}

export default InputOutput;