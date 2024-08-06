import { ReactNode } from "react";
import Navbar from "../ui/navbar";
import React from 'react';


const TableLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="relative flex flex-col bg-background ">
                <main className="overflow-y-scroll">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default TableLayout;