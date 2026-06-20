import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("help", async (ctx) => {
  await ctx.reply(
    "Available commands:\n" +
    "/start — Welcome message\n" +
    "/help — Show this help"
  );
});

export default composer;