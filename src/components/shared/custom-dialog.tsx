'use client'
import { Button } from "@/components/ui/button"
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import EnvironmentSettings from "./environment-settings";

export const CustomDialog = () => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                    Make changes to your environment here. Click save when you are done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <EnvironmentSettings />
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </>
    )
}
