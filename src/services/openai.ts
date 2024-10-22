import OpenAI from 'openai';
import { OpenAiSingleton } from '../singleton/openAiSingleton';

export async function createOpenAIRequestService() {
    const openai = OpenAiSingleton.getInstance().getOpenAIConfig();

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
    });
    console.log(completion);
    console.log("---------");
    console.log(completion.choices[0].message);
}
