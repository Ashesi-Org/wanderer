import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { FileCode, ChevronRight } from "lucide-react";
import Console from "./console";

const OutputSection = () => {
    return (
        <div className="h-full overflow-y-scroll custom-scrollbar">
            <Tabs defaultValue="result" className="w-[270px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="result">
                        <div className="flex items-center gap-1">
                            <ChevronRight size={16} />
                            <span>Console</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="cases">
                        <div className="flex items-center gap-1">
                            <FileCode size={16} />
                            <span>Test cases</span>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="result">
                    <div className="w-full h-full px-2 py-2">
                        <Console />
                    </div>
                    <div className="h-[50px]" />
                </TabsContent>
                <TabsContent value="cases">
                    <div>Test cases here</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default OutputSection;