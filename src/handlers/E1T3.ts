import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { formatNumber } from "../util/formatNumber.js";

const composer = new Composer<Ctx>();

const USAGE = "Usage: /mul <number> <number>\nExample: /mul 5 3";

composer.command("mul", async (ctx) => {
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
  const product = a * b;
  await ctx.reply(`Result: ${formatNumber(product)}`);
});

export default composer;