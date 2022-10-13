const express = require('express'),
app = express();
let link = ['/']
app.use((req, res, next) => {
	let url = req.url;
	if(link.includes(url)) link.splice(link.indexOf(url))
	if(!link.includes(url)) link.push(url)
	res.locals.breadcrumbs = link;
	// console.log(req.url);
	next()
})

module.exports = app;