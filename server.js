#!/usr/bin/env node
const http = require('http');
const fs = require('fs/promises')

const server = new http.Server(async (req, res) => {
  console.log(req.url);
  res.setHeader('Content-Type', 'text/html');
  if (req.url === '/') req.url = '/index.html';

  if (req.url.match(/\/index.*/g)) {
    res.setHeader('Content-Type', req.url.endsWith('.js') ? 'application/javascript' : (req.url.endsWith('.css') ? 'text/css' : 'text/html'))
    res.write(await fs.readFile('.' + req.url));
  } else if (req.url === '/posts' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    const posts = (await fs.readdir('./posts')).filter(post => post.endsWith('.html'));
    res.write(JSON.stringify(posts, 'null', '\t'))
  } else if (req.url.match(/\/posts\/.*\.html/g)) {
    try {

      res.write(await fs.readFile('.' + decodeURIComponent(req.url)));
    } catch (ex) {
      console.error(ex);
      res.write(await fs.readFile('./404.html'));
    }
  } else if (req.url.match(/\/.*\.js/g)) {
    res.setHeader('Content-Type', 'application/javascript');
    res.write(await fs.readFile('.' + req.url));
  } else {
    res.write(await fs.readFile('./404.html'));
  }
  res.end();
});

server.listen('80');
