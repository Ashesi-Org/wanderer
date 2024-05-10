import { Button } from "@/components/ui/button";
import { AlarmClock, BookText, Play, BugPlay, MountainIcon, Settings, Loader2 } from "lucide-react"
import { UserNav } from "@/components/utils/user-nav";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetDescription,
    SheetTitle
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialog } from "@/components/shared/custom-dialog";
import ProblemList from "@/components/problems-list/problem-list";
import Link from 'next/link'
import { TooltipWrapper } from "@/components/utils/tooltip-wrapper";


const Navbar = () => {
    return (
        <header className="relative top-0 z-50 w-full bg-background">
            <div className="flex h-[48px] items-center justify-between px-4 md:px-4">
                <div className="flex gap-4 items-center">
                    <Link className="flex items-center gap-1" href="#">
                        <MountainIcon className="h-6 w-6" />
                    </Link>
                    <Sheet>

                        <SheetTrigger asChild>
                            <Button className="h-auto w-fit flex gap-2 items-center" variant="secondary" >
                                <span>
                                    <BookText size={14} />
                                </span>
                                <span className="text-sm">Problem List</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent style={{ width: "600px" }} side="left" >
                            <SheetHeader>
                                <SheetTitle>Problems List</SheetTitle>
                                <SheetDescription>Recommended questions we&apos;ve picked for you</SheetDescription>
                            </SheetHeader>
                            <div className="flex w-full max-w-sm items-center space-x-2 py-4 ">
                                <Input startIcon={Search} type="email" placeholder="Search questions, topics and tags...." />
                            </div>
                            <div className='flex justify-end'>
                                <Link href="/problems" className='text-primary text-sm underline cursor-pointer'>See all</Link>
                            </div>
                            <div className="overflow-y-auto h-full custom-scrollbar flex-1">
                                <ProblemList />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <Button className="h-auto w-fit flex items-center gap-1" >
                        <span>
                            <Play size={14} />
                        </span>
                        Run
                    </Button>
                    {/* <Button className="flex h-auto w-fit flex-row gap-x-1 items-center" disabled>
                        <Loader2 className=" h-4 w-4 animate-spin" />
                        <small className="text-sm">Running</small>
                    </Button> */}
                    <Button className="h-auto w-fit flex items-center gap-1" variant="secondary">
                        <span>
                            <BugPlay size={14} />
                        </span>
                        <span>Submit</span>
                    </Button>

                </div>
                <div className="flex gap-3 items-center">
                    <div className="p-[0.65rem] cursor-pointer w-fit h-full bg-secondary rounded-md text-secondary-foreground hover:bg-secondary/80">
                        <TooltipWrapper text="Timer" component={<AlarmClock size={16} />} />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="h-auto w-fit flex items-center gap-2">
                                <Settings size={14} />
                                <span className="text-sm">Settings</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[425px]">
                            <CustomDialog />
                        </DialogContent>
                    </Dialog>

                    <UserNav />
                </div>
            </div>
        </header>
    );
}

export default Navbar;