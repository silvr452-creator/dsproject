import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { REST, Routes } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN не найден');
if (!process.env.CLIENT_ID) throw new Error('CLIENT_ID не найден');
if (!process.env.GUILD_ID) throw new Error('GUILD_ID не найден');

const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const fileUrl = pathToFileURL(filePath).href;
  const commandModule = await import(fileUrl);
  const command = commandModule.default;

  if (command?.data) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Начинаю регистрацию slash-команд...');

  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );

  console.log('Slash-команды успешно зарегистрированы.');
} catch (error) {
  console.error(error);
}