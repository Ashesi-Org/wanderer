import { ReactNode } from "react";
import Navbar from "../ui/navbar";
const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <div className="flex h-screen w-screen">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;