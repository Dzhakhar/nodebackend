var url = require("url");
var pathModule = require("path");
var Render = require("./render");
var fs = require("fs");
var listener = [];

var mimeTypes = {
	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css',
	'.jpg': 'image/jpeg',
	'.gif': 'image/gif'
}

exports.get = function(req, res){
	req.requrl = url.parse(req.url, true);
	var path = req.requrl.pathname;

	res.sendfile = function(pathToFile, data){
		pathToFile = __dirname + pathToFile;
		Render.renderfile(pathToFile, data, function(){
			res.writeHead(200, {
				'Content-Type': mimeTypes[pathModule.extname(pathToFile)]
			});

			fs.readFile(pathToFile, "utf8", function(err, data){
				if(err) throw err;
				res.write(data);
				res.end();
			})
		});
	}


	if(listener[path]){
		listener[path](req.requrl, res);
	}
}

exports.on = function(path, callback){
	listener[path] = callback;
}

exports.on("/home", function(req, res){
	res.sendfile("/index.html", {"name":"Vasya"});
});

exports.on("/", function(req, res){
	res.sendfile("/index.html", {"name":"Vasya"});
});
