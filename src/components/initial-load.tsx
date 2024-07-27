import { Button } from '@/components/ui/button';
import { Loader2, Bot, Send } from 'lucide-react';

export const InitialLoad = ({
    fn,
    connecting = true,
}: {
    fn: () => void;
    connecting: boolean;
}) => {
    return (
        <>
            <div className="flex flex-col items-center mt-12">
                <div className="flex justify-center">
                    <Bot className="w-10 h-10 text-center text-slate-600" />
                </div>
                <p className="text-slate-600 text-center mb-4">No messages yet</p>
                <Button
                    disabled={connecting}
                    onClick={() => !connecting && fn()}
                    type="submit"
                    className="flex items-center gap-1"
                >
                    {connecting ? (
                        <div className="w-full text-white h-full gap-2 items-center flex justify-center opacity-40 cursor-not-allowed">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span> Connecting..</span>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">Start a conversation</span>
                            <Send size={20} />
                        </div>
                    )}
                </Button>
            </div>
        </>
    );
};
