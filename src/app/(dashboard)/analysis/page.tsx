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


const Analysis = () => {
    return (
        <div className="">
            <section className="py-6 px-6 ">
                <h2 className="text-md mb-4 text-gray-600"><span className="text-xl font-semibold">Kudos!</span> on finishing your interview practice. Below is a recap of your performance </h2>
                <Tabs defaultValue="pres" className="">
                    <TabsList className="grid grid-cols-3 w-[650px]">
                        <TabsTrigger value="pres">Prescriptive Analysis</TabsTrigger>
                        <TabsTrigger value="desc">Descriptive Analysis</TabsTrigger>
                        <TabsTrigger value="feedback">Overall Feedback</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pres">
                        <AnalysisGraph>
                            <TimeSeriesGraph />
                            <Histogram />
                            <TimeSeriesGraph />

                        </AnalysisGraph>
                    </TabsContent>
                    <TabsContent value="desc">
                        <AnalysisGraph>
                            <TimeSeriesGraph />
                            <Histogram />
                            <TimeSeriesGraph />

                        </AnalysisGraph>
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

                    </TabsContent>
                </Tabs>
            </section>

        </div>
    );
}

export default Analysis;