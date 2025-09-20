import { z } from "zod";

/**
 * Creates a structured output helper for MCP tools with consistent error handling
 */
export const createStructuredOutput = <TResult extends z.ZodTypeAny>(
  expectedResult: TResult,
) => {
  // Define the discriminated union for type safety
  type SuccessOutput = { isError: false; result: z.infer<TResult> };
  type ErrorOutput = { isError: true; error: string };

  // MCP requires a regular schema, not discriminatedUnion
  const outputSchema = {
    isError: z.boolean(),
    result: expectedResult.optional(),
    error: z.string().optional(),
  };

  return {
    schema: outputSchema,

    success: (data: z.infer<TResult>) => {
      const structuredContent: SuccessOutput = {
        isError: false,
        result: data,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(structuredContent),
          },
        ],
        isError: false as const,
        structuredContent,
      };
    },

    error: (error: string) => {
      const structuredContent: ErrorOutput = {
        isError: true,
        error,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(structuredContent),
          },
        ],
        isError: true as const,
        structuredContent,
      };
    },
  };
};
