'use client';
import CodeEditor from '@/components/editor/CodeEditor';
import CustomInputField from '@/components/editor/CustomInputField';
import OutputPanel from '@/components/editor/OutputPanel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { javascriptDefault } from '@/lib/constants';
import { classnames } from '@/lib/utils';
import { Suspense, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import { Judge0SubmissionOutput, languageOptionsType } from '@/types';
import LanguagePicker from '@/components/editor/LanguagePicker';


export default function Playground() {
    const [code, setCode] = useState<string>(javascriptDefault);
    const [language, setLanguage] = useState<string>('javascript');
    const [theme, setTheme] = useState<string>("cobalt");
    const [running, setRunning] = useState<boolean>(false);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState<Judge0SubmissionOutput | null>(null);
    const [activePanel, setActivePanel] = useState<'input' | 'output' | null>('output');

    const onChange = (action: string, data: string) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const handleCustomInputClick = () => {
        setActivePanel("input");
    };

    const handleOutputClick = () => {
        setActivePanel("output");
    };

    const handleCompile = () => {
        setRunning(true);
        const formData = {
            language_id: 63,
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: "https://judge0-ce.p.rapidapi.com/submissions",
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "0e58c401femsh4bc6914c8b658f0p1108a6jsn88ac8d898095",
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                // get error status
                let status = err.response?.status;
                console.log("error", error);
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);
                }
                setRunning(false);
                console.log("catch block...", error);
            });
    };

    const checkStatus = async (token: any) => {
        const options = {
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "0e58c401femsh4bc6914c8b658f0p1108a6jsn88ac8d898095",
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setRunning(false);
                setOutputDetails(response.data);
                console.log(`Compiled Successfully!`);
                console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setRunning(false);
            //   showErrorToast();
        }
    };

    const handleSelect = (lang: string) => {
        console.log("selected Option...", lang);
        setLanguage(lang);
    };

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
                            <div className="h-[35px] w-[200px] flex justify-end">
                            <LanguagePicker onSelectChange={handleSelect} />
                            </div>
                        <ResizablePanel defaultSize={55}>
                            <div className="flex h-full items-center justify-center pt-20">
                                <div className=" w-full">

                                    <CodeEditor onChange={onChange} language={language} code={code} theme={theme} />
                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={35}>

                            <div className="relative h-full">
                                <div className="absolute top-2  left-6 z-50">
                                    <button onClick={handleCustomInputClick} className={`mr-4 ${activePanel === 'input' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded`}>Custom Input</button>
                                    <button onClick={handleOutputClick} className={`mr-4 ${activePanel === 'input' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded`}>Tests</button>
                                    <button onClick={handleOutputClick} className={`mr-4 ${activePanel === 'output' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded`}>Output</button>
                                </div>

                                <div className='absolute top-2 right-6'>
                                    <button
                                        onClick={handleCompile}
                                        disabled={!code}
                                        className={classnames(
                                            "border-2  z-10 rounded-md px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0", running ? "opacity-50 cursor-not-allowed text-green-500" : "",
                                            !code ? "opacity-50 cursor-not-allowed" : ""
                                        )}
                                    >
                                        {running ? "Running..." : "Compile and Execute"}
                                    </button>
                                </div>

                                {/* Render active component based on state */}
                                <div className="h-full pt-12 pl-6 pr-6">
                                    {activePanel === "input" && <CustomInputField customInput={customInput} setCustomInput={setCustomInput} />}
                                    {activePanel === "output" && <OutputPanel outputDetails={outputDetails || {}} />}
                                </div>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </Suspense>
    );
}
