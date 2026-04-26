export default {
  name: 'ready',
  once: true,

  async execute(client) {
    console.log(`Бот запущен как ${client.user.tag}`);
  },
};