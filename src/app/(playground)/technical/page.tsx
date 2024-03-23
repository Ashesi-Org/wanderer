'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Suspense } from 'react';
import { Oval } from 'react-loader-spinner';
import Editor from '@monaco-editor/react';

export default function Playground() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center">
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#58abee"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            }
        >
            <ResizablePanelGroup direction="horizontal" className="w-full border">
                <ResizablePanel defaultSize={35}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <span className="font-semibold">One</span>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={65}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={55}>
                            <div className="flex h-full items-center justify-center p-6">
                                <div className=" w-full">
                                    <Editor
                                        height="40vh"
                                        defaultLanguage="javascript"
                                        defaultValue="frkfrmfrgmrkfrmgrkgmgf"
                                        value='frgrrgrrthrhrhthththththttgjtj'
                                    />
                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={45}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </Suspense>
    );
}
