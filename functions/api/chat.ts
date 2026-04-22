import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from 'ai';
import { z } from 'zod';
import { Document } from 'flexsearch';
import { docsPages } from './_docs-data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomDocument extends Record<string, any> {
  url: string;
  title: string;
  description: string;
  content: string;
}

export type ChatUIMessage = UIMessage<
  never,
  {
    client: {
      location: string;
    };
  }
>;

const searchServer = createSearchServer();

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: 'url',
      index: ['title', 'description', 'content'],
      store: true,
    },
  });

  for (const doc of docsPages) {
    search.add(doc as CustomDocument);
  }

  return search;
}

/** System prompt, you can update it to provide more specific information */
const systemPrompt = [
  'You are an AI assistant for the Agentic Engineering Playbook documentation site.',
  'Use the `search` tool to retrieve relevant docs context before answering when needed.',
  'The `search` tool returns raw JSON results from documentation. Use those results to ground your answer and cite sources as markdown links using the document `url` field when available.',
  'If you cannot find the answer in search results, say you do not know and suggest a better search query.',
].join('\n');

export type SearchTool = typeof searchTool;

const searchTool = tool({
  description: 'Search the docs content and return raw JSON results.',
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    const search = await searchServer;
    return await search.searchAsync(query, { limit, merge: true, enrich: true });
  },
});

interface Env {
  OPENROUTER_API_KEY: string;
  OPENROUTER_MODEL?: string;
}

type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
}) => Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const openrouter = createOpenRouter({
    apiKey: env.OPENROUTER_API_KEY,
  });

  const reqJson = (await request.json()) as {
    messages?: ChatUIMessage[];
  };

  const result = streamText({
    model: openrouter.chat(
      env.OPENROUTER_MODEL ?? 'google/gemini-2.0-flash-exp:free',
    ),
    stopWhen: stepCountIs(5),
    tools: {
      search: searchTool,
    },
    messages: [
      { role: 'system', content: systemPrompt },
      ...(await convertToModelMessages<ChatUIMessage>(
        reqJson.messages ?? [],
        {
          convertDataPart(part) {
            if (part.type === 'data-client')
              return {
                type: 'text',
                text: `[Client Context: ${JSON.stringify(part.data)}]`,
              };
          },
        },
      )),
    ],
    toolChoice: 'auto',
  });

  return result.toUIMessageStreamResponse();
};
