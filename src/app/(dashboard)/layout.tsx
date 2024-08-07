import { ReactNode } from "react";
import Navbar from "../ui/navbar";
import WithAuthHoc from "@/components/with-auth/WithAuthHoc";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (

            <div className="relative flex flex-col bg-background overflow-hidden">
                <Navbar />
                <main className="overflow-hidden">
                    {children}
                </main>
            </div>

    );
}

export default DashboardLayout;