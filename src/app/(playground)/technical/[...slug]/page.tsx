'use client';
import React, { useContext } from 'react';
import ChatInput from '@/components/chat-input';
import CodeEditor from '@/components/editor/code-editor';
import OutputSection from '@/components/output-section';
import ProblemDescription from '@/components/problems-list/problem-description';
import VideoAudioRecorder from '@/components/video-frame/video-frame';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TooltipWrapper } from "@/components/utils/tooltip-wrapper";
import { api } from "@/lib/api";
import { TestCase } from "@/types";
import { Minus, RotateCcw } from "lucide-react";
import { useQuery } from "react-query";
import { useActiveChallengeStore } from "@/store/active-challenge-store";
import { useRouter } from "next/navigation";
import { UserContext } from '@/contexts/userContext';


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
    loading: boolean;
}


const Playground = ({ params }: { params: { slug: string } }) => {

    const router = useRouter();
    const { activeChallengeId } = useActiveChallengeStore();
    const { user: authUser } = useContext(UserContext);
    
    const challengeId = activeChallengeId ? activeChallengeId : params.slug?.[0];
    const sessionId = params.slug?.[2];

    if (!challengeId) {
        router.push('/challenges')
        return <></>
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: problem, isLoading } = useQuery('activeProblem', async () => {
        const response = await api.get(`/api/challenge/${challengeId}`)

        return response.data as ProblemDescriptionProps;
    })

    return (
        <>
            <VideoAudioRecorder sessionId={sessionId} userId={authUser?.id} />
            <div className="h-screen sessionpage">
                <ResizablePanelGroup direction="horizontal" className="w-full border ">
                    <ResizablePanel className="" defaultSize={40}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={50}>
                                <div className="flex flex-col h-full overflow-y-auto p-4 custom-scrollbar">
                                    <ProblemDescription loading={isLoading} {...problem} />
                                    <div className="h-[20px]" />
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel className="shadow-sm" defaultSize={50}>
                                <div className="flex items-center justify-between border-b p-3">
                                    <span className="text-sm font-semibold">Assistant</span>
                                    <div className="flex items-center gap-2">
                                        <span className="cursor-pointer">
                                            <TooltipWrapper
                                                text={'Clear chat'}
                                                component={<RotateCcw size={16} />}
                                            />
                                        </span>
                                        <span className="cursor-pointer">
                                            <TooltipWrapper
                                                text={'Collapse'}
                                                component={<Minus size={16} />}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full items-center chat">
                                    <ChatInput interviewQuestion={problem?.content ?? ''} />
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={60}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel className="p-[0.5rem]" defaultSize={85}>
                                <div className="flex flex-col h-full items-center justify-center rounded-xl">
                                    <CodeEditor
                                        question={problem?.content!}
                                        language="python"
                                        driverCode={problem?.driverCode || ''}
                                        problemId={problem?.challenge_id!}
                                    />
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel className="p-2" defaultSize={15}>
                                <div className="w-full h-full items-center">
                                    <OutputSection
                                        testCases={problem?.sampleTestCase as TestCase[]}
                                    />
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                    <ResizableHandle />
                </ResizablePanelGroup>
            </div>
        </>
    );
};

export default Playground;
