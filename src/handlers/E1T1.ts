import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

const composer = new Composer<Ctx>();

const USAGE = "Usage: /add <number> <number>\nExample: /add 5 3";

composer.command("add", async (ctx) => {
  const args = ctx.match.trim();
  if (!args) {
    await ctx.reply(USAGE);
    return;
  }
  const parts = args.split(/\s+/);
  if (parts.length < 2) {
    await ctx.reply(USAGE);
    return;
  }
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  if (isNaN(a) || isNaN(b)) {
    await ctx.reply(USAGE);
    return;
  }
  const sum = a + b;
  await ctx.reply(`Result: ${formatNumber(sum)}`);
});

export default composer;