import React, { useEffect, useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Skeleton } from '../ui/skeleton';
import useCompilerStore from '@/store/editor-store';
import * as monaco from 'monaco-editor';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Loader2, RotateCw, Sparkles, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useChat } from '@ai-sdk/react';
import { TextContent } from '../text-content';

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
  problemId: number;
  driverCode: string;
  question: string;
}

const CodeEditor = ({ driverCode, question }: CodeEditorProps) => {
  const { code, setCode } = useCompilerStore();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({
    lineNumber: 0,
    column: 0,
  });
  const [editorInstance, setEditorInstance] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [inputValue, setInputValue] = useState('');
  const monacoRef = useRef<typeof monaco | null>(null);

  useEffect(() => {
    setCode(driverCode);
  }, [driverCode, setCode]);
  ``;

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    setEditorInstance(editor);
    monacoRef.current = monacoInstance;

    editor.addAction({
      id: 'show-dialog',
      label: 'Show Dialog',
      keybindings: [
        monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyG,
      ],
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
      const position = new monacoRef.current.Position(
        dialogPosition.lineNumber + 1,
        1
      );
      editorInstance.executeEdits('', [
        {
          range: new monacoRef.current.Range(
            position.lineNumber,
            1,
            position.lineNumber,
            1
          ),
          text: inputValue + '\n', // Append newline character to input value
          forceMoveMarkers: true,
        },
      ]);
      setDialogVisible(false);
      setInputValue('');
    }
  };

  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    error,
    stop,
  } = useChat({
    api: '/api/openai',
    body: {
      currentImplementation: code,
      problem: question,
    },
  });

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
        value={code}
        onChange={(newValue) => setCode(newValue || '')}
        onMount={handleEditorMount}
      />

      {dialogVisible && (
        <Card
          className="bg-white p-3 shadow-lg rounded-md w-[500px]"
          style={{
            position: 'absolute',
            top: `${dialogPosition.lineNumber * 20}px`,
            left: `${dialogPosition.column * 8}px`,
            zIndex: 1000,
          }}
        >
          <div className="dialogAi flex justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative h-[28px] w-[28px] rounded-full border-2 border-primary">
                <Avatar className="h-[28px] w-[28px]">
                  <AvatarImage
                    src="https://img.icons8.com/stickers/48/bot.png"
                    alt="bot-image"
                  />
                  <AvatarFallback className="flex justify-center text-sm">
                    AI
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="font-semibold text-sm text-gray-900">
                Assistant
              </span>
            </div>
            <div
              onClick={() => setDialogVisible(false)}
              className="relative h-6 w-6 rounded-full cursor-pointer hover:border-primary"
            >
              <X className="font-semibold" size={18} />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="my-2 flex items-center gap-2"
          >
            <Input
              type="text"
              placeholder="Ask the assistant..."
              value={input}
              className="w-full "
              onChange={handleInputChange}
            />
            <Button type="submit" className="flex items-center gap-1">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Sparkles size={13} color="white" />
                  <span>Ask AI</span>
                </>
              )}
            </Button>
          </form>

          {messages.length > 0 ? (
            <>
              <div className="my-4">
                <p className="font-semibold text-gray-800 text-start text-sm">
                  Answer
                </p>
                {messages.map((message, i) => {
                  if (message.role === 'assistant') {
                    return (
                      <p className="text-sm" key={i}>
                        <TextContent text={message?.content ?? ''} />
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button
                  onClick={handleAccept}
                  className="flex items-center gap-1"
                >
                  <span>Accept</span>
                  <Check size={13} color="white" />
                </Button>
                <Button className="flex items-center gap-1" variant="outline">
                  <span>Regenerate</span>
                  <RotateCw size={13} color="black" />
                </Button>
              </div>
            </>
          ) : (
            ''
          )}
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;
