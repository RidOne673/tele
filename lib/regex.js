exports.instagramStories = (url) => {
	let u = url.match(new RegExp(/https:\/\/(www\.)?instagram\.com\/stories\/.+/g))[0];
	let s = u.indexOf('?') >= 0 ? u.split('?')[0] : (u.split('').pop() == '/' != true ? `${u}` : u);
	let [username, storyID] = s.split('/stories/')[1].split('/');
	return { username, storyID };
};

exports.tiktok = (url) => url.match(/https:\/\/.+\.tiktok.+/g);

exports.facebook = (url) => url.match(/https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+/g);

exports.pinterest = (url) => url.match(/https?:\/\/?(www|pin|id)?\.(it|pinterest\.co(m|\.[a-z]{1,2}))\S+\//g);

exports.instagram = (url) => url.match(/^https?:\/\/(www\.|m\.|)instagram\.com\/(p|reel|tv|([a-zA-Z0-9-_.]+\/(p|reel|tv)))\/[a-zA-Z0-9]{1,11}/g);

exports.twitter = (url) => url.match(/^(https?:\/\/)?(m.|mobile.|www.|)twitter.com\/([a-zA-Z0-9_]{1,40}|i)\/(status|videos)\/([0-9]*)/g);

exports.cocofun = (url) => url.match(/https?:\/\/www\.icocofun\.com\/[a-zA-Z0-9-_/-=?&]+/g);

exports.youtube = (url) => url.match(/^.*(?:https?:\/\/(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=)|(?:shorts\/))([^#\&\?]*).*/);

exports.igtv = (url) => url.match(/https?:\/\/(www\.|)instagram\.com\/tv\/[A-z0-9-_]{1,11}/g);

exports.soundcloud = (url) => url.match(/https?:\/\/(www\.|m\.|)soundcloud\.com\/[a-zA-Z0-9-_./]+/g);

exports.ifunny = (url) => url.match(/https?:\/\/ifunny\.co\/video\/[a-zA-Z0-9-_]+/g);

exports.imdb = (url) => url.match(/https?:\/\/(?:m\.|www\.|)imdb\.com\/[a-zA-Z0-9-_/?=&]+/g);

exports.pinterest = (url) => url.match(/https?:\/\/?(www|pin|id)?\.(it|pinterest\.co(m|\.[a-z]{1,2}))\S+\//g);

exports.stickerline = (url) => url.match(/https?:\/\/store\.+line\.+me\/stickershop\/product\/[0-9]{1,8}/g);

exports.xvideos = (url) => url.match(/https?:\/\/(?:www\.|)xvideos\.com\/[a-z0-9/._-]+/g);

exports.xnxx = (url) => url.match(/https?:\/\/(?:www\.|)xnxx\.com\/[a-zA-Z0-9-/_]+/g);

exports.gdrive = (url) => url.match(/https?:\/\/drive\.+google\.+com\/file\/[a-zA-Z0-9-_./]+/g);