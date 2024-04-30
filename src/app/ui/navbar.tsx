import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookText, Play, BugPlay, MountainIcon, Settings } from "lucide-react"
import { UserNav } from "@/components/utils/user-nav";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomDialog } from "@/components/shared/custom-dialog";
import ProblemList from "@/components/problems-list/problem-list";

const Navbar = () => {
    return (
        <header className="relative top-0 z-50 w-full border-b border-border/40 bg-background">
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
                        <SheetContent side="left" className="w-[500px]">
                            <ProblemList />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <Button className="h-auto w-fit flex items-center gap-1" >
                        <span>
                            <Play size={14} />
                        </span>
                        <span>Run</span>
                    </Button>
                    <Button className="h-auto w-fit flex items-center gap-1" variant="secondary">
                        <span>
                            <BugPlay size={14} />
                        </span>
                        <span>Submit</span>
                    </Button>

                </div>
                <div className="flex gap-3 items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="h-auto  w-fit flex items-center gap-2">
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