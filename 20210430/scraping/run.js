const cheerio = require('cheerio');
const XMLHttpRequest = require('xmlhttpresquest').XMLHttpRequest;
const req = new XMLHttpRequest();

const getURL = 'https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops';

req.open('GET', getURL, false);
req.send(null);

console.log(req.responseText);