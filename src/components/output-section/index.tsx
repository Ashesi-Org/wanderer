import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { FileCode, ChevronRight } from "lucide-react";
import Terminal from "./terminal";
import TestCases from "./test-cases-panel";


const OutputSection = () => {
    return (
        <div className="w-full h-full overflow-y-scroll custom-scrollbar px-3 py-auto">
            <Tabs defaultValue="cases" className="">
                <TabsList className="grid w-[270px] grid-cols-2">

                    <TabsTrigger className="" value="cases">
                        <div className="flex items-center gap-1">
                            <FileCode size={16} />
                            <span>Test cases</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="terminal">
                        <div className="flex items-center gap-1">
                            <ChevronRight size={16} />
                            <span>Terminal</span>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent className="" value="cases">
                    <TestCases />
                </TabsContent>
                <TabsContent value="terminal">
                    <div className="w-full h-full px-2 py-2">
                        <Terminal />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default OutputSection;