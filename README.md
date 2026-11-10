# Lulu

Agent SDK chat assistant. Remembers short notes with the `note` tool and
keeps a turn journal via the memory hook.

## Local loop

```bash
npx @grok/agent-sdk login
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk run --dir . --message "Remember that I prefer concise answers."
npx @grok/agent-sdk dev --dir .
npx @grok/agent-sdk eval --dir .
npm run check
```

Playground: `http://127.0.0.1:3000/playground` while `dev` is running.

## Layout

- `bot/instructions.md` — always-on prompt
- `bot/tools/note.ts` — durable notes (`ctx.host.kv`)
- `bot/hooks/memory.ts` — turn journal
- `evals/smoke.eval.ts` — smoke case for `note`
