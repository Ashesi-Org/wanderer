import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative flex flex-col bg-background overflow-hidden">
            <main className="overflow-hidden">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;