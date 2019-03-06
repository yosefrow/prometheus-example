/*******************************
* Maintainer: yosefrow@gmail.com
*
* Credit: https://github.com/siimon/prom-client/blob/master/example/server.js
* Date: 06.03.2019
*
*******************************/

'use strict';

// define express vars
const express = require('express')
const server = express()
const port = 3000

// define vars for prometheus client
const cluster = require('cluster');
const client = require('prom-client');

// define register that stores metrics
const register = client.register;

// Define Sample metrics objects
const Histogram = client.Histogram;
const h = new Histogram({
	name: 'test_histogram',
	help: 'Example of a histogram',
	labelNames: ['code']
});

const Counter = client.Counter;
const c = new Counter({
	name: 'test_counter',
	help: 'Example of a counter',
	labelNames: ['code']
});

const Gauge = client.Gauge;
const g = new Gauge({
	name: 'test_gauge',
	help: 'Example of a gauge',
	labelNames: ['method', 'code']
});

// Populate Sample metrics objects
setTimeout(() => {
	h.labels('200').observe(Math.random());
	h.labels('300').observe(Math.random());
}, 10);

setInterval(() => {
	c.inc({ code: 200 });
}, 5000);

setInterval(() => {
	c.inc({ code: 400 });
}, 2000);

setInterval(() => {
	c.inc();
}, 2000);

setInterval(() => {
	g.set({ method: 'get', code: 200 }, Math.random());
	g.set(Math.random());
	g.labels('post', '300').inc();
}, 100);

if (cluster.isWorker) {
	// Expose some worker-specific metric as an example
	setInterval(() => {
		c.inc({ code: `worker_${cluster.worker.id}` });
	}, 2000);
}

// Enable collection of default metrics
client.collectDefaultMetrics();

// set express routes
server.get('/', (req, res) => res.send('<h1>Hello World!</h1><br /><p>This is a sample nodejs app running on port: ' + port +'</p><br /><p> View metrics <a href=/metrics>here</a> </p>'));

server.get('/metrics', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.metrics());
});

server.get('/metrics/counter', (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.getSingleMetricAsString('test_counter'));
});


// start express server

console.log('Server listening to ' + port + ', metrics exposed on /metrics endpoint');
server.listen(port);
