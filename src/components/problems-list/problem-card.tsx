import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle2 } from "lucide-react";

const ProblemCard = () => {
    return (
        <>

            <Card className="mt-2 mb-6">
                <div className='px-4 py-3'>
                    <div className='flex items-center justify-between'>
                        <span className='flex items-center gap-1'>
                            <p className='text-lg'>1. Add Two Numbers</p>
                            {/* <CheckCircle2 className='text-green-500' size={17} /> */}

                        </span>
                        <p className='text-yellow-500 text-sm'>Medium</p>
                    </div>
                </div>
                <div className='px-4 mb-4'>
                    <div className='flex items-center gap-2'>
                        <div className='flex flex-col gap-2 mb-1'>
                            <div className='flex items-center gap-2'>
                                <Badge>Array</Badge>
                                <Badge>Hash Table</Badge>
                                <Badge>Math</Badge>
                            </div>
                        </div>

                    </div>
                </div>
            </Card>
        </>
    );
}

export default ProblemCard;