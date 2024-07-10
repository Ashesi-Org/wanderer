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

const Navbar = () => {
    const { code, running, outputDetails, handleCompile } = useCompilerStore();

    const runCode = () => {
        handleCompile(code, '', 71, 11, 1, 'b2d8c1a6-e811-4b1e-b764-7a0ec0aa9c74');
    };

    const pathname = usePathname();

    return (
        <header
            className={`relative top-0 z-50 w-full bg-background border-b ${pathname === '/challenges' && 'p-1'
                }`}
        >
            <div className="flex h-[48px] items-center justify-between px-4 md:px-4">
                <div className="flex gap-4 items-center">
                    <Link className="flex items-center gap-1" href="#">
                        <MountainIcon
                            className={`h-6 w-6 font-bold ${pathname == '/challenges' ? 'text-primary' : ''
                                }`}
                        />
                    </Link>
                    <Sheet>
                        {pathname !== '/challenges' ? (
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
                        ) : (
                            <h2 className="font-semibold text-lg text-primary">Wanderer</h2>
                        )}
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
                {pathname !== '/challenges' && (
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
                                className="h-auto w-fit flex items-center gap-1"
                            >
                                <span>
                                    <Play size={14} />
                                </span>
                                Run
                            </Button>
                        )}

                        <Button
                            className="h-auto w-fit flex items-center gap-1"
                            variant="secondary"
                        >
                            <span>
                                <BugPlay size={14} />
                            </span>
                            <span>Submit</span>
                        </Button>
                    </div>
                )}
                <div className="flex gap-3 items-center">

                    {pathname !== '/challenges' && (
                        <div className="p-[0.65rem] cursor-pointer w-fit h-full bg-secondary rounded-md text-secondary-foreground hover:bg-secondary/80">
                            <TooltipWrapper
                                text="Timer"
                                component={<AlarmClock size={16} />}
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

                    <UserNav />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
