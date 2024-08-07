import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import AnalysisGraph from "../analysis-graph";
import { TimeSeriesGraph } from "../timeseries";
import { Histogram } from "../histogram";
import { Card, CardContent } from "@/components/ui/card";
import SkillRating from "../skills-container";
import { dummyChallenge, dummyPracticeSession, dummySubmissions } from "../data";
import AlgorithmicAnalysis from "../algorithmic-analysis-container";



const skills = [
    { name: 'Algorithms', rating: 4 },
    { name: 'Problem solving', rating: 8 },
    { name: 'Coding', rating: 2 },
];


const Analysis = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center ">
            <section className="py-6 px-6 flex flex-col items-center justify-center">
                <h2 className="text-md mb-4 text-gray-600"><span className="text-xl font-semibold">Kudos!</span> on finishing your interview practice. Below is a recap of your performance </h2>
                <Tabs defaultValue="pres" className=" flex justify-center align-middle flex-col">
                    <TabsList className="grid grid-cols-4 w-full  ">
                        <TabsTrigger value="algo">Algorithmic Analysis</TabsTrigger>

                        <TabsTrigger value="pres">Prescriptive Analysis</TabsTrigger>
                        <TabsTrigger value="desc">Descriptive Analysis</TabsTrigger>
                        <TabsTrigger value="feedback">Overall Feedback</TabsTrigger>
                    </TabsList>

                    <TabsContent value="algo">
                        <AlgorithmicAnalysis
                            practiceSession={dummyPracticeSession}
                            challenge={dummyChallenge}
                            submissions={dummySubmissions}
                        />

                    </TabsContent>
                    <TabsContent value="pres">
                        <AnalysisGraph>
                            <TimeSeriesGraph />
                            <Histogram />
                            <TimeSeriesGraph />

                        </AnalysisGraph>
                        <Card className="p-4 max-w-7xl my-5 mx-5">
                            <div className="flex items-center justify-between w-full">
                                <h2 className="text-md font-semibold text-gray-700">
                                    Analysis Summary
                                </h2>
                                <h2 className="text-md font-semibold text-gray-700">
                                    Score: 8/10
                                </h2>
                            </div>
                            <div className="my-4 w-full">
                                <p className="text-wrap leading-relaxed text-gray-700 text-justify">
                                    This analysis provides insights into emotional responses during mock interviews: <br />

                                    <strong>1. Stress Points and Positive Reinforcement:</strong> The time series line plot tracks how stress and positive reinforcement levels changed over 45 minutes. It helps identify critical moments of high stress and positive feedback, offering a view into emotional trends and fluctuations throughout the session.
                                        <br />
                                    <strong>2. Emotion Switching Frequency:</strong> The histogram shows the frequency of emotion switches based on facial and speech recognition. It highlights the variability in emotional responses, indicating periods of emotional instability or stability.

                                    These metrics offer valuable feedback for improving interview performance by understanding emotional dynamics and how they influence overall performance.
                                </p>
                            </div>
                        </Card>

                    </TabsContent>
                    <TabsContent value="desc">
                        <AnalysisGraph>
                            <TimeSeriesGraph />
                            <Histogram />
                            <TimeSeriesGraph />

                        </AnalysisGraph>
                        <Card className="p-4 max-w-7xl my-10">
                            <div className="flex items-center justify-between w-full">
                                <h2 className="text-md font-semibold text-gray-700">
                                    Technical Feedback
                                </h2>
                                <h2 className="text-md font-semibold text-gray-700">
                                    Score: 8/10
                                </h2>
                            </div>
                            <div className="my-4 w-full">
                                <p className="text-wrap leading-relaxed text-gray-700 text-justify">
                                    Optimizing code and choosing the right data structures are crucial for efficient problem-solving. Here are a few general tips to keep in mind:

                                    Always consider the time and space complexity of your code. Aim for the lowest complexity possible given the constraints.

                                    Use Appropriate Data Structures: Choose data structures that best suit the problem

                                    Great for ordered data and quick access if index is known.
                                    Excellent for quick lookups, insertions, and deletions.
                                    Useful for hierarchical data, maintaining order, and quick searches (e.g., Binary Search Trees, AVL Trees).
                                    Perfect for problems involving networks, connectivity, and paths.
                                </p>
                            </div>

                        </Card>
                    </TabsContent>
                    <TabsContent value="feedback">
                        <Card className="p-4 max-w-7xl my-10">
                            <div className="flex items-center justify-between w-full">
                                <h2 className="text-md font-semibold text-gray-700">
                                    Technical Feedback
                                </h2>
                                <h2 className="text-md font-semibold text-gray-700">
                                    Score: 8/10
                                </h2>
                            </div>
                            <div className="my-4 w-full">
                                <p className="text-wrap leading-relaxed text-gray-700 text-justify">
                                    Optimizing code and choosing the right data structures are crucial for efficient problem-solving. Here are a few general tips to keep in mind:

                                    Always consider the time and space complexity of your code. Aim for the lowest complexity possible given the constraints.

                                    Use Appropriate Data Structures: Choose data structures that best suit the problem

                                    Great for ordered data and quick access if index is known.
                                    Excellent for quick lookups, insertions, and deletions.
                                    Useful for hierarchical data, maintaining order, and quick searches (e.g., Binary Search Trees, AVL Trees).
                                    Perfect for problems involving networks, connectivity, and paths.
                                </p>
                            </div>

                        </Card>

                        <Card className="p-4 max-w-7xl my-10">
                            <div className="flex items-center justify-between w-full">
                                <h2 className="text-md font-semibold text-gray-700">
                                    Communication skills Feedback
                                </h2>
                                <h2 className="text-md font-semibold text-gray-700">
                                    Score: 8/10
                                </h2>
                            </div>
                            <div className="my-4 w-full">
                                <p className="text-wrap leading-relaxed text-gray-700 text-justify">
                                    Optimizing code and choosing the right data structures are crucial for efficient problem-solving. Here are a few general tips to keep in mind:

                                    Always consider the time and space complexity of your code. Aim for the lowest complexity possible given the constraints.

                                    Use Appropriate Data Structures: Choose data structures that best suit the problem

                                    Great for ordered data and quick access if index is known.
                                    Excellent for quick lookups, insertions, and deletions.
                                    Useful for hierarchical data, maintaining order, and quick searches (e.g., Binary Search Trees, AVL Trees).
                                    Perfect for problems involving networks, connectivity, and paths.


                                </p>
                            </div>


                        </Card>
                        <div className="my-4 w-full">
                            <SkillRating skills={skills} />
                        </div>

                    </TabsContent>
                </Tabs>
            </section>

        </div>
    );
}

export default Analysis;