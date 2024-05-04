import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputOutput = () => {
    return (
        <>

            <div className="">
                <div className="flex flex-col">
                    <Label className="">Input</Label>
                    <Input type="text" className="w-full my-2" value="[2,3,4,5]" />
                </div>
            </div>
            <div>
                <div className="flex flex-col">
                    <Label className="">Output</Label>
                    <Input type="text" className="w-full my-2" value="True" />
                </div>
            </div>
            <div className="h-[50px]" />
        </>
    );
}

export default InputOutput;