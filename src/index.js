import 'dotenv/config';
import { Client, Collection , GatewayIntentBits } from 'discord.js';
import { loadCommands } from './loaders/loadCommands.js';
import { loadEvents } from './loaders/loadEvents.js';

if (!process.env.DISCORD_TOKEN) {  
  throw new Error('DISCORD_TOKEN не найден в .env');  
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

await loadCommands(client);
await loadEvents(client);

client.login(process.env.DISCORD_TOKEN).catch(console.error);