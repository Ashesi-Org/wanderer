import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const ProblemList = () => {
  return (
    <>
      <SheetHeader>
        <SheetTitle>Problems List</SheetTitle>
        <SheetDescription>Select a question to solve</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4"></div>
    </>
  );
};

export default ProblemList;
