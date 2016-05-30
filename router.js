var url = require("url");
var Render = require("./render");
var fs = require("fs");
var listener = [];

exports.get = function(req, res){
	req.requrl = url.parse(req.url, true);
	var path = req.requrl.pathname;

	res.sendfile = function(pathToFile, data){

		pathToFile = __dirname + pathToFile;

		if (/.(html)$/.test(pathToFile)){

			Render.renderfile(pathToFile, data, function(){
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});

				fs.readFile(pathToFile, "utf8", function(err, data){
					if(err) throw err;
					res.write(data);
					res.end();
				})
			});
		}
	}


	if(/.(css)$/.test(path)){
		res.writeHead(200, {
			'Content-Type': 'text/css'
		});

		fs.readFile(__dirname + "/static" + path, 'utf8', function(err, data){
			if(err) throw err;
			res.write(data, 'utf8');
			res.end();
		});
	} else {
		if(listener[path]){
			listener[path](req.requrl, res);
		}
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
