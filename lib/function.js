
const fetch = require('node-fetch');
const moment = require('moment-timezone');

async function uptime() {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime % 86400 / 3600);
    const minutes = Math.floor(uptime % 3600 / 60);
    const seconds = Math.floor(uptime % 60);
    return `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
}

async function getFileSize(url) {
  return fetch(url, {
    method: "HEAD"
  })
  .then(response => {
    if(response.ok) {
      const contentLength = response.headers.get('content-length');
      const fileSizeInMB = (contentLength / 1048576).toFixed(2);
      return fileSizeInMB + ' MB';
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

async function getBuffer(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return buffer;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.status = response.status;
    error.response = data;
    throw error;
  }

  return data;
}

function findUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex);
}

function isUrl(str) {
  const pattern = /^https?:\/\//;
  return pattern.test(str);
}

module.exports = {
  uptime,
  getFileSize,
  getBuffer,
  findUrl,
  isUrl,
  fetchJson
};