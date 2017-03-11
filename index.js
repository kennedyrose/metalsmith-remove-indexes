'use strict'
const minimatch = require('minimatch')

function checkMatch(arr, str){
	for(let i = arr.length; i--;){
		if(minimatch(str, arr[i])) return true
	}
	return false
}

function redirectPage(destination){
	return new Buffer(`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="robots" content="noindex">
		<meta http-equiv="refresh" content="0;url=${destination}">
		<link rel="canonical" href="${destination}">
		<script>window.location.replace('${destination}');</script>
	</head>
	<body>This page has been moved to <a href="${destination}">${destination}</a></body>
</html>`)
}

module.exports = options => {
	return (files, metalsmith, done) => {
		options = Object.assign({
			ignore: [ 'index.html' ],
			redirect: false,
			trimHtmlPath: false
		}, options)
		if(typeof options.ignore === 'string') options.ignore = [ options.ignore ]
		console.log('removeIndexes()')
		const changed = {}
		for(let path in files){
			if(
				!checkMatch(options.ignore, path) &&
				path.split('/').pop().toLowerCase() === 'index.html'
			){
				const newPath = path.replace('/index.html', '.html')
				const trimPath = options.trimHtmlPath ? newPath.replace('.html', '') : newPath
				changed[newPath] = Object.assign({
					path: trimPath,
					permalink: false
				}, files[path])
				if(options.redirect === false){
					delete files[path]
				}
				else{
					const file = trimPath.split('/').pop()
					files[path] = { contents: redirectPage(`../${file}`) }
				}
			}
		}
		for(let i in changed){
			files[i] = changed[i]
		}
		done()
	}
}