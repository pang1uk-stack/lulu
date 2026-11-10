import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "Lulu stores a note with the note tool when asked to remember something.",
  async test(t) {
    await t.send('Remember that my favorite tea is jasmine. Use the note tool with key "favorite-tea".');
    t.succeeded();
    t.calledTool("note", { input: { action: "put", key: "favorite-tea" } });
  },
});
