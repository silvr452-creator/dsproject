import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client) {
  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const fileUrl = pathToFileURL(filePath).href;
    const commandModule = await import(fileUrl);
    const command = commandModule.default;

    if (!command?.data || !command?.execute) {
      console.warn(`Команда ${file} пропущена: нет data или execute`);
      continue;
    }

    client.commands.set(command.data.name, command);
  }

  console.log(`Загружено команд: ${client.commands.size}`);
}