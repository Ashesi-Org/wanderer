import React from "react";
import Editor from "@monaco-editor/react";
import { javascriptDefault } from "@/lib/constants";


const CodeEditor = () => {
  return (
    <div className="overlay overflow-hidden w-full h-full shadow-sm rounded-md">
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height="100vh"
        theme="vs-dark"
        language="python"
        value={javascriptDefault}
      />
    </div>
  );
};

export default CodeEditor;
