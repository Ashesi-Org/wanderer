import { Badge } from "../ui/badge";

interface ProblemDescriptionProps {
    challenge_id?: number;
    title?: string;
    description?: string;
    difficulty?: string;
    content?: string;
    constraints?: string;
    assumptions?: string[];
    topicTags?: string[];
    similarQuestions?: string[];
    sampleTestCase?: any;
    allTestCases?: string[];
    driverCode?: string;
    hints?: string[];
    created_at?: string;
    updated_at?: string;
}

const ProblemDescription = ({ title, description, content, difficulty, constraints, assumptions, sampleTestCase, allTestCases }: ProblemDescriptionProps) => {

    return (
        <div className="flex flex-col">
            <strong className="text-xl tracking-normal">{title}</strong>
            <div className="my-2">
                <Badge>{difficulty}</Badge>
            </div>
            {/* Problem Statement(paragraphs) */}
            <div className='text-sm desc'>

                <p className='mt-3 text-sm leading-relaxed' dangerouslySetInnerHTML={{ __html: description! }} >
                </p>

                <p className='mt-3 text-sm leading-relaxed'>
                    {content}
                </p>

                    {assumptions?.map((assumption: string, index: number) => (
                        <p className='mt-3 text-sm leading-relaxed' key={index}>
                            <strong className='text-sm'>Assumption {index + 1}: </strong>
                            <span className="text-sm">{assumption}</span>
                        </p>
                        
                    ))}
            </div>

            <div className="examples flex flex-col gap-y-2 my-4">
                {sampleTestCase && sampleTestCase.length > 0 && sampleTestCase.map((example:any, index:number) => (
                    <div className='mt-4' key={index}>
                        <div>
                            <p className='font-semibold text-sm'>Example {index + 1}: </p>
                            <div className='example-card bg-secondary rounded-sm'>
                                <pre>
                                    <strong className='text-sm'>Input:  </strong>
                                    <span className="text-sm">{example.input}</span>
                                    <br />
                                    <strong className='text-sm'>Output:  </strong>
                                    <span className="text-sm">{example.output}</span>
                                    <br />
                                    <strong className='text-sm'>Explanation:  </strong>
                                    <span className="text-sm">{example.explanation ? example.explanation : ''}</span>
                                </pre>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Constraints */}
                <div className='my-3'>
                    <div className='text-sm font-semibold'>Constraints:</div>
                    <ul className='ml-5 list-disc' dangerouslySetInnerHTML={{ __html: constraints! }}>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProblemDescription;
