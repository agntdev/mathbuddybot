import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { formatNumber } from "../util/formatNumber.js";

const composer = new Composer<Ctx>();

const USAGE = "Usage: /div <number> <number>";

composer.command("div", async (ctx) => {
  const args = ctx.match?.trim().split(/\s+/) ?? [];
  if (args.length !== 2) {
    await ctx.reply(USAGE);
    return;
  }
  const a = Number(args[0]);
  const b = Number(args[1]);
  if (isNaN(a) || isNaN(b)) {
    await ctx.reply(USAGE);
    return;
  }
  if (b === 0) {
    await ctx.reply("Cannot divide by zero.");
    return;
  }
  const result = a / b;
  await ctx.reply(
    `${formatNumber(a)} / ${formatNumber(b)} = ${formatNumber(result)}`,
  );
});

export default composer;