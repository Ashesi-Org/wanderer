import React, { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Skeleton } from "../ui/skeleton";
import useCompilerStore from "@/store/editor-store";
import * as monaco from "monaco-editor";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, MessageCircleX, RotateCw, SparkleIcon, Sparkles, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const EditorLoadingSkeleton = () => {
  return (
    <div className="overlay overflow-hidden w-full h-full rounded-md">
      <div className="flex flex-col ">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex flex-col gap-y-2 px-6 my-4">
            <Skeleton className="h-3 bg-[#eee] w-[300px] rounded-md" />
            <Skeleton className="h-3 bg-[#eee] w-[350px] rounded-md" />
            <Skeleton className="h-3 bg-[#eee] w-[500px] rounded-md" />
            <Skeleton className="h-3 bg-[#eee] w-[200px] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};


interface CodeEditorProps {
  language: string;
  problemId: number,
  driverCode: string
}

const CodeEditor = ({  language, problemId, driverCode }: CodeEditorProps) => {
  const { code, setCode } = useCompilerStore();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ lineNumber: 0, column: 0 });
  const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [inputValue, setInputValue] = useState("");
  const monacoRef = useRef<typeof monaco | null>(null);

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    setEditorInstance(editor);
    monacoRef.current = monacoInstance;

    editor.addAction({
      id: "show-dialog",
      label: "Show Dialog",
      keybindings: [monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyG],
      run: () => {
        const position = editor.getPosition();
        if (position) {
          setDialogPosition(position);
          setDialogVisible(true);
        }
      },
    });
  };

  const handleAccept = () => {
    if (editorInstance && inputValue && monacoRef.current) {
      const position = new monacoRef.current.Position(dialogPosition.lineNumber + 1, 1);
      editorInstance.executeEdits("", [{
        range: new monacoRef.current.Range(position.lineNumber, 1, position.lineNumber, 1),
        text: inputValue + '\n', // Append newline character to input value
        forceMoveMarkers: true
      }]);
      setDialogVisible(false);
      setInputValue("");
    }
  };



  return (
    <div className="overlay overflow-hidden w-full h-full shadow-sm rounded-md relative">
       <Editor
          options={{
          minimap: {
            enabled: false,
          },
          fontSize: 13,
          scrollBeyondLastLine: false,
          fixedOverflowWidgets: true,
        }}
        height="100vh"
        theme="vs-dark"
        language="python"
        loading={<EditorLoadingSkeleton />}
        value={code || driverCode} 
        onChange={(newValue) => setCode(newValue || '')} 
        onMount={handleEditorMount}
      />

      {dialogVisible && (

        <Card
          className=" bg-white p-3 shadow-lg rounded-md w-[500px]"
          style={{
            position: 'absolute',
            top: `${dialogPosition.lineNumber * 20}px`,
            left: `${dialogPosition.column * 8}px`,
            zIndex: 1000,
          }}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative h-[28px] w-[28px] rounded-full border-2 border-primary">
                <Avatar className="h-[28px] w-[28px]">
                  <AvatarImage src="https://img.icons8.com/stickers/48/bot.png" alt="bot-image" />
                  <AvatarFallback className="flex justify-center text-sm">AI</AvatarFallback>
                </Avatar>
              </div>
              <span className="font-semibold text-sm text-gray-900">Assistant</span>
            </div>
            <div onClick={() => setDialogVisible(false)} className="relative h-6 w-6 rounded-full cursor-pointer hover:border-primary">
              <X className='font-semibold' size={18} />
            </div>
          </div>
          <div className="my-2 flex items-center gap-2">
            <Input
              type="text"
              placeholder="Ask the assistant..."
              value={inputValue}
              className="w-full "
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button className="flex items-center gap-1">
              <span>Generate</span>
              <Sparkles size={13} color="white" />
            </Button>
          </div>

          {/* <div className="my-4">
            <p className="font-semibold text-gray-800 text-start text-sm">Answer</p>
            <p className=" text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button className="flex items-center gap-1">
              <span>Accept</span>
              <Check size={13} color="white" />
            </Button>
            <Button className="flex items-center gap-1" variant="outline">
              <span>Regenerate</span>
              <RotateCw size={13} color="black" />
            </Button>
          </div> */}

        </Card>
      )}
    </div>
  );
};

export default CodeEditor;