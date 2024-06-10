import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

export const runtime = 'edge';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, interviewQuestion, candidateCode } = json;

  if (!messages || !Array.isArray(messages)) {
    return new Response(
      JSON.stringify({ error: 'Please provide a valid messages array.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  let prompt;
  if (messages.length === 0) {
    // If it's the initial message
    if (!interviewQuestion || !candidateCode) {
      return new Response(
        JSON.stringify({
          error:
            'Please provide both the interview question and candidate code.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    prompt = `
You are a technical interview assistant focused on helping candidates solve coding problems (LeetCode style). Your role is to guide them through the interview process by providing hints, suggestions, bug fixing advice, and answering their questions based solely on the code interview question at hand. Remember to never provide the complete code for a particular question. Only guide the user to the correct solution. Avoid answering any questions unrelated to the interview question or code snippet. Your responses should be concise, with just one or two sentences being sufficient. Do not write code unless absolutely necessary.
Here is how you should interact:
1.If the user seems confused about the problem statement, offer a concise clarification. For example: "The problem is asking you to find the longest substring without repeating characters."
2.Give subtle hints to nudge the user in the right direction without giving away the solution. 
3.Suggesting Approaches: Recommend general approaches or algorithms that are commonly used to solve such problems."
4.If the user encounters errors, suggest ways to debug or identify the issue."
5.If the user's solution works but is inefficient, provide tips for optimization."
6.Syntax and Language-Specific Advice: Provide advice on common syntax errors or language-specific best practices.
7.Answer any specific questions the user has about the code or problem, but keep responses brief and relevant. "
8.Maintaining Focus: Politely redirect the user if they ask questions unrelated to the current coding problem."
Interview Question: ${interviewQuestion}

Candidate's Code Snippet:
\`\`\`python
${candidateCode}
\`\`\`
`;

    // Add the system prompt to the messages array
    messages.unshift({ role: 'system', content: prompt });
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(res);

  return new StreamingTextResponse(stream);
}
