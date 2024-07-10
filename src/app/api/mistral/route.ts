import {
  TogetherAIStream,
  TogetherAIStreamPayload,
} from '@/app/utils/TogetherAIStream';

import Together from 'together-ai';

const together = new Together({
  apiKey: process.env['TOGETHER_API_KEY'],
  baseURL: 'https://together.helicone.ai/v1',

  defaultHeaders: {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
    'Helicone-Cache-Enabled': 'true',
  },
});

export async function POST(request: Request) {
  let { interviewQuestion, userCode, query } = await request.json();

  const prompt = `
    You are a technical interview assistant focused on helping candidates solve coding problems. You guide them through the interview process by providing hints, suggestions, and answering their questions based solely on their code and interview question. Remember to never provide the complete code for a particular question. Only guide the user to the correct solution. Your response must be correct and not contain any code, it should be concise, accurate and written by an expert using an unbiased and professional tone. Please limit to 1024 tokens. Do not give any information that is not related to the interview question or code, and do not repeat. 

    Here is the set of contexts:

    <context>
      Interview Question: ${interviewQuestion},
      Candidate's code:
      ${userCode}
    </context>
      Remember, don't blindly repeat the contexts verbatim – just respond with the answer. Keep a running context of the interview questions being asked by the user. It is very important for my career that you follow these instructions. Here is the user question:

`;

  try {
    const payload: TogetherAIStreamPayload = {
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: prompt },
        {
          role: 'user',
          content: query,
        },
      ],
      stream: true,
    };

    const stream = await TogetherAIStream(payload);
    // TODO: Need to add error handling here, since a non-200 status code doesn't throw.
    return new Response(stream, {
      headers: new Headers({
        'Cache-Control': 'no-cache',
      }),
    });
  } catch (e) {
    let answer = await together.chat.completions.create({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [{ role: 'system', content: prompt }],
    });

    let parsedAnswer = answer.choices![0].message?.content;
    console.log('Error is: ', e);
    return new Response(parsedAnswer, { status: 202 });
  }
}
