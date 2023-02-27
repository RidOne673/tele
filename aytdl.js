const { youtubedlv2 } = require("@bochilteam/scraper");
const TeleBot = require('telebot');
const moment = require('moment-timezone');
const os = require('os');
const fetch = require('node-fetch');


require('./config');

const bot = new TeleBot(global.ytAudioApi);

bot.on(["/start"], (msg) => msg.reply.text(`Selamat datang di bot Youtube Audio Downloader saya!\n\nPastekan link youtubemu disini.`));

bot.on(["/donate"], (msg) => {
  txt = `Donasi seikhlasnya agar bot bisa terus aktif

Bank : ${global.donate.bank} (${global.donate.bankName})
Dana : ${global.donate.dana}
SPay : ${global.donate.spay}
Gopay : ${global.donate.gpay}

1 rupiah pun sangat berarti bagi kami
Terimakasih.
`
      bot.sendPhoto(msg.from.id, global.donate.qris, { caption: txt });
});

bot.on(["/morebot"], (msg) => msg.reply.text(global.moreBot));

bot.on(["/ping"], async(msg) => {
  const format = n => (n / 1024 / 1024).toFixed(2) + ' MB';

      const used = process.memoryUsage();
      const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
      });

      const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
      }, {
        speed: 0,
        total: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      });

      let old = performance.now();
      await msg.reply.text('Testing speed...');
      let neww = performance.now();
      let speed = neww - old;
	let hass = `
Merespon dalam ${speed} millidetik

💻 Server Info :

Ram: ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}
Terpakai: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB

NodeJS Memory Usage
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}
`.trim();

// Kirimkan informasi Server
	console.log(hass);
	msg.reply.text(hass).then (() => {

	// Kirimkan informasi Total CPU Usage
	if (cpus[0]) {
	  let totalCPU = `
Total CPU Usage
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- ${(type).padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
`.trim();
	  console.log(totalCPU);
	  msg.reply.text(totalCPU);
	}
	}).then(()=> {

	// Kirimkan informasi CPU Core Usage per Core
	setTimeout(() => {
	cpus.forEach((cpu, i) => {
	  setTimeout(() => {
	  let coreCPU = `
CPU Core ${i + 1} Usage
${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- ${(type).padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
`.trim();
	  console.log(coreCPU);
	  msg.reply.text(coreCPU);
	},300 * i);
	});
	},500);
	});
});

bot.on(["/uptime"], async(msg) => {
  uptime = process.uptime();
		hours = Math.floor(uptime / 3600);
		minutes = Math.floor(uptime % 3600 / 60);
		seconds = Math.floor(uptime % 60);

		msg.reply.text(`Sistem telah aktif selama ${hours} jam ${minutes} menit ${seconds} detik.`);
})

bot.on('text', async (msg) => {

const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss');

  let newData = {
  date: time,
  name: msg.from.first_name,
  username: msg.from.username,
  id: msg.from.id,
  isBot: msg.from.is_bot,
  text: msg.text
}

  console.log(newData);
  
 if (isUrl(msg.text)) {
 if (!msg.text.includes("//youtu")) return  msg.reply.text('Maaf link youtube tidak terdeteksi.');
  if (msg.text.includes("short")) return msg.reply.text("Tidak didukung untuk yt shorts.");
  try {
  
  let hasil = await youtubedlv2(findUrl(msg.text)[0]);
  msg.reply.text('Sedang diproses');

  let res = hasil.audio['128kbps'];
  let link = await res.download();
   bot.sendChatAction(msg.chat.id, 'upload_audio');
   let buff = await getBuffer(link);
    bot.sendChatAction(msg.chat.id, 'upload_audio');
  let caption = `
Youtube Audio Downloader

Title : ${hasil.title}
Quality : ${res.quality}
Size : ${res.fileSizeH}

Jangan lupa untuk support bot ini dengan berdonasi.
info donasi : /donate
`
    
bot.sendAudio(msg.chat.id, buff, {caption: caption}, {fileName: "Audio-by-OCTAVE.mp3"});
  } catch (e) {
       msg.reply.text(e.toString());
        bot.sendMessage(global.ownId, "Terjadi error\n\n" + e.toString());
        }
 }
});

bot.start();

function findUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex);
}

  function isUrl(str) {
  const pattern = /^https?:\/\//;
  return pattern.test(str);
}

async function getBuffer(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return buffer;
}


function getFileSize(url) {
  return fetch(url, {
    method: "HEAD"
  })
  .then(response => {
    if(response.ok) {
      const contentLength = response.headers.get('content-length');
      return contentLength;
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
