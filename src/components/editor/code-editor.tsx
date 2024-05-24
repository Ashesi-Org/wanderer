import React from "react";
import Editor from "@monaco-editor/react";
import { javascriptDefault } from "@/lib/constants";
import { Skeleton } from "../ui/skeleton";
import useCompilerStore from "@/store/editor-store";

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

const CodeEditor = () => {
  const { code, setCode } = useCompilerStore();

  return (
    <div className="overlay overflow-hidden w-full h-full shadow-sm rounded-md">
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 13,
        }}
        height="100vh"
        theme="vs-dark"
        language="python"
        loading={<EditorLoadingSkeleton />}
        value={code || javascriptDefault} // Use the code state as the initial value
        onChange={(newValue) => setCode(newValue || '')} // Update the code state when the value changes
      />
    </div>
  );
};

export default CodeEditor;
