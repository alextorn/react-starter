const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
const port = 3001;

app.use(serve('build'));

app.listen(port, 'localhost', function(err) {
	if(err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:' + port);
});