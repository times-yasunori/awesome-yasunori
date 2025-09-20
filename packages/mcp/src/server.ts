import { client } from "@awesome-yasunori/api/client";
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchYasunori } from "./search.ts";

const yasunoriEntryFields = {
  id: z.number().int().nonnegative().describe("Awesome Yasunori ID"),
  title: z.string().describe("Title of the entry"),
  date: z.string().describe("ISO formatted date of the entry"),
  at: z.string().describe("Where the entry was recorded"),
  senpan: z.string().describe("Who reported the entry"),
  content: z.string().describe("Main content of the entry"),
  meta: z
    .string()
    .nullable()
    .optional()
    .describe("Optional metadata for the entry"),
} satisfies Record<string, z.ZodTypeAny>;

const YasunoriEntrySchema = z.object(yasunoriEntryFields);
const SearchResultEntrySchema = z.object({
  id: z.string().describe("Entry ID as string"),
  title: z.string(),
  date: z.string(),
  at: z.string(),
  senpan: z.string(),
  content: z.string(),
  meta: z.string().nullable().optional(),
});

// サーバーインスタンスの作成
export const server = new McpServer({
  name: "awesome-yasunori",
  version: "0.1.0",
});

server.registerTool(
  "getAllAwesomeYasunori",
  {
    description:
      "get all awesome yasunori with pagination support. if offset/limit are not provided, returns all items",
    inputSchema: {
      offset: z
        .number()
        .int()
        .min(0)
        .nullable()
        .default(null)
        .describe("Starting index for pagination"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(100)
        .nullable()
        .default(null)
        .describe("Maximum number of items to return"),
    },
    outputSchema: {
      isError: z.boolean(),
      total: z.number().int().min(0).optional(),
      offset: z.number().int().min(0).nullable().optional(),
      limit: z.number().int().min(1).max(100).nullable().optional(),
      items: z.array(YasunoriEntrySchema).optional(),
      error: z.string().optional(),
    },
  },
  async ({ offset, limit }) => {
    try {
      const res = await client.awesome.$get();
      if (!res.ok) {
        const structuredContent = {
          isError: true,
          error: "Failed to get all awesome yasunori",
        };
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(structuredContent),
            },
          ],
          isError: true,
          structuredContent,
        };
      }
      const allYasunori = await res.json();

      // if offset or limit is not provided, return all items
      let paginatedYasunori = allYasunori;
      if (offset != null || limit != null) {
        const start = offset ?? 0;
        const end = limit != null ? start + limit : undefined;
        paginatedYasunori = allYasunori.slice(start, end);
      }

      const structuredContent = {
        isError: false,
        total: allYasunori.length,
        offset,
        limit,
        items: paginatedYasunori,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        structuredContent,
      };
    } catch (error) {
      const structuredContent = {
        isError: true,
        error: error instanceof Error ? error.message : String(error),
      };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        isError: true,
        structuredContent,
      };
    }
  },
);

server.registerTool(
  "getAwesomeYasunoriCount",
  {
    description: "get total count of awesome yasunori items",
    outputSchema: {
      isError: z.boolean(),
      count: z.number().int().min(0).optional(),
      error: z.string().optional(),
    },
  },
  async () => {
    try {
      const res = await client.awesome.$get();
      if (!res.ok) {
        const structuredContent = {
          isError: true,
          error: "Failed to get awesome yasunori count",
        };
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(structuredContent),
            },
          ],
          isError: true,
          structuredContent,
        };
      }
      const allYasunori = YasunoriEntrySchema.array().parse(await res.json());
      const structuredContent = { isError: false, count: allYasunori.length };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        structuredContent,
      };
    } catch (error) {
      const structuredContent = {
        isError: true,
        error: error instanceof Error ? error.message : String(error),
      };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        isError: true,
        structuredContent,
      };
    }
  },
);

server.registerTool(
  "getRandomAwesomeYasunori",
  {
    description: "get random awesome yasunori",
    outputSchema: {
      isError: z.boolean(),
      ...yasunoriEntryFields,
      error: z.string().optional(),
    },
  },
  async () => {
    try {
      const res = await client.awesome.random.$get();
      if (!res.ok) {
        const structuredContent = {
          isError: true,
          error: "Failed to get random awesome yasunori",
        };
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(structuredContent),
            },
          ],
          isError: true,
          structuredContent,
        };
      }
      const randomYasunori = YasunoriEntrySchema.parse(await res.json());
      const structuredContent = { isError: false, ...randomYasunori };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        structuredContent,
      };
    } catch (error) {
      const structuredContent = {
        isError: true,
        error: error instanceof Error ? error.message : String(error),
      };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        isError: true,
        structuredContent,
      };
    }
  },
);

server.registerTool(
  "getAwesomeYasunoriById",
  {
    description: "get awesome yasunori by id",
    inputSchema: {
      id: z.number().int().min(0).describe("Awesome Yasunori ID"),
    },
    outputSchema: {
      isError: z.boolean(),
      ...yasunoriEntryFields,
      error: z.string().optional(),
    },
  },
  async ({ id }) => {
    try {
      const res = await client.awesome[":id"].$get({
        param: { id: id.toString() },
      });
      if (!res.ok) {
        const structuredContent = {
          isError: true,
          error: `Failed to get awesome yasunori by id: ${id}`,
        };
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(structuredContent),
            },
          ],
          isError: true,
          structuredContent,
        };
      }
      const awesomeYasunori = YasunoriEntrySchema.parse(await res.json());
      const structuredContent = { isError: false, ...awesomeYasunori };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        structuredContent,
      };
    } catch (error) {
      const structuredContent = {
        isError: true,
        error: error instanceof Error ? error.message : String(error),
      };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        isError: true,
        structuredContent,
      };
    }
  },
);

server.registerTool(
  "searchAwesomeYasunori",
  {
    description:
      "search awesome yasunori entries using full-text search with BM25 algorithm",
    inputSchema: {
      query: z
        .string()
        .describe("Search query to find relevant yasunori entries"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Maximum number of results to return (default: 10)"),
      threshold: z
        .number()
        .min(0)
        .max(1)
        .optional()
        .describe("Minimum relevance score threshold (default: 0)"),
    },
    outputSchema: {
      isError: z.boolean(),
      query: z.string().optional(),
      limit: z.number().int().min(1).max(50).optional(),
      threshold: z.number().min(0).max(1).optional(),
      count: z.number().int().min(0).optional(),
      elapsed: z.string().optional(),
      results: z.array(SearchResultEntrySchema).optional(),
      error: z.string().optional(),
    },
  },
  async ({ query, limit = 10, threshold = 0 }) => {
    try {
      const searchResult = await searchYasunori(query, { limit, threshold });
      const structuredContent = {
        isError: false,
        query,
        limit,
        threshold,
        count: searchResult.count,
        elapsed: searchResult.elapsed,
        results: searchResult.entries,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        structuredContent,
      };
    } catch (error) {
      const structuredContent = {
        isError: true,
        error: `Failed to search awesome yasunori: ${error instanceof Error ? error.message : String(error)}`,
      };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structuredContent),
          },
        ],
        isError: true,
        structuredContent,
      };
    }
  },
);

// resources implementation
server.registerResource(
  "yasunori-entries",
  "awesomeyasunori://list",
  {
    title: "Awesome Yasunori Entries",
    description: "All awesome yasunori entries",
  },
  async (uri) => {
    const res = await client.awesome.$get();
    if (!res.ok) {
      throw new Error("Failed to get all awesome yasunori");
    }
    const allYasunori = await res.json();
    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(allYasunori),
        },
      ],
    };
  },
);

server.registerResource(
  "yasunori-entry",
  new ResourceTemplate("awesomeyasunori://{id}", { list: undefined }),
  {
    title: "Awesome Yasunori Entry",
    description: "Individual awesome yasunori entry",
  },
  async (uri, { id }) => {
    const res = await client.awesome[":id"].$get({
      param: { id: id.toString() },
    });
    if (!res.ok) {
      throw new Error("Failed to get awesome yasunori by id");
    }
    const awesomeYasunori = await res.json();

    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(awesomeYasunori),
        },
      ],
    };
  },
);
