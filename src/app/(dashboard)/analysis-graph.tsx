import { ReactNode } from 'react';

const AnalysisGraph = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex items-center gap-6 p-4  justify-center'>
            {children}
        </div>
    );
}

export default AnalysisGraph;