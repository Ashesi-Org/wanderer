import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TimerAlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const TimerAlertDialog: React.FC<TimerAlertDialogProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[425px]">
                <DialogTitle>Time&apos;s Up!</DialogTitle>
                <DialogDescription>
                    Your time is up. Do you want to submit your code now?
                </DialogDescription>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="default" onClick={onConfirm}>Submit Now</Button>
                </DialogFooter>
                <DialogClose className="absolute right-4 top-4">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default TimerAlertDialog;
