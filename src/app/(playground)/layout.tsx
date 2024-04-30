import { ReactNode } from "react";
import Navbar from "../ui/navbar";

const PlaygroundLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative flex flex-col bg-background overflow-hidden">
            <Navbar />
            <main className="overflow-hidden">
                {children}
            </main>
        </div>
    );
}

export default PlaygroundLayout;