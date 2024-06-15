'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { ArrowUpDown, ChevronDown, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useQuery } from 'react-query';
import { api } from '@/lib/api';
import { useActiveChallengeStore } from '@/store/active-challenge-store';
import { createSlug } from '@/lib/utils';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Challenge {
    challenge_id: string;
    title: string;
    difficulty: Difficulty;
    topicTags: string[];
}

export const columns: ColumnDef<Challenge>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <div className="capitalize text-start">{row.getValue('status')}</div>
        ),
    },
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('title')}</div>
        ),
    },
    {
        accessorKey: 'difficulty',
        header: 'Difficulty',
        cell: ({ row }) => (
            <h2 className="capitalize text-start">
                <Badge
                    className={
                        row.getValue('difficulty') === 'Hard'
                            ? 'bg-red-100 text-red-800 pointer-events-none'
                            : row.getValue('difficulty') === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800 pointer-events-none'
                                : 'bg-green-100 text-green-800 pointer-events-none'
                    }
                >
                    {row.getValue('difficulty')}
                </Badge>
            </h2>
        ),
    },
    {
        accessorKey: 'topicTags',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Topics
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">
                {(row.getValue('topicTags') as string[]).map(
                    (tag: string, index: number, array: string[]) => (
                        <span key={index} className="mr-1">
                            {tag}
                            {index < array.length - 1 && ','}
                        </span>
                    )
                )}
            </div>
        ),
    },
];

export default function ProblemsTable() {
    const { data: challenges } = useQuery<Challenge[]>('challenges', async () => {
        const response = await api.get(`/api/challenges`);
        return response.data;
    });
    const router = useRouter();
    const { activeChallengeId, setActiveChallenge } = useActiveChallengeStore();
    const [showDialog, setShowDialog] = React.useState(false);
    const [rulesAccepted, setRulesAccepted] = React.useState(false);
    const [isCreatingSession, setIsCreatingSession] = React.useState(false);
    const [selectedChallenge, setSelectedChallenge] =
        React.useState<Challenge | null>(null);

    const handleChallengeSelection = (challenge: Challenge) => {
        setSelectedChallenge(challenge);
        setShowDialog(true);
    };

    const createSession = async (

    ) => {
        
        setIsCreatingSession(true);
        setRulesAccepted(true);
        const response = await api.post(`/api/session`, {
            challengeId: selectedChallenge?.challenge_id,
            userId: 1,
        });
               
        if (response.status === 201) {
            const data = response.data;
            console.log(data);
            setActiveChallenge(data?.practiceSession.challengeId);
            setIsCreatingSession(false);
            setShowDialog(false);
        router.push(`/technical/${data?.practiceSession.challengeId}/${createSlug(selectedChallenge?.title as string)}/${data?.practiceSession.sessionId}`, {
                scroll: false,
            });
        } else {
            console.log(response.data);
            setIsCreatingSession(false);
            setShowDialog(false);
        }
    };


    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable<Challenge>({
        data: challenges || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="max-w-screen-md h-screen justify-center mx-auto">
            <div className="my-4">
                <h2 className="text-3xl mb-3 text-primary text-center font-semibold">
                    Problem List
                </h2>
                <p className="text-center text-gray-600">
                    Select a problem from the list for your interview
                </p>
            </div>
            <div className="w-full">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter questions..."
                        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                            table.getColumn('title')?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border mb-12">
                    <Table>
                        <TableHeader className="bg-secondary">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                        onClick={() => handleChallengeSelection(row.original)}
                                        className="cursor-pointer"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        <div className="w-full flex justify-center">
                                            <Loader2 className=" h-6 w-6 animate-spin" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} question(s) solved.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Accept Rules and Guidelines</DialogTitle>
                        <DialogDescription>
                            Please read and accept the rules before proceeding.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                {' '}
                                0: Make sure you have access to mic and web cam for the
                                interview.
                            </li>
                            <li>
                                {' '}
                                1: Make sure to take this practice in a well lit environment.
                            </li>
                            <li> 2: Do not share your code.</li>
                            <li> 3: Complete the challenge within the given time.</li>
                            <li> 4: Do not use any external help.</li>
                            <li> 5: Do not navigate to other websites.</li>
                            <li> 6: Do not use any malicious software.</li>
                        </ul>
                    </div>
                    <DialogFooter>
                        {isCreatingSession ?

                            <Button className="flex h-auto w-fit flex-row gap-x-1 items-center" disabled>
                                <Loader2 className=" h-4 w-4 animate-spin" />
                                <small className="text-sm">Creating</small>
                            </Button> : <Button onClick={createSession} className="h-auto w-fit flex items-center gap-1" >
                                Accept
                            </Button>
                        }

                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
