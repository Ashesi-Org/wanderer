"use client";
import ChatInput from "@/components/chat-input";
import CodeEditor from "@/components/editor/code-editor";
import OutputSection from "@/components/output-section";
import ProblemDescription from "@/components/problems-list/problem-description";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

const Playground = () => {
    return (
        <div className="h-screen">
            <ResizablePanelGroup

                direction="horizontal"
                className="max-w-screen border "
            >
                <ResizablePanel defaultSize={40}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={50}>
                            <div className="flex flex-col h-full overflow-y-auto p-4 custom-scrollbar">
                                <ProblemDescription />
                                <div className="h-[20px]" />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel className="" defaultSize={50}>
                            <div className="flex flex-col w-full h-full items-center">
                                <ChatInput />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel className="p-[0.5rem]" defaultSize={85}>
                            <div className="flex h-full items-center justify-center rounded-xl">
                                <CodeEditor />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel className="p-2" defaultSize={15}>
                            <div className="w-full h-full items-center">
                                <OutputSection />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle />

            </ResizablePanelGroup>
        </div>
    )
}

export default Playground;