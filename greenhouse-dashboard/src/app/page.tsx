'use client';

import * as React from 'react';
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
import { ArrowUpDown, ChartArea, ChevronDown, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import GreenhouseImage from './greenhouse.png';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { format } from 'date-fns';
import { BarChartComponent } from './components/bar-component';
import { LineChartComponent } from './components/line-chart-component';
import useFetch from '@/hooks/useFetch';

export interface SensorData {
  temperature: string;
  humidity: string;
  ldr_value: string;
  Co2: string;
  reading_time: string;
}

export type MonitoringData = {
  temperature: string;
  humidity: string;
  ldr_value: string;
  Co2: string;
  reading_time: string;
};

export const columns: ColumnDef<MonitoringData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
    accessorKey: 'reading_time',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{format(new Date(row.getValue('reading_time')), 'dd-MM-yyyy HH:mm')}</div>,
  },
  {
    accessorKey: 'temperature',
    header: () => <div className="text-center">Temperature (°C)</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue('temperature')}</div>,
  },
  {
    accessorKey: 'humidity',
    header: () => <div className="text-center">Humidity (%)</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue('humidity')}</div>,
  },
  {
    accessorKey: 'ldr_value',
    header: () => <div className="text-center">Light Intensity (lux)</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue('ldr_value')}</div>,
  },
  {
    accessorKey: 'Co2',
    header: () => <div className="text-center">CO2</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue('Co2')}</div>,
  },
];

export default function Home() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedGraph, setSelectedGraph] = React.useState<string>('bar');

  const { data, loading, error } = useFetch('http://localhost/hafiz-backend/backend.php');

  const table = useReactTable({
    data: data || [],
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
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  if (loading) {
    return <div className='w-[90px]  mt-24 h-screen justify-center mx-auto'>
      <Loader2 className='h-14 w-14 text-primary animate-spin' />
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-screen-lg h-screen justify-center mx-auto">
      <div className="mt-8 mb-6 flex items-center gap-4 justify-center">
        <Image src={GreenhouseImage} alt="logo" width={70} height={70} />
        <h2 className="text-3xl text-primary text-center font-semibold">Greenhouse Dashboard</h2>
      </div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <div className="flex items-center">
            <Input
              placeholder="Search data by time..."
              value={(table.getColumn('reading_time')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('reading_time')?.setFilterValue(event.target.value)}
              className="w-[300px]"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-4 text-white flex gap-2 items-center">
                  <span>View analytics</span> <ChartArea size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl mb-2">Analytics</DialogTitle>
                </DialogHeader>
                <Select value={selectedGraph} onValueChange={(value) => {
                  setSelectedGraph(value);
                }}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue defaultValue="bar" placeholder="Select graph to plot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="bar">Bar chart</SelectItem>
                      <SelectItem value="timeseries">Timeseries</SelectItem>
                      {/* <SelectItem value="pie">Pie chart</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {selectedGraph === 'bar' && <BarChartComponent />}
                {selectedGraph === 'timeseries' && <LineChartComponent />}
                {/* {selectedGraph === 'pie' && <PieChartComponent />} */}

              </DialogContent>
            </Dialog>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filter columns <ChevronDown className="ml-2 h-4 w-4" />
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
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
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
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
