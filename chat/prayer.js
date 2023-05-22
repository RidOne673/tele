const TeleBot = require('telebot');
const { Coordinates, CalculationMethod, PrayerTimes } = require('adhan');
const moment = require('moment-timezone');

const bot = new TeleBot('6128082018:AAHLk4JvgvCvLOm3BbqxaXWanf8GeTda2yE');


async function prayerTime() {
  const timezone = 'Asia/Taipei'; 
  const tgl = moment.tz(moment().format('YYYY-MM-DD'), timezone);
  const waktu =  moment.tz('Asia/taipei').format("HH:mm:ss")
  const coordinates = new Coordinates(23.93453812818251, 120.66652364529843)
  const params = CalculationMethod.MoonsightingCommittee();
  const date = tgl.toDate();
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  const waktuSholat = {
    fajr: moment(prayerTimes.fajr).tz(timezone).format('HH:mm:ss'),
    dhuhr: moment(prayerTimes.dhuhr).tz(timezone).format('HH:mm:ss'),
    asr: moment(prayerTimes.asr).tz(timezone).format('HH:mm:ss'),
    maghrib: moment(prayerTimes.maghrib).tz(timezone).format('HH:mm:ss'),
    isha: moment(prayerTimes.isha).tz(timezone).format('HH:mm:ss')
  };
  console.log(waktuSholat);
  
  if (waktu === waktuSholat.fajr) {
    bot.sendMessage("1005747269", "Waktu sholat subuh telah tiba.")
  } else if (waktu === waktuSholat.dhuhr) {
    bot.sendMessage("1005747269", "Waktu sholat dzuhr telah tiba.")
  } else if (waktu === waktuSholat.asr) {
    bot.sendMessage("1005747269", "Waktu sholat ashar telah tiba.")
  } else if (waktu === waktuSholat.maghrib) {
    bot.sendMessage("1005747269", "Waktu sholat maghrib telah tiba.")
  } else if (waktu === waktuSholat.isha) {
    bot.sendMessage("1005747269", "Waktu sholat isya' telah tiba.")
  } else if (waktu === "05:00:00") {
    bot.sendMessage("1005747269", JSON.stringify(waktuSholat))
  }

  console.log(waktuSholat)
  console.log(waktu)
}

function getUptime() {
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor(uptime % 86400 / 3600);
  const minutes = Math.floor(uptime % 3600 / 60);
  const seconds = Math.floor(uptime % 60);
  return `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
}


bot.on(["/uptime"], async(msg) => {
  
    msg.reply.text(`Sistem telah aktif selama ${await getUptime()}`)
})

setInterval(() => {
  prayerTime();
}, 1000); // setiap 1 detik

bot.sendMessage("1005747269", "Bot is active")
bot.start()


