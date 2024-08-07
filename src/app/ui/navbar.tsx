'use client';

import { Button } from '@/components/ui/button';
import {
    AlarmClock,
    BookText,
    Play,
    BugPlay,
    MountainIcon,
    Settings,
    Loader2,
} from 'lucide-react';
import { UserNav } from '@/components/utils/user-nav';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetDescription,
    SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CustomDialog } from '@/components/shared/custom-dialog';
import ProblemList from '@/components/problems-list/problem-list';
import Link from 'next/link';
import { TooltipWrapper } from '@/components/utils/tooltip-wrapper';
import useCompilerStore from '@/store/editor-store';
import { usePathname } from 'next/navigation';
import { UserContext } from '@/contexts/userContext';
import { useContext } from 'react';

const Navbar = () => {
    const { code, running, submitting, handleCompile, handleSubmit } =
        useCompilerStore();
    const { user: currentUser } = useContext(UserContext);

    const pathname = usePathname();
    const args = pathname.split('/');

    //TODO: GET THESE FROM THE ACTIVE CHALLENGE AND SESSION STORE BUT FOR NOW:  Destructure challengeId and sessionId based on the technical route
    const [challengeId, sessionId] =
        args[1] === 'technical' ? [args[2], args[4]] : ['0', ''];

    const runCode = () => {
        console.log('running code', code, challengeId, sessionId, currentUser?.id);
        handleCompile(
            code,
            '',
            71,
            parseInt(challengeId),
            currentUser?.id,
            sessionId
        );
    };

    const submitCode = () => {
        console.log(
            'submitting code',
            code,
            challengeId,
            sessionId,
            currentUser?.id
        );
        handleSubmit(
            code,
            '',
            71,
            parseInt(challengeId),
            currentUser?.id,
            sessionId
        );
    };

    return (
        <header
            className={`relative top-0 z-50 w-full bg-background border-b ${pathname === '/challenges' ||
                    pathname === '/sessions' ||
                    pathname === '/analysis'
                    ? 'p-2'
                    : ''
                }`}
        >
            <div className="flex h-[48px] items-center justify-between px-4 md:px-4">
                <div className="flex gap-4 items-center">
                    <Link className="flex items-center gap-1" href="#">
                        <MountainIcon
                            className={`h-6 w-6 font-bold ${pathname === '/challenges' ||
                                    pathname === '/analysis' ||
                                    pathname === '/sessions'
                                    ? 'text-primary'
                                    : ''
                                }`}
                        />
                    </Link>

                   
                    <Sheet>
                        {pathname !== '/challenges' &&
                            pathname !== '/sessions' &&
                            pathname !== '/analysis' ? (
                            <SheetTrigger asChild>
                                <Button
                                    className="h-auto w-fit flex gap-2 items-center"
                                    variant="secondary"
                                >
                                    <span>
                                        <BookText size={14} />
                                    </span>
                                    <span className="text-sm">Problem List</span>
                                </Button>
                            </SheetTrigger>
                        ) : 
                           
                           <h2 className="font-semibold text-lg text-primary">Wanderer</h2>

                        }
                
                        <SheetContent style={{ width: '600px' }} side="left">
                            <SheetHeader>
                                <SheetTitle>Problems List</SheetTitle>
                                <SheetDescription>
                                    Recommended questions we&apos;ve picked for you
                                </SheetDescription>
                            </SheetHeader>
                            <div className="flex w-full max-w-sm items-center space-x-2 py-4 ">
                                <Input
                                    startIcon={Search}
                                    type="email"
                                    placeholder="Search questions, topics and tags...."
                                />
                            </div>
                            <div className="flex justify-end">
                                <Link
                                    href="/challenges"
                                    target="_blank"
                                    className="text-primary text-sm underline cursor-pointer"
                                >
                                    See all
                                </Link>
                            </div>
                            <div className="overflow-y-auto h-full custom-scrollbar flex-1">
                                <ProblemList />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                {pathname !== '/challenges' &&
                    pathname !== '/sessions' &&
                    pathname !== '/analysis' ? (
                        <div className="flex justify-center items-center gap-2">
                            {running ? (
                                <Button
                                    className="flex h-auto w-fit flex-row gap-x-1 items-center"
                                    disabled
                                >
                                    <Loader2 className=" h-4 w-4 animate-spin" />
                                    <small className="text-sm">Running</small>
                                </Button>
                            ) : (
                                <Button
                                    onClick={runCode}
                                    className={`${submitting ? 'hidden' : 'flex'
                                        } h-auto w-fit items-center gap-1`}
                                >
                                    <span>
                                        <Play size={14} />
                                    </span>
                                    Run
                                </Button>
                            )}

                            {submitting ? (
                                <Button
                                    className="h-auto w-fit flex items-center gap-1"
                                    variant="secondary"
                                    disabled
                                >
                                    <span>
                                        <Loader2 className=" h-4 w-4 animate-spin" />
                                    </span>
                                    <span>Submitting</span>
                                </Button>
                            ) : (
                                <Button
                                    className={`${running ? 'hidden' : 'flex'
                                        } h-auto w-fit items-center gap-1`}
                                    variant="secondary"
                                    onClick={submitCode}
                                >
                                    <span>
                                        <BugPlay size={14} />
                                    </span>
                                    <span>Submit</span>
                                </Button>
                            )}
                        </div>
                    ):  
                        <Link className="flex items-center gap-1 text-primary" href="/challenges">
                            Back to Challenges
                        </Link>}
                 
                <div className="flex gap-3 items-center">
                    {pathname !== '/challenges' && (
                        <div className="p-[0.65rem] cursor-pointer w-fit h-full bg-secondary rounded-md text-secondary-foreground hover:bg-secondary/80">
                            <TooltipWrapper
                                text="Timer"
                                component={<div className='flex gap-2 items-center'>
                                    <span className='font-semibold text-sm'>12:39:46</span>
                                    <AlarmClock size={16} />
                                </div>}
                            />
                        </div>
                    )}
                    {pathname !== '/challenges' && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="secondary"
                                    className="h-auto w-fit flex items-center gap-2"
                                >
                                    <Settings size={14} />
                                    <span className="text-sm">Settings</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[425px]">
                                <CustomDialog />
                            </DialogContent>
                        </Dialog>
                    )}

                    <UserNav user={currentUser} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
