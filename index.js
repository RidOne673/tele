const TeleBot = require('telebot');
const { Configuration, OpenAIApi } = require('openai')
const util = require('util')
let cp = require ('child_process')

const bot = new TeleBot('5718876282:AAEx3OZBkr4EIJybGzR-Uhhp4cfQAmym118')
let configuration = new Configuration({
  apiKey: "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",
});
let openai = new OpenAIApi(configuration);

bot.on(['/start', '/hello'], (msg) => msg.reply.text(`Selamat datang di bot ChatGPT saya!\n\nKetik pertanyaanmu untuk bertanya.`));

bot.on(['/speedtest'], async (msg) => {
  msg.reply.text('Please wait....')
let exec = util.promisify(cp.exec).bind(cp)
let o
    try {
        o = await exec('python3 speed.py --share --secure')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) msg.reply.text(stdout)
        if (stderr.trim()) msg.reply.text(stderr)
    }
})

bot.on('text', async (msg) => {
  const text = msg.text
  let logs = `

  From :
        Name : ${msg.from.first_name}, Username : ${msg.from.username}, ID : ${msg.from.id}, isBot : ${msg.from.is_bot}
Text : ${msg.text}

`
console.log(logs)
  if (text.startsWith('=>')) {

    try {
      msg.reply.text(util.format(eval(`(async () => { return ${text.slice(3)} })()`)))
    } catch (err) {
      await msg.reply.text(String(err))
    }

  } else if (!text.startsWith('/')) {

    if (text.includes('=>')) return
    try {
      if (text.length > 50) return msg.reply.text('Maaf pesan terlalu panjang!')
      const prompt = `${text}\n`
      let response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 3000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      msg.reply.text(response.data.choices[0].text)
    } catch {
      msg.reply.text('Maaf saya tidak mengerti')
    }

  }


})




bot.start();
