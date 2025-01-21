var http = require('http');
const fs = require('fs');
//create a server object:
http.createServer(function (req, res) {
  if (req.url === '/') {
    res.write('Welcome to my Node.js server!'); 
    res.end();
  }
  else if (req.url === '/about') {
    fs.readFile('about.txt' ,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write('File not found');
            return res.end();
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
           return  res.end();
        }
    })
  }
  else if (req.url === '/contact') {
    fs.readFile('contact.html', function(err, data) {
      if (err) {
        res.writeHead(404);
        res.write('File not found');
        return res.end();
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } 
  else if (req.url.match(/\.(jpg|jpeg|png)$/)) {
    const imagePath = '.' + req.url;
    const imageStream = fs.createReadStream(imagePath);
    imageStream.on('error', function() {
      res.writeHead(404);
      res.end('Image not found');
    });
    res.writeHead(200, {'Content-Type': `image/${req.url.split('.').pop()}`});
    imageStream.pipe(res);
  }
  else {
    res.writeHead(404);
    res.write('Page Not Found');
    res.end();
  }
  console.log("Listening on 8000")
}).listen(8000); //the server object listens on port 8000