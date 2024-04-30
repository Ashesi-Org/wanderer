import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

const EnvironmentSettings = () => {
    return (
        <>

            <div className="flex flex-col gap-y-4 px-2">
                <Label htmlFor="llm">Interview Persona</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your persona" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        <SelectGroup>
                            <SelectItem value="gpt">Justin (Male)</SelectItem>
                            <SelectItem value="mistral">Lisa (Female)</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-y-4 px-2">
                <Label htmlFor="llm">Editor theme</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your persona" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        <SelectGroup>
                            <SelectItem value="gpt">Light</SelectItem>
                            <SelectItem value="mistral">Vscode dark</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-y-4 px-2">
                <Label htmlFor="llm">Change programming language</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Python" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        <SelectGroup>
                            <SelectItem value="gpt">Python</SelectItem>
                            <SelectItem value="mistral">JavaScript</SelectItem>
                            <SelectItem value="llama">Java</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-y-4 px-2">
                <Label htmlFor="llm">Font size</Label>
                <Input type="number" value="14" />
            </div>
        </>
    );
}

export default EnvironmentSettings;