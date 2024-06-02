import React, { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { javascriptDefault } from "@/lib/constants";
import { Skeleton } from "../ui/skeleton";
import useCompilerStore from "@/store/compiler-store";
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
        value={code || driverCode} // Use the code state as the initial value
        onChange={(newValue) => setCode(newValue || '')} // Update the code state when the value changes
      />
    </div>
  );
};

export default CodeEditor;
