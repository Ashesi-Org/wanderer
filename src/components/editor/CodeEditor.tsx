import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorWindowProps {
  onChange: (fieldName: string, value: string) => void;
  language?: string;
  code?: string;
  theme?: string;
}

const CodeEditor: React.FC<CodeEditorWindowProps> = ({
  onChange,
  language,
  code,
  theme,
}) => {
  const [value, setValue] = useState<string>(code || "");

  const handleEditorChange = (newValue: string | undefined) => {
    if (typeof newValue === 'string') {
      setValue(newValue);
      onChange("code", newValue);
    }
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="60vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
