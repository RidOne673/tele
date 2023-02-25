const { default: axios } = require('axios');
const _ = require('lodash');
const cheerio = require('cheerio');

const fakeUserAgent = require('./fakeUa');
const regexURL = require('./regex');

async function download(url) {
		return new Promise(async (resolve, reject) => {
			if (!regexURL.tiktok(url)) ('invalid Url');
			const getDataInput = await axios.get('https://musicaldown.com/id');
			const $ = cheerio.load(getDataInput.data);
			let inputData = new Array();
			$('form').find('input').get().map(map => {
				inputData.push({
					name: $(map).attr('name'),
					value: $(map).attr('value')
				});
			});
			await axios.request({
				method: 'POST',
				url: 'https://musicaldown.com/id/download',
				data: `${inputData[0].name}=${encodeURIComponent(url)}&${inputData[1].name}=${inputData[1].value}&${inputData[2].name}=${inputData[2].value}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					...this.headers,
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
					'Origin': 'https://musicaldown.com',
					'Referer': 'https://musicaldown.com/id',
					'Cookie': getDataInput.headers['set-cookie']
				}
			}).then(async response => {
				await axios.request({
					method: 'POST',
					url: 'https://musicaldown.com/id/mp3',
					headers: {
						...this.headers,
						'Cookie': getDataInput.headers['set-cookie']
					}
				}).then(async ({
					data
				}) => {
					const $ = cheerio.load(response.data);
					const _ = cheerio.load(data);
					//let video = new Array();
					let audio = new Array();
					//$('a[target="_blank"]').get().map(async map => {
						//video.push($(map).attr('href'));
					//});
					_('a.waves-effect').get().map(map => {
						audio.push($(map).attr('href'));
					});
					const result = {
						username: $("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2)").text().trim(),
            caption: $("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)").text().trim(),
						title_audio: _('title').text().split(' |')[0],
						thumbnail: $('img.responsive-img').attr('src'),
						video : $("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)").attr('href'),
            video2: $("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)").attr('href'),
            video_hd: $("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)").attr('href'),
            watermark: $("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)").attr('href'),
						audio: audio[1]
					};
					resolve(result);
				}).catch(reject);
			}).catch(reject);
		});
	}

module.exports = {
  download
}