
const http = require('http');

let state = 10;

const someRequest = (res, code, body) => {
	res.writeHead(code, { 'Content-Type': 'text/html' });
	res.write('<html><body>' + body + '</body></html>');
	res.end();
}

const server = http.createServer(function (req, res) {   

	switch(req.url) {

		case "/state":
			someRequest(res, 200, state);
			break;
		case "/add":
			state += 1;
			someRequest(res, 200, state);
			break;
		case "/subtract":
			state -= 1;
			someRequest(res, 200, state);
			break;
		case "/reset":
			state = 10;
			someRequest(res, 200, "OK");
			break;

		default:
			someRequest(res, 404, "Something went wrong, please check your input in the address bar and try again");
			break;
	}

});

server.listen(8080);