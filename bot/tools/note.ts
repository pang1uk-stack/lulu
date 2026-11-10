import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

const KEY_PREFIX = "note:";

export default defineTool({
  description:
    "Save, recall, or delete a short durable note (preferences, names, standing context).",
  execution: "server",
  effect: ({ action }) => (action === "get" ? "read" : action === "put" ? "idempotent" : "write"),
  inputSchema: z.object({
    action: z.enum(["get", "put", "delete"]),
    key: z
      .string()
      .min(1)
      .max(64)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase kebab-case key"),
    value: z.string().min(1).max(2000).optional(),
  }),
  async execute({ action, key, value }, ctx) {
    const storageKey = `${KEY_PREFIX}${key}`;

    if (action === "get") {
      const stored = await ctx.host.kv.get(storageKey);
      if (stored === undefined) {
        return { key, found: false as const };
      }
      return { key, found: true as const, value: stored };
    }

    if (action === "put") {
      if (value === undefined) {
        return { ok: false as const, error: "value is required for put" };
      }
      await ctx.host.kv.put(storageKey, value);
      return { ok: true as const, key, value };
    }

    await ctx.host.kv.delete(storageKey);
    return { ok: true as const, key, deleted: true as const };
  },
});
