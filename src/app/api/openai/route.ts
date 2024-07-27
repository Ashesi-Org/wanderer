import { StreamingTextResponse, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req: Request) {
  const { currentImplementation, problem, messages } = await req.json();

  if (!problem) return new Response('Problem is required', { status: 400 });
  if (!currentImplementation)
    return new Response('Impelementation required', {
      status: 400,
    });

  const prompt = `
    You are a technical interview assistant. Help candidates solve coding problems by providing brief hints and suggestions based on their code and the interview question. Do not provide complete code or the complete hint to the answer. Ensure responses are correct, concise, professional, and limited to three sentences. Focus only on the interview question or code and avoid repetition.

    Here is the set of contexts:
    <context>
      Interview Question: ${problem},
      Candidate's code:
      ${currentImplementation}
    </context>
      Remember, don't blindly repeat the contexts verbatim – just respond with the answer. Keep a running context of the questions being asked by the user. It is very important for my career that you follow these instructions. Here is the user question:
  
  `;

  const result = await streamText({
    model: groq('llama3-8b-8192'),
    system: prompt,
    messages,
  });
  return new StreamingTextResponse(result.toAIStream());
}
