const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper');

async function start() {
  let url = "https://youtu.be/aK1eOzFHt1Q"
   //let tiktok = new Tiktok()
  
  let res = await youtubedlv3(url);
  res1 = await res.video['360'].download()
  console.log(res1)
}

start()