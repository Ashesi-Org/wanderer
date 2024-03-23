import { Briefcase } from "lucide-react";
import Link from "next/link";
import { UserNav } from "@/components/utils/user-nav";
import { ProblemHoverCard } from "@/components/utils/problems-hover-card";


const Navbar = () => {
    return (
        <div className="flex items-center sticky inset-x-0 top-0 z-30 w-full transition-all justify-between px-4 h-16  shadow-sm">
            <div className="flex items-center gap-2">
                <Briefcase size={22} className="text-primary" />
                <h2 className="text-primary text-lg font-semibold">Wanderer</h2>
            </div>
            <div className="text-primary font-semibold justify-center">
                <ProblemHoverCard />
            </div>
            <div className="flex items-center gap-4">
                <Link className="text-primary text-sm font-semibold" href="/dashboard">Go to dashboard</Link>
                <UserNav />
            </div>
        </div>
    );
}

export default Navbar;