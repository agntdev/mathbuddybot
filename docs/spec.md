# MathBuddyBot — refined brief

Summary
- A simple, stateless Telegram calculator bot implemented in TypeScript using grammY. It supports basic arithmetic commands (/add, /sub, /mul, /div), plus /start and /help. No database, authentication, payments, or storage.

Audience
- Telegram users who want quick two-operand arithmetic from a bot.

Core entities
- Commands: /start, /help, /add <a> <b>, /sub <a> <b>, /mul <a> <b>, /div <a> <b>
- Handler modules: one TypeScript module per command under src/handlers/
- Bot process: stateless runtime that responds to commands and logs to console

Integrations & notification targets
- Telegram Bot API only. No external integrations, no webhooks required (deployers may choose polling or webhook at runtime).
- Bot token provided via environment variable BOT_TOKEN

Interaction flows
- /start
  - Response: friendly welcome + short command list and usage examples.
  - Example reply: "Hi — I'm MathBuddyBot. Use /add <a> <b>, /sub <a> <b>, /mul <a> <b>, /div <a> <b>. Example: /add 2 3 -> 5"

- /help
  - Response: same concise usage list/short help text.

- /add <a> <b>
  - Behavior: parse two numeric operands, compute a + b, reply with formatted numeric result.
  - If not exactly two numeric arguments: reply with usage hint: "Usage: /add <a> <b> — provide two numbers, e.g. /add 1.5 2"

- /sub <a> <b>
  - Behavior: a - b, same validation and usage hint as above.

- /mul <a> <b>
  - Behavior: a * b, same validation and usage hint as above.

- /div <a> <b>
  - Behavior: a / b, same validation. If second operand is zero (numeric equality to 0) reply with friendly error: "Cannot divide by zero — please provide a non-zero divisor." Otherwise reply numeric result.

Validation & parsing
- Input splitting: split on whitespace. Exactly two tokens after the command required.
- Numeric parsing: use Number(token) and require isFinite(number). Accept integers and floats in dot notation and scientific notation (per JS Number parsing). Decimal comma (",") is not supported.
- Error responses: short usage hint as above.

Result formatting
- Use a small helper formatNumber(result): if integer -> no decimals, else format with up to 10 decimal places and trim trailing zeros (so 1.5 -> "1.5", 1.3333333333333 -> "1.3333333333"). This keeps replies readable while preserving precision for typical calculations.

Persistence
- None. Stateless. No database, no files. All state ephemeral.

Payments
- None.

Non-goals
- No expression evaluation (e.g., "/add 1+2" or "2*3+5"). Only two-space-separated numeric operands.
- No user accounts, history, analytics storage.
- No inline mode and no web UI unless added later.

Project structure (concrete)
- package.json (scripts: build, start, dev)
- tsconfig.json (strict)
- src/
  - index.ts            // bot bootstrap, command registration, global error handler
  - handlers/
    - start.ts
    - help.ts
    - add.ts
    - sub.ts
    - mul.ts
    - div.ts
  - util/
    - formatNumber.ts   // numeric formatting helper

Handler contract
- Each handler exports default async function(ctx: Context): Promise<void>
- index.ts imports handlers and registers with bot.command('add', addHandler) etc.

Bot bootstrap details
- Environment: BOT_TOKEN required
- At startup set bot commands via bot.api.setMyCommands([...]) for clarity in Telegram UI
- Register a global error handler that logs the error to console and sends a short friendly error message to the user: "Sorry — an internal error occurred." (no stack traces sent to users)
- Use long polling by default (bot.start()). Deployers can switch to webhooks if desired (note in README).

Dependencies & dev tooling
- Dependencies: "grammy" (latest compatible), "@types/node" (dev), "typescript" (dev), "ts-node" (dev), etc.
- Node.js >= 18 recommended.

Examples
- User: /add 2 3
  - Bot: 5
- User: /div 1 0
  - Bot: Cannot divide by zero — please provide a non-zero divisor.
- User: /mul 2.5 4
  - Bot: 10
- User: /add two three
  - Bot: Usage: /add <a> <b> — provide two numbers, e.g. /add 1.5 2

Developer notes for implementer
- Keep each command in its own module (src/handlers/<cmd>.ts) as requested. Each handler is small and focused.
- Use Number() + Number.isFinite check for validation.
- For division check divisor === 0 after parsing.
- Format outputs using util/formatNumber to avoid long floating tails.

## Assumptions & defaults
- Accept floating-point and integer inputs parsed by JS Number (rationale: simple and standard).
- Decimal separator is dot (".") only — comma decimals not supported to avoid locale complexity.
- Input tokens split by whitespace; exactly two tokens required (rationale: keeps parsing trivial and predictable).
- Division-by-zero check uses numeric equality to 0 (rationale: handles 0, 0.0, 0e0, etc.).
- Results formatted with up to 10 decimal places and trimmed zeros (rationale: readable results while avoiding surprising long floats).
- Bot token provided through BOT_TOKEN env var; start with polling by default (rationale: easiest for local dev).
- Register bot commands at startup via setMyCommands (rationale: improves discoverability in Telegram clients).
- Node >= 18 and TypeScript with strict settings (rationale: modern runtime and safer code).

If you want, I can now: (a) generate the full project scaffold with files and code, or (b) produce just the index.ts and one handler as an example. Pick one.