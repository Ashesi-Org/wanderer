import { ReactNode } from "react";
import Navbar from "../ui/navbar";
import { Suspense } from "react";
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SkeletonTable = () => {
    const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
            <TableCell className="animate-pulse bg-gray-300 h-8 w-full"></TableCell>
            <TableCell className="animate-pulse bg-gray-300 h-8 w-full"></TableCell>
            <TableCell className="animate-pulse bg-gray-300 h-8 w-full"></TableCell>
            <TableCell className="animate-pulse bg-gray-300 h-8 w-full"></TableCell>
        </TableRow>
    ));

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-secondary">
                    <TableRow>
                        <TableHead className="animate-pulse bg-gray-300 h-8 w-full"></TableHead>
                        <TableHead className="animate-pulse bg-gray-300 h-8 w-full"></TableHead>
                        <TableHead className="animate-pulse bg-gray-300 h-8 w-full"></TableHead>
                        <TableHead className="animate-pulse bg-gray-300 h-8 w-full"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skeletonRows}
                </TableBody>
            </Table>
        </div>
    );
};



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