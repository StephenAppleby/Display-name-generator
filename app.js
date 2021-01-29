const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const app = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url);
  switch (req.method) {
    case 'GET':
      let contentType = 'text/html';
      switch (req.url) {
        case '/':
          filePath = path.join(__dirname, 'public', 'index.html');
          break;
        case '/wordLists/adjectives':
          filePath = path.join(__dirname, 'public', 'wordLists', 'adjectives.json');
          contentType = 'application/json';
          break;
        case '/wordLists/nouns':
          filePath = path.join(__dirname, 'public', 'wordLists', 'nouns.json');
          contentType = 'application/json';
          break;
        case '/wordLists/verbs':
          filePath = path.join(__dirname, 'public', 'wordLists', 'verbs.json');
          contentType = 'application/json';
          break;
        default:
          switch(path.extname(filePath)) {
            case '.js':
              contentType = 'text/javascript';
              break;
            case '.css':
              contentType = 'text/css';
              break;
            case '.json':
              contentType = 'application/json';
              break;
            case '.ico':
              contentType = 'image/x-icon';
              break;
          }
          break;
      }
      fs.readFile(filePath, (err, content) => {
        if (err) console.log(err);
        res.writeHead(200, { 'Content-Type': contentType});
        res.end(content, 'utf8');
      });
      break;

    case 'POST':
      let word = [];
      req.on('data', (chunk) => {
        word.push(chunk);
      });
      req.on('end', () => {
        word = Buffer.concat(word).toString();
      })

      switch (req.url) {
        case '/wordLists/adjectives':
          filePath = path.join(__dirname, 'public', 'wordLists', 'adjectives.json');
          break;
        case '/wordLists/nouns':
          filePath = path.join(__dirname, 'public', 'wordLists', 'nouns.json');
          break;
        case '/wordLists/verbs':
          filePath = path.join(__dirname, 'public', 'wordLists', 'verbs.json');
          break;
        default:
          console.log('Error: Received request to POST to unsupported destination:', req.url);
          break;
      }

      fs.readFile(filePath, 'utf8', (err, content) => {
        if(err) console.log('Error reading destination file:', err);

        let wordList = [];
        if(content) {
          wordList = JSON.parse(content);
        }
        if (!wordList.includes(word)) wordList.push(word);

        fs.writeFile(filePath, JSON.stringify(wordList), err => {
          if (err) console.log('Error writing to file:', err);
        })
      })
      res.writeHead(200);
      res.end('Word successfully added');
      break;
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running on port:', PORT));

