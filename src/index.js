const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { nanoid } = require('nanoid');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/app', express.static(path.resolve('app')));

io.on('connection', socket => {
	
	socket.on('join', (room) => {
		socket.join(room);
	});

});

app.get('/', (req, res) => {
  res.redirect('/listen');
});

app.get('/listen', (req, res) => {
	res.redirect(`/listen/${nanoid(5)}`);
});

app.get('/listen/:id', (req, res) => {
	res.sendFile(path.resolve('app/index.html'));
});

app.all('/:id/*', (req, res) => {
	console.log(req);
	io.to(req.params.id).emit('event', {
		url: req.url,
		method: req.method,
		headers: req.headers,
		body: req.body,
		query: req.query
	});

	res.send();
});

app.all('/:id', (req, res) => {
	console.log(req)
	io.to(req.params.id).emit('event', {
		url: req.url,
		method: req.method,
		headers: req.headers,
		body: req.body,
		query: req.query
	});

	res.send();
});

server.listen(9000);
