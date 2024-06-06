"use client";
import ChatInput from "@/components/chat-input";
import CodeEditor from "@/components/editor/code-editor";
import OutputSection from "@/components/output-section";
import ProblemDescription from "@/components/problems-list/problem-description";
import VideoAudioRecorder from "../../../components/video-frame/video-frame";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TooltipWrapper } from "@/components/utils/tooltip-wrapper";
import { api } from "@/lib/api";
import { TestCase } from "@/types";
import axios from "axios";
import { Minus, RotateCcw, X } from "lucide-react";
import { useQuery } from "react-query";


interface ProblemDescriptionProps {
    challenge_id?: number;
    title?: string;
    description?: string;
    difficulty?: string;
    constraints: string;
    assumptions?: string[];
    content?: string;
    topicTags?: string[];
    similarQuestions?: string[];
    sampleTestCase: any;
    allTestCases?: string[];
    driverCode?: string;
    hints?: string[];
    created_at?: string;
    updated_at?: string;
}


interface PlaygroundProps {
    problem: ProblemDescriptionProps;
    isLoading: boolean;
    error: any;
}

const Playground = () => {
    
    // TODO: activeproblem store
    // use usequery to query for a problem challenge from the frontend
    const  { data:problem } = useQuery('activeProblem', async () => {
        const response = await api.get(`/api/challenge/${1}`)

        return response.data as ProblemDescriptionProps;
    })


    return (
        <>
        <VideoAudioRecorder />
        <div className="h-screen">
            <ResizablePanelGroup

                direction="horizontal"
                className="max-w-screen border "
            >
                <ResizablePanel defaultSize={40}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={50}>
                            <div className="flex flex-col h-full overflow-y-auto p-4 custom-scrollbar">
                                <ProblemDescription {...problem} />
                                <div className="h-[20px]" />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel className="shadow-sm" defaultSize={50}>
                            <div className="flex items-center justify-between border-b p-3">
                                <span className="text-sm font-semibold">Assistant</span>
                                <div className="flex items-center gap-2">
                                    <span className="cursor-pointer">
                                        <TooltipWrapper text={'Clear chat'} component={<RotateCcw size={16} />} />

                                    </span>
                                    <span className="cursor-pointer">
                                        <TooltipWrapper text={'Collapse'} component={<Minus size={16} />} />

                                    </span>
                                </div>
                            </div>
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

                            <div className="flex flex-col h-full items-center justify-center rounded-xl">

                                <CodeEditor language="python" driverCode={problem?.driverCode || ""} problemId={problem?.challenge_id!} />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel className="p-2" defaultSize={15}>
                            <div className="w-full h-full items-center">
                                <OutputSection testCases={problem?.sampleTestCase as TestCase[]} />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle />

            </ResizablePanelGroup>
        </div></>
    )
}

export default Playground;