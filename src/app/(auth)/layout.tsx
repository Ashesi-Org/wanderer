import { ReactNode } from "react";
import Background from "../ui/home/background";
const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen w-screen justify-center">
            <Background />
            {children}
        </div>
    );
}

export default AuthLayout;