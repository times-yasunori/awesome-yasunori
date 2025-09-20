import { client } from "@awesome-yasunori/api/client";
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  SearchResultEntrySchema,
  YasunoriEntrySchema,
  yasunoriEntryFields,
} from "./schemas.ts";
import { searchYasunori } from "./search.ts";
import { createStructuredOutput } from "./utils.ts";

// サーバーインスタンスの作成
export const server = new McpServer({
  name: "awesome-yasunori",
  version: "0.1.0",
});

const structuredGetAllOutput = createStructuredOutput(
  z.object({
    total: z.number().int().min(0),
    offset: z.number().int().min(0).nullable(),
    limit: z.number().int().min(1).max(100).nullable(),
    items: z.array(YasunoriEntrySchema),
  }),
);

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
    outputSchema: structuredGetAllOutput.schema,
  },
  async ({ offset, limit }) => {
    try {
      const res = await client.awesome.$get();
      if (!res.ok) {
        return structuredGetAllOutput.error(
          "Failed to get all awesome yasunori",
        );
      }
      const allYasunori = await res.json();

      // if offset or limit is not provided, return all items
      let paginatedYasunori = allYasunori;
      if (offset != null || limit != null) {
        const start = offset ?? 0;
        const end = limit != null ? start + limit : undefined;
        paginatedYasunori = allYasunori.slice(start, end);
      }

      return structuredGetAllOutput.success({
        total: allYasunori.length,
        offset,
        limit,
        items: paginatedYasunori,
      });
    } catch (error) {
      return structuredGetAllOutput.error(
        error instanceof Error ? error.message : String(error),
      );
    }
  },
);

const structuredCountOutput = createStructuredOutput(
  z.object({
    count: z.number().int().min(0),
  }),
);

server.registerTool(
  "getAwesomeYasunoriCount",
  {
    description: "get total count of awesome yasunori items",
    outputSchema: structuredCountOutput.schema,
  },
  async () => {
    try {
      const res = await client.awesome.$get();
      if (!res.ok) {
        return structuredCountOutput.error(
          "Failed to get awesome yasunori count",
        );
      }
      const allYasunori = YasunoriEntrySchema.array().parse(await res.json());
      const structuredContent = {
        isError: false,
        result: { count: allYasunori.length },
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
  "getRandomAwesomeYasunori",
  {
    description: "get random awesome yasunori",
    outputSchema: {
      isError: z.boolean(),
      result: z.object(yasunoriEntryFields).optional(),
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
      const structuredContent = { isError: false, result: randomYasunori };
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
      result: z.object(yasunoriEntryFields).optional(),
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
      const structuredContent = { isError: false, result: awesomeYasunori };
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
      result: z
        .object({
          query: z.string(),
          limit: z.number().int().min(1).max(50),
          threshold: z.number().min(0).max(1),
          count: z.number().int().min(0),
          elapsed: z.string(),
          results: z.array(SearchResultEntrySchema),
        })
        .optional(),
      error: z.string().optional(),
    },
  },
  async ({ query, limit = 10, threshold = 0 }) => {
    try {
      const searchResult = await searchYasunori(query, { limit, threshold });
      const structuredContent = {
        isError: false,
        result: {
          query,
          limit,
          threshold,
          count: searchResult.count,
          elapsed: searchResult.elapsed,
          results: searchResult.entries,
        },
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
