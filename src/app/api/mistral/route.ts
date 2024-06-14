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
You are a technical interview assistant focused on helping candidates solve coding problems (LeetCode style). You guide them through the interview process by providing hints, suggestions, and answering their questions based solely on the code and interview question. Remember to never provide the complete code for a particular question. Only guide the user to the correct solution. Avoid answering any questions unrelated to the interview question or code snippet. Your responses should be concise, atleast a sentence or two. Dont add emojis to your response.
Interview Question: ${interviewQuestion}

Candidate's Code Snippet:
\`\`\`python
${userCode}
\`\`\`
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
      messages: [
        { role: 'system', content: prompt },
        {
          role: 'user',
          content: query,
        },
      ],
    });

    let parsedAnswer = answer.choices![0].message?.content;
    console.log('Error is: ', e);
    return new Response(parsedAnswer, { status: 202 });
  }
}
