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
    return new Response('What is your current impelementation', {
      status: 400,
    });

  const prompt = `
    You are a technical interview assistant focused on helping candidates solve coding problems. You guide them through the interview process by providing hints, suggestions, and answering their questions based solely on their code and interview question. Remember to never provide the complete code for a particular question. Only guide the user to the correct solution. Your response must be correct and not contain any code, it should be concise, accurate and written by an expert using an unbiased and professional tone. Please limit to 1024 tokens. Do not give any information that is not related to the interview question or code, and do not repeat. 

    Here is the set of contexts:

    <context>
      Interview Question: ${problem},
      Candidate's code:
      ${currentImplementation}
    </context>
      Remember, don't blindly repeat the contexts verbatim – just respond with the answer. Keep a running context of the interview questions being asked by the user. It is very important for my career that you follow these instructions. Here is the user question:
  
  `;

  const result = await streamText({
    model: groq('llama3-8b-8192'),
    system: prompt,
    messages,
  });
  return new StreamingTextResponse(result.toAIStream());
}
