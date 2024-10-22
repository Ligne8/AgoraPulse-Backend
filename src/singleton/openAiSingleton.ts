import OpenAI from 'openai';

/**
 * Singleton class to handle OpenAI API key, organization and project (gamberge)
 */
export class OpenAiSingleton {
  private static instance: OpenAiSingleton;

  private key: string = process.env.OPENAI_API_KEY || 'gamberge';
  private orgId: string = process.env.OPENAI_ORGANIZATION || 'gamberge';
  private projectId: string = process.env.OPENAI_PROJECT || 'gamberge';

  private openAi: OpenAI;

  private constructor() {
    console.log('OpenAiSingleton instance created');

    this.openAi = new OpenAI({
      organization: this.orgId,
      project: this.projectId,
      apiKey: this.key,
    });
  }

  public static getInstance(): OpenAiSingleton {
    if (!OpenAiSingleton.instance) {
      OpenAiSingleton.instance = new OpenAiSingleton();
    }
    return OpenAiSingleton.instance;
  }

  getOpenAIConfig(): OpenAI {
    return OpenAiSingleton.getInstance().openAi;
  }
}
