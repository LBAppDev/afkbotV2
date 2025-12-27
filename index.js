import mineflayer from "mineflayer";

// ================= CONFIG =================
const BOT_CONFIG = {
  host: "sway.aternos.me",   // example: play.example.com
  port: 12277,
  username: "Sway",
  version: "1.21"
};
// ==========================================

let bot;

function startBot() {
  console.log("Starting bot...");

  bot = mineflayer.createBot(BOT_CONFIG);

  bot.once("spawn", () => {
    console.log("Bot joined the server");

    setInterval(() => {
      if (!bot || !bot.entity) return;

      // Random head rotation
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI / 4;
      bot.look(yaw, pitch, true);

      // Jump
      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 500);

      // Move forward
      bot.setControlState("forward", true);
      setTimeout(() => {
        bot.setControlState("forward", false);

        // Move backward
        bot.setControlState("back", true);
        setTimeout(() => bot.setControlState("back", false), 500);
      }, 500);

      bot.swingArm("right");

      console.log("AFK action executed");
    }, 10_000);
  });

  bot.on("end", () => {
    console.log("Bot disconnected. Reconnecting in 5s...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", err => {
    console.log("Bot error:", err.message);
  });
}

startBot();
